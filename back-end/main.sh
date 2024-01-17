#!/bin/bash

# PostgreSQL Database Credentials
DB_USER="postgres"
DB_PASSWORD="1"
DB_NAME="resipe"


export PGPASSWORD=$DB_PASSWORD

# Drop the existing database
dropdb -U $DB_USER -h localhost $DB_NAME

# Create a new database
createdb -U $DB_USER -h localhost $DB_NAME

# Restore from backup
psql -U $DB_USER -h localhost -d $DB_NAME < /var/www/base.sql

# Unset the PGPASSWORD environment variable 
unset PGPASSWORD
