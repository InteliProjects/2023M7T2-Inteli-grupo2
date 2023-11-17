import pandas as pd
import psycopg2

voo = pd.read_parquet('./FullDataToDb.parquet')

db_params = {
    "dbname": "",
    "user": "",
    "password": "",
    "host": "",
    "port": "",
}

voo['preFail'] = 0  # Assuming you want to set 'preFail' to 0 for all rows
query = "INSERT INTO \"Prediction\" (\"DeltaPressAltitude_1a\", \"DeltaPressAltitude_2a\", \"DeltaBleedOutTemp_1b\", \"DeltaBleedOutTemp_2b\", \"DeltaBleedMonPress_1b\", \"DeltaBleedMonPress_2b\", \"MeanBleedOutTemp_1b\", \"MeanBleedOutTemp_2b\", \"MeanBleedMonPress_1b\", \"MeanBleedMonPress_2b\", \"MeanPressAltitude_1a\", \"MeanPressAltitude_2a\", \"time_since_maintenance\", \"preFail\", \"phaseOfFlight_1\", \"Flight\", \"aircraftSerNum_1\") VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);"

connection = psycopg2.connect(**db_params)
cursor = connection.cursor()

values = []

for index, row in voo.iterrows():

    value = (
        row['DeltaPressAltitude-1a'], row['DeltaPressAltitude-2a'], row['DeltaBleedOutTemp-1b'],
        row['DeltaBleedOutTemp-2b'], row['DeltaBleedMonPress-1b'], row['DeltaBleedMonPress-2b'],
        row['MeanBleedOutTemp-1b'], row['MeanBleedOutTemp-2b'], row['MeanBleedMonPress-1b'],
        row['MeanBleedMonPress-2b'], row['MeanPressAltitude-1a'], row['MeanPressAltitude-2a'],
        row['time_since_maintenance'], row['preFail'], row['phaseOfFlight-1'], row['Flight'], row['aircraftSerNum-1']
    )
    values.append(value)
    print(index)
    #print(query, values)

    x=0
for i in values:
    x+=1
    cursor.execute(query, i)
    print(x/len(values)*100, '%')


connection.commit()
connection.close()