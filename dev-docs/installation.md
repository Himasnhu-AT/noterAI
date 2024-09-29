# Installation Guide

[[toc]]

::: info
**Note:** This project is currently under development, and the installation process is not yet finalized. The following steps are a rough guide to get you started. **Do not run bash/bat files at this stage.**
:::

::: tip
**Tip:** Visit [Folder Structure](./folder-structure.md) to understand the project structure.
:::

## 1. Clone the Repository

```bash
git clone https://github.com/himasnhu-at/noterAI.git
cd noterAI
```

## 2. Install Dependencies

Navigate to the relevant sub-directory and install the necessary dependencies:

```bash
cd apps/
# Navigate to the specific repo you are working on, e.g., web, backend, ai, noterAI
npm install       # For web or backend
cargo install     # For AI
flutter pub get   # For mobile
```

::: tip
**Note:** In the future, you can use the provided scripts to automate this process:

```bash
bash scripts/bash/install.sh    # For Linux/macOS
# OR
scripts/batch/install.bat       # For Windows
```

:::

## 3. Setup Environment Variables

Run the script and enter the required environment variables:

```bash
# Only for backend
cd apps/server/backend
cp .env.example .env
```

::: tip
**Note:** In the future, you can use the provided scripts to automate this process:

```bash
bash scripts/bash/setup.sh    # For Linux/macOS
# OR
scripts/batch/setup.bat       # For Windows
```

:::

## 4. Migrate Database

Ensure Docker is up and running, then run the following commands to migrate the database schema:

```bash
cd apps/server/backend
npm run db:up   # Start the database
npm run db:dev  # Migrate schema to the database
```

::: warning

Make sure docker is running before running command:

```bash
npm run db:up
```

:::

## 5. Start the Backend

Start the backend server:

```bash
cd apps/server/backend
npm run start:dev
```

## 6. Start AI

Start the AI server:

```bash
cd apps/server/ai
cargo run
```

::: tip
**Note:** In the future, you can use the provided scripts to automate this process.
:::

## 7. Start the Application

You can start the application with specific arguments to specify the target platform:

- `--web` to start the web application
- `--android` to start the mobile application
- `--ios` to start the mobile application
- `--windows` to start the desktop application
- `--mac` to start the desktop application
- `--linux` to start the desktop application

```bash
bash scripts/bash/start.sh <args>  # For Linux/macOS
# OR
scripts/batch/start.bat <args>     # For Windows
```
