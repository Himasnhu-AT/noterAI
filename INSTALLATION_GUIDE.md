# Installation Guide for NoterAI

Follow these steps to install and run NoterAI locally.

## Prerequisites
Before setting up the project, ensure you have the following installed:
- **Node.js** (>= X.X.X)
- **npm** (>= X.X.X)
- **Flutter** (>= X.X.X)
- **pnpm** (>= X.X.X)
- **Docker** (for setting up Redis and Prisma database)

### Platform-specific Requirements
#### iOS/macOS
- **Xcode**: Install Xcode via the App Store and ensure that you have the latest version.
- **CocoaPods**: Run `sudo gem install cocoapods` if not installed.

#### Android
- **Android Studio**: Install Android Studio and set up the necessary SDKs.
- Ensure you have **Flutter** installed.

## Step-by-Step Guide

### 1. Clone the Repository
First, clone the repository to your local machine:
```bash
git clone https://github.com/himasnhu-at/noterai.git
cd noterai
```

### 2. Install Dependencies
Navigate to the project root and install the necessary dependencies using `pnpm`:
```bash
pnpm install
```

### 3. Set Up the Environment
Create a `.env` file in the `/apps/backend` and `/apps/web` directories based on the provided `.env.example` files:
```bash
cp apps/backend/.env.example apps/backend/.env
cp apps/web/.env.example apps/web/.env
```
Make sure to configure your Redis and Prisma database URLs.

### 4. Start the Backend and Frontend
Start both the backend and frontend using Turbo:
```bash
pnpm dev
```

Alternatively, use Turbo to run specific parts:
```bash
# Backend
turbo run dev --filter=@noterai/backend

# Web
turbo run dev --filter=@noterai/web
```

### 5. Running Flutter
Navigate to the `/apps/flutter` directory and run the project:
```bash
flutter run
```
Ensure that you have a connected device or emulator running.

### 6. Database Setup
Ensure that you have Docker running for Prisma and Redis:
```bash
docker-compose up
```

Then run migrations:
```bash
pnpm prisma migrate dev
```

### 7. Running Tests
You can run tests to ensure everything is set up correctly:
```bash
pnpm test
```

## Troubleshooting
If you encounter issues during setup, please check our [FAQ](./docs/FAQ.md) or open an issue in the GitHub repository.
