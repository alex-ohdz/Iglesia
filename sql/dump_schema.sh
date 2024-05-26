#!/bin/bash

# Variables
CONTAINER_NAME="mysql-learn-shop"
DATABASE_NAME="mydatabase"
MYSQL_ROOT_PASSWORD="rootpassword"
OUTPUT_FILE="schema.sql"

rm $OUTPUT_FILE

# Run mysqldump inside the container and save the dump directly to the host
docker exec -i $CONTAINER_NAME mysqldump -u root -p$MYSQL_ROOT_PASSWORD --no-data $DATABASE_NAME > $OUTPUT_FILE

echo "Schema dump saved to $OUTPUT_FILE"
