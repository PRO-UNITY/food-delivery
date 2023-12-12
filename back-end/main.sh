#!/bin/bash

# PostgreSQL Database Credentials
DB_USER="postgres"
DB_PASSWORD="1"
DB_NAME="resipe"

# Set the PGPASSWORD environment variable for this session
export PGPASSWORD=$DB_PASSWORD

# Drop the existing database
dropdb -U $DB_USER -h localhost $DB_NAME

# Create a new database
createdb -U $DB_USER -h localhost $DB_NAME

# Restore from backup
psql -U $DB_USER -h localhost -d $DB_NAME < /var/www/food-delivery/back-end/base.sql

# Unset the PGPASSWORD environment variable
unset PGPASSWORD
