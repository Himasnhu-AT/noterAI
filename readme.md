# NoterAI

**NoterAI** helps students learn better by enabling them to take notes using a Notion-like UI or their voice. The platform leverages AI to summarize notes, generate quizzes, answer questions based on the notes, and keep students motivated with interesting facts related to their study topics.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation Guide](#installation-guide)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Acknowledgments](#acknowledgments)

## Features
- **Note-Taking**: Create and organize notes using a Notion-like interface or via voice input.
- **Summarization**: Use AI to summarize your notes automatically.
- **Quizzes**: Generate quizzes from your notes to help with revision.
- **Q&A**: Ask questions and get answers based on your saved notes.
- **Strange Facts**: Stay motivated with interesting facts relevant to your study topics.

## Tech Stack
- **Backend**: NestJS, Prisma, Redis
- **Mobile (Android, Windows, Linux)**: Flutter
- **iOS/macOS**: Swift
- **Web**: Next.js
- **AI**: NestJS (TypeScript) for main logic, Python for AI functionalities

## Installation Guide
To get NoterAI running locally, follow these steps:

### Prerequisites
Ensure you have the following installed:
- **Node.js** (>= X.X.X)
- **npm** (>= X.X.X)
- **pnpm** (>= X.X.X)
- **Flutter** (>= X.X.X)
- **Docker** (for Redis and database setup)

### Clone the Repository
```bash
git clone https://github.com/himasnhu-at/noterai.git
cd noterai
```

### Install Dependencies
Use `pnpm` to install all required dependencies:
```bash
pnpm install
```

### Set Up the Environment
Create `.env` files for both the backend and web apps:
```bash
cp apps/backend/.env.example apps/backend/.env
cp apps/web/.env.example apps/web/.env
```
Fill out the environment variables such as database URLs, Redis configurations, etc.

### Start Development Environment
To start the backend and frontend:
```bash
pnpm dev
```
You can also use Turbo for specific services:
```bash
# Backend
turbo run dev --filter=@noterai/backend

# Web
turbo run dev --filter=@noterai/web
```

### Running Flutter
For mobile or desktop development:
```bash
cd apps/flutter
flutter run
```

Ensure that you have a device or emulator running for Flutter.

### Database Setup
Start the required services with Docker and set up the database:
```bash
docker-compose up
pnpm prisma migrate dev
```

For a more detailed setup guide, refer to our [Installation Guide](./INSTALLATION_GUIDE.md).

## Usage
Once the project is set up, you can access different features through the frontend or mobile app. Follow the [Usage Guide](./docs/usage.md) to learn how to utilize NoterAI's full range of functionalities, including note-taking, quiz generation, and AI-powered summaries.

## Contributing
We welcome contributions! Please review our [Contributing Guidelines](./CONTRIBUTING.md) before making any contributions. Make sure to also check out the [Code of Conduct](./CODE_OF_CONDUCT.md).

### Quick Commands
Here are some common commands to help you contribute:

- Start the development environment:

```bash
pnpm dev
```

- Run tests:

```bash
pnpm test
```

- Format and lint code:

```bash
pnpm format && pnpm lint
```

## License
This project is licensed under a **Custom License** that restricts commercial use. For more information, see the [LICENSE](./LICENSE) file.

## Contact
If you have any questions or need support, feel free to reach out at **hyattherate2005 [at] gmail.com**.

## Acknowledgments
We would like to thank all the contributors who helped in developing NoterAI. Special thanks to the AI community for their resources and support.

Enjoy using NoterAI and enhance your learning experience!
