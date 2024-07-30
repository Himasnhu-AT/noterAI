#!/bin/bash

fun_backend() {
    echo "Running backend setup..."
    docker compose -f ./docker/docker-compose-backend.yml up -d
}

fun_frontend() {
    echo "Running frontend setup..."
    docker compose -f ./docker/docker-compose-frontend.yml up -d    
}

fun_db() {
    echo "Running dB setup..."
    docker compose -f ./docker/docker-compose-dB.yml up -d 
}

if [ "$1" == "backend" ]; then
    if [ -f .env.frontend ]; then
        echo ".env.frontend file found."
    else
        echo ".env.frontend file not found. Setting up environment..."
        echo "PORT=4000

DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=pass
DATABASE_NAME=db

DATABASE_URL="postgresql://postgres:pass@localhost:5432/db?schema=public"
REDDIS_URL="redis://localhost:6379"

JWT_SECRET='super-secret'
JWT_EXPIRES_IN=604800

EMAIL_ADDRESS=
EMAIL_PASSWORD= # pass app-password if 2FA is enabled" > ./docker/.env.frontend
    fi
    fun_backend

elif [ "$1" == "frontend" ]; then
    if [ -f .env.frontend ]; then
        echo ".env.frontend file found."
    else
        echo ".env.frontend file not found. Setting up environment..."
        echo "" > ./docker/.env.frontend
    fi
    fun_frontend

elif [ "$1" == "db" ]; then
    fun_db

elif [ "$1" == "all" ]; then
    echo "Running all setup..."
    fun_backend
    fun_frontend
    fun_db

else
    echo "
    ERROR:
    Please provide the correct argument.
    Example:
    
    1:   ./setup.sh backend    # setup backend
    2:   ./setup.sh frontend   # setup frontend
    3:   ./setup.sh db         # setup dB
    4:   ./setup.sh all        # setup all

    "
fi