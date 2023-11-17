#flask backend
from flask import Flask, request, jsonify
import pandas as pd
import numpy as np
from flask_cors import CORS
import psycopg2
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app, origins=['http://localhost:3001'])

db_params = {
    "dbname": os.getenv('DBNAME'),
    "user": os.getenv('USER'),
    "password": os.getenv('PASSWORD'),
    "host": os.getenv('HOST'),
    "port": os.getenv('PORT'),
}

def compress_phaseOfFlight(voo):
    voo = voo[['aircraftSerNum-1','phaseOfFlight-1', 'message0418DAA-1', 'message0422DAA-1','recording_time','dateDay-1', 'dateMonth-1', 'dateYear-1','bleedOutTemp-1b', 'bleedOutTemp-2b','bleedMonPress-1b','bleedMonPress-2b','pressAltitude-1a','pressAltitude-2a','wOW-1a','wOW-3a']]
    voo = voo.fillna(method='ffill')
    voo = voo[(voo['wOW-1a'] == 0) & (voo['wOW-3a'] == 0)]
    messages = voo.groupby(['phaseOfFlight-1']).max().copy()
    date = voo.groupby(['phaseOfFlight-1']).min().copy()
    duration = voo.groupby(['phaseOfFlight-1']).max() - voo.groupby(['phaseOfFlight-1']).min().copy()
    cVar = voo.groupby(['phaseOfFlight-1']).mean().copy()
    messages = messages[['aircraftSerNum-1','message0418DAA-1', 'message0422DAA-1']]
    duration = duration[['recording_time','pressAltitude-1a','pressAltitude-2a','bleedOutTemp-1b', 'bleedOutTemp-2b','bleedMonPress-1b','bleedMonPress-2b']]
    duration = duration.rename(columns={
        'pressAltitude-1a': 'DeltaPressAltitude-1a',
        'pressAltitude-2a': 'DeltaPressAltitude-2a',
        'bleedOutTemp-1b': 'DeltaBleedOutTemp-1b',
        'bleedOutTemp-2b': 'DeltaBleedOutTemp-2b',
        'bleedMonPress-1b': 'DeltaBleedMonPress-1b',
        'bleedMonPress-2b': 'DeltaBleedMonPress-2b'
    })
    date = date[['dateDay-1', 'dateMonth-1', 'dateYear-1']]
    cVar = cVar[['bleedOutTemp-1b', 'bleedOutTemp-2b','bleedMonPress-1b','bleedMonPress-2b','pressAltitude-1a','pressAltitude-2a']]
    cVar = cVar.rename(columns={
        'pressAltitude-1a': 'MeanPressAltitude-1a',
        'pressAltitude-2a': 'MeanPressAltitude-2a',
        'bleedOutTemp-1b': 'MeanBleedOutTemp-1b',
        'bleedOutTemp-2b': 'MeanBleedOutTemp-2b',
        'bleedMonPress-1b': 'MeanBleedMonPress-1b',
        'bleedMonPress-2b': 'MeanBleedMonPress-2b'
    })
    voo = pd.concat([messages, duration, cVar, date], axis=1)
    voo = voo.rename(columns={'recording_time': 'Duration'})
    voo['phaseOfFlight-1'] = voo.index
    voo = voo.reset_index(drop=True)
    return voo

def voo_dateTime(voo):

    voo['dateDay-1'] = voo['dateDay-1'].astype(int)
    voo['dateMonth-1'] = voo['dateMonth-1'].astype(int)
    voo['dateYear-1'] = voo['dateYear-1'].astype(int)

    voo['date'] = (voo['dateYear-1'].astype(str) + '-' + voo['dateMonth-1'].astype(str) + '-' + voo['dateDay-1'].astype(str))
    
    voo = voo.drop(['dateDay-1', 'dateMonth-1', 'dateYear-1'], axis=1)

    voo['date'] = pd.to_datetime(voo['date'], format='%Y-%m-%d')
     
    return voo

def time_since_maintenance(voo):
    aircraft = int(voo['aircraftSerNum-1'].unique()[0])
    #select last flight of aircraft
    print(type(aircraft))
    query = f"SELECT time_since_maintenance, \"Flight\" FROM \"Prediction\" WHERE \"aircraftSerNum_1\"::BIGINT = {aircraft} ORDER BY \"Flight\" DESC LIMIT 1;"
    #execute query
    connection = psycopg2.connect(**db_params)
    cursor = connection.cursor()
    cursor.execute(query)
    response = cursor.fetchone()
    last_tsm = response[0]
    Flight = response[1]
    connection.close()
    #calculate time since maintenance
    for i in voo['phaseOfFlight-1'].unique():
        voo.loc[voo['phaseOfFlight-1'] == i, 'Duration'] += last_tsm
        last_tsm = voo.loc[voo['phaseOfFlight-1'] == i, 'Duration'].tolist()[-1]
        print(last_tsm)
    
    voo['Flight'] = int(Flight) + 1
    voo = voo.rename(columns={'Duration': 'time_since_maintenance'})
    return voo

def normalize(voo):

    big_values_columns = ['DeltaPressAltitude-1a', 'DeltaPressAltitude-2a','DeltaBleedOutTemp-1b', 'DeltaBleedOutTemp-2b', 'DeltaBleedMonPress-1b','DeltaBleedMonPress-2b', 'MeanBleedOutTemp-1b', 'MeanBleedOutTemp-2b','MeanBleedMonPress-1b', 'MeanBleedMonPress-2b', 'MeanPressAltitude-1a','MeanPressAltitude-2a','time_since_maintenance']
    
    for i in big_values_columns:
        query = f"SELECT STDDEV(\"{i.replace('-', '_')}\"), AVG(\"{i.replace('-', '_')}\") FROM \"Prediction\";"
        #execute query
        connection = psycopg2.connect(**db_params)
        cursor = connection.cursor()
        cursor.execute(query)
        std, mean = cursor.fetchone()
        connection.close()
        voo[i] = ((voo[i]) - mean)/std
    return voo

def submit_nData_SQL(voo):
    voo['preFail'] = 0  # Assuming you want to set 'preFail' to 0 for all rows
    query = "INSERT INTO \"Prediction\" (\"DeltaPressAltitude_1a\", \"DeltaPressAltitude_2a\", \"DeltaBleedOutTemp_1b\", \"DeltaBleedOutTemp_2b\", \"DeltaBleedMonPress_1b\", \"DeltaBleedMonPress_2b\", \"MeanBleedOutTemp_1b\", \"MeanBleedOutTemp_2b\", \"MeanBleedMonPress_1b\", \"MeanBleedMonPress_2b\", \"MeanPressAltitude_1a\", \"MeanPressAltitude_2a\", \"time_since_maintenance\", \"preFail\", \"phaseOfFlight_1\", \"Flight\", \"aircraftSerNum_1\", \"runId\") VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, CAST(%s as BIGINT), 1);"
    
    connection = psycopg2.connect(**db_params)
    cursor = connection.cursor()

    for index, row in voo.iterrows():
        print(int(row['aircraftSerNum-1']))
        values = (
            row['DeltaPressAltitude-1a'], row['DeltaPressAltitude-2a'], row['DeltaBleedOutTemp-1b'],
            row['DeltaBleedOutTemp-2b'], row['DeltaBleedMonPress-1b'], row['DeltaBleedMonPress-2b'],
            row['MeanBleedOutTemp-1b'], row['MeanBleedOutTemp-2b'], row['MeanBleedMonPress-1b'],
            row['MeanBleedMonPress-2b'], row['MeanPressAltitude-1a'], row['MeanPressAltitude-2a'],
            row['time_since_maintenance'], row['preFail'], row['phaseOfFlight-1'], row['Flight'], row['aircraftSerNum-1']
        )
        cursor.execute(query, values)
        print(query, values)

    connection.commit()
    connection.close()

    return

@app.route('/api', methods=['POST'])
def api():
    if 'parquetFile' not in request.files:
        print("No file")
        return "No file found", 400
    file = request.files['parquetFile']
    if file.filename == '':
        print("No file found")
        return "No file found", 400
    try:
        nData = pd.read_parquet(file)

        voo = nData.copy()

        voo = compress_phaseOfFlight(voo)
        voo = voo_dateTime(voo)
        voo = time_since_maintenance(voo)
        submit_nData_SQL(voo)
        voo = normalize(voo)


        result = voo.to_json(orient='records')
        #print(result)
        return result
    
    except Exception as e:
        print("erro aqui")
        print(e)
        # Handle exceptions and return an error response
        return str(e), 400
    

if __name__ == '__main__':
    app.run(debug=True)
