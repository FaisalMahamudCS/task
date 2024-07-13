

-- Create database

CREATE DATABASE importTest;

-- and use...

USE importTest;

-- Create table for data

CREATE TABLE tblproductdata (
  intproductdataid SERIAL PRIMARY KEY,
  strproductname VARCHAR(50) NOT NULL,
  strproductdesc VARCHAR(255) NOT NULL,
  strproductcode VARCHAR(10) NOT NULL UNIQUE,
  dtmadded TIMESTAMP DEFAULT NULL,
  dtmdiscontinued TIMESTAMP DEFAULT NULL,
  stmtimestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

