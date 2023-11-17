import psycopg2
import pandas as pd
from dotenv import load_dotenv
from os import environ

load_dotenv(dotenv_path='/ambientes/.env')

conn = psycopg2.connect(
    host=str(environ.get("POSTGRES_HOST")),
    database=str(environ.get("POSTGRES_DB")),
    user=str(environ.get("POSTGRES_USER")),
    password=str(environ.get("POSTGRES_PASSWORD"))
)

cursor = conn.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS tabela (
    id SERIAL PRIMARY KEY,
    Aircaft INTEGER,
    Flight INTEGER,
    phaseOfFlight_1 FLOAT,
    bleedMonPress_1b FLOAT,
    bleedMonPress_2b FLOAT,
    bleedOutTemp_1b FLOAT,
    bleedOutTemp_2b FLOAT,
    time_since_maintenance INTEGER,
    preFail FLOAT
);
""")

# Database connection parameters
db_params = {
    "dbname": "POSTGRES_DB",
    "user": "postgres",
    "password": "senha",
    "host": "postgres",
    "port": "5432",
}

# Define the table name and column names
table_name = "tabela"

# Load data from the Parquet file into a pandas DataFrame
parquet_file_path = './FullDataToDb.parquet'  # Replace with your Parquet file path
data_df = pd.read_parquet(parquet_file_path)
data_df['Flight'] = data_df['Flight'].astype(int)
data_df['aircraftSerNum-1'] = data_df['aircraftSerNum-1'].astype(int)
data_df['phaseOfFlight-1'] = data_df['phaseOfFlight-1'].astype(int)
data_df['date'] = pd.to_datetime(data_df['date'], format='%Y-%m-%d %H:%M:%S')

conn = psycopg2.connect(**db_params)

# Create a cursor
cur = conn.cursor()

# Drop the table if it already exists (optional)
cur.execute(f"DROP TABLE IF EXISTS {table_name}")

# Create the table with the columns from the DataFrame, replacing hyphens with underscores
create_table_sql = f"CREATE TABLE {table_name} ("
for column_name, dtype in zip(data_df.columns, data_df.dtypes):
    # Replace hyphens with underscores in column names
    column_name = column_name.replace("-", "_")
    
    if dtype == 'int64':
        sql_data_type = "BIGINT"
    elif dtype == 'float64':
        sql_data_type = "REAL"
    elif dtype == 'datetime64':
        sql_data_type = "TIMESTAMP"
    
    create_table_sql += f'"{column_name}" {sql_data_type}, '
create_table_sql = create_table_sql.rstrip(', ') + ")"
cur.execute(create_table_sql)

# Iterate over the DataFrame rows and insert data into the table
for index, row in data_df.iterrows():
    columns = ', '.join(['"' + column_name.replace("-", "_") + '"' for column_name in data_df.columns])
    placeholders = ', '.join(['%s' for _ in range(len(row))])
    insert_sql = f"INSERT INTO {table_name} ({columns}) VALUES ({placeholders})"
    cur.execute(insert_sql, tuple(row))

# Commit the changes
conn.commit()
conn.close()

print(f"Data from '{parquet_file_path}' inserted into '{table_name}' successfully.")
