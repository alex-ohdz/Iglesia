#!/bin/bash
set -e

# Wait for PostgreSQL to be available
until pg_isready -h localhost -p 5432; do
    echo "Waiting for PostgreSQL..."
    sleep 2
done

# Restore the database
pg_restore -U $POSTGRES_USER -d $POSTGRES_DB ./schema-pg.sql