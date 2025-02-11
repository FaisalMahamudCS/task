# Node.js CSV Import Project

This project is a Node.js application designed to read a CSV file containing product information, apply some business rules, and insert the data into a PostgreSQL database. The import process can be run from the command line and includes both a normal and a test mode.

## Prerequisites

- Node.js (>=14.x)
- PostgreSQL

## Installation

1. **Clone the Repository**:

    git clone https://github.com/FaisalMahamudCS/task.git
    cd your-repo
  

2. **Install Dependencies**:

    npm install
3. ** Create a `.env` file at the root of the project and add your PostgreSQL connection details **:

    ```plaintext
    DB_HOST=yourHost
    DB_USER=yourUsername
    DB_PASSWORD=yourPassword
    DB_NAME=importTest
    DB_PORT=5432
    ```
## Database Setup

1. **Create Database**:

    ```sql
    CREATE DATABASE importTest;
    ```

2. **Use Database**:

    ```sql
    \c importTest;
    ```

3. **Create Table at Postgresql**:

    ```sql
    CREATE TABLE tblproductdata (
      intproductdataid SERIAL PRIMARY KEY,
      strproductname VARCHAR(50) NOT NULL,
      strproductdesc VARCHAR(255) NOT NULL,
      strproductcode VARCHAR(10) NOT NULL UNIQUE,
      stock INT NOT NULL,
      price DECIMAL(10, 2) NOT NULL,
      dtmadded TIMESTAMP DEFAULT NULL,
      dtmdiscontinued TIMESTAMP DEFAULT NULL,
      stmtimestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
    ```

## Running the Import Script

1. **Command Line Options**:
    - `-f, --file <path>`: Path to the CSV file (default: `./stock.csv`)
    - `-t, --test`: Run in test mode (does not insert data into the database)

2. **Run the Script**:
   Run the app:
   node index.js
    ```bash
    node index.js -f path/to/your/file.csv
    ```

    To run in test mode:

    ```bash
    node stock.js -t -f path/to/your/file.csv
    ```

## Import Rules

1. **Stock and Price Rules**:
    - Items costing less than $5 with less than 10 stock are not imported.
    - Items costing over $1000 are not imported.

2. **Discontinued Items**:
    - Items marked as discontinued are imported, with the discontinued date set to the current date.

3. **Error Handling**:
    - Items failing to insert correctly are listed in a report at the end of the import process.





