import psycopg2
from psycopg2 import sql
import pandas as pd

# Database connection parameters
db_params = {
    "dbname": "your_db_name",
    "user": "your_db_user",
    "password": "your_db_password",
    "host": "your_db_host",
    "port": "your_db_port",
}

# Define the table name and column names
table_name = "your_table_name"
columns = [
    "DeltaPressAltitude_1a",
    "DeltaPressAltitude_2a",
    "DeltaBleedOutTemp_1b",
    "DeltaBleedOutTemp_2b",
    "DeltaBleedMonPress_1b",
    "DeltaBleedMonPress_2b",
    "MeanBleedOutTemp_1b",
    "MeanBleedOutTemp_2b",
    "MeanBleedMonPress_1b",
    "MeanBleedMonPress_2b",
    "MeanPressAltitude_1a",
    "MeanPressAltitude_2a",
    "time_since_maintenance",
    "preFail",
    "phaseOfFlight_1",
    "Flight"
]

# Create a connection to the database
conn = psycopg2.connect(**db_params)

# Create a cursor
cur = conn.cursor()

# Define the SQL statement to create the table
create_table_query = sql.SQL(
    """
    CREATE TABLE IF NOT EXISTS {} (
        {} REAL,
        {} REAL,
        {} REAL,
        {} REAL,
        {} REAL,
        {} REAL,
        {} REAL,
        {} REAL,
        {} REAL,
        {} REAL,
        {} REAL,
        {} REAL,
        {} REAL,
        {} BOOLEAN,
        {} INTEGER,
        {} INTEGER
    );
    """
).format(
    sql.Identifier(table_name),
    *[sql.Identifier(column) for column in columns]
)

# Execute the SQL statement to create the table
cur.execute(create_table_query)

# Commit the changes and close the cursor and connection
conn.commit()
cur.close()
conn.close()

print(f"Table '{table_name}' created successfully.")

# Load data from the Parquet file into a pandas DataFrame
parquet_file_path = '"C:/Users/rafak/Documents/GitHub/flAI/src/testes/FullDataToDb.parquet"'  # Replace with your Parquet file path
data_df = pd.read_parquet(parquet_file_path)

# Insert data into the PostgreSQL table using pandas to_sql method
data_df.to_sql(table_name, conn, if_exists='replace', index=False)

# Commit the changes
conn.commit()

# Close the cursor and connection
cur.close()
conn.close()

print(f"Data from '{parquet_file_path}' inserted into '{table_name}' successfully.")