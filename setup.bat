@echo off

setlocal

:backend
echo Running backend setup...
docker-compose -f ./docker/docker-compose-backend.yml up -d

:frontend
echo Running frontend setup...
docker-compose -f ./docker/docker-compose-frontend.yml up -d

:db
echo Running dB setup...
docker-compose -f ./docker/docker-compose-dB.yml up -d

if "%1"=="backend" (
    if exist .env.frontend (
        echo .env.frontend file found.
    ) else (
        echo .env.frontend file not found. Setting up environment...
        echo PORT=4000
        echo DATABASE_PORT=5432
        echo DATABASE_USERNAME=postgres
        echo DATABASE_PASSWORD=pass
        echo DATABASE_NAME=db
        echo DATABASE_URL="postgresql://postgres:pass@localhost:5432/db?schema=public"
        echo REDDIS_URL="redis://localhost:6379"
        echo JWT_SECRET='super-secret'
        echo JWT_EXPIRES_IN=604800
        echo EMAIL_ADDRESS=
        echo EMAIL_PASSWORD= # pass app-password if 2FA is enabled
        echo. > ./docker/.env.frontend
    )
    goto backend
)

if "%1"=="frontend" (
    if exist .env.frontend (
        echo .env.frontend file found.
    ) else (
        echo .env.frontend file not found. Setting up environment...
        echo. > ./docker/.env.frontend
    )
    goto frontend
)

if "%1"=="db" (
    goto db
)

if "%1"=="all" (
    echo Running all setup...
    goto backend
    goto frontend
    goto db
)

echo ERROR:
echo Please provide the correct argument.
echo Example:
echo.
echo 1:   ./setup.bat backend    # setup backend
echo 2:   ./setup.bat frontend   # setup frontend
echo 3:   ./setup.bat db         # setup dB
echo 4:   ./setup.bat all        # setup all

endlocal