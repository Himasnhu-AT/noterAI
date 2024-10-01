# Contributing to NoterAI

Thank you for considering contributing to NoterAI! We’re excited to have you on board. Before you start, please read our contribution guidelines carefully.

## Table of Contents
- [Code of Conduct](#code-of-conduct)
- [How Can You Contribute?](#how-can-you-contribute)
- [Getting Started](#getting-started)
- [Installation Guide](#installation-guide)
- [Coding Guidelines](#coding-guidelines)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Submitting Issues](#submitting-issues)
- [Pull Request Guidelines](#pull-request-guidelines)
- [License](#license)
- [Contact](#contact)

## Code of Conduct
Please make sure to review and adhere to our [Code of Conduct](./CODE_OF_CONDUCT.md) to ensure a respectful and welcoming environment for all contributors.

## How Can You Contribute?
We appreciate any type of contribution:
- **Report Bugs**: Submit bugs via our GitHub issue tracker.
- **Feature Requests**: Have ideas for new features? Share them via GitHub.
- **Code Contributions**: Help us by fixing bugs, writing new features, or improving the documentation.
- **Documentation**: Help improve the documentation to make the project more accessible.

## Getting Started

### Prerequisites
Ensure you have the following installed:
- **Node.js** (>= version X.X.X)
- **npm** (>= version X.X.X)
- **Flutter** (>= version X.X.X)
- **pnpm** (>= version X.X.X)
- **Docker** (for setting up Redis and the database)

For platform-specific requirements:
- **iOS/macOS**: Xcode for Swift and CocoaPods setup.
- **Android**: Android Studio and necessary SDKs.

### Tech Stack
- **Backend**: NestJS, Prisma, Redis
- **Mobile (Android, Windows, Linux)**: Flutter
- **iOS, macOS**: Swift
- **Web**: Next.js
- **AI**: NestJS (TypeScript), Python

### Packages Structure
- **<project-root>/dev-docs**: Documentation related to the project.
- **<project-root>/apps/flutter**: Flutter code for mobile and desktop.
- **<project-root>/apps/backend**: Backend code organized in a microservices architecture.
- **<project-root>/apps/swift**: Swift code for iOS/macOS.
- **<project-root>/apps/web**: Web code (Next.js).

For detailed installation instructions, refer to the [Installation Guide](./INSTALLATION_GUIDE.md).

## Installation Guide
Refer to our [Installation Guide](./INSTALLATION_GUIDE.md) for detailed setup instructions.

## Coding Guidelines
We follow TDD, clean code principles, and modular architecture. Make sure your code is:
- Well-documented.
- Includes tests.
- Passes linting and formatting checks.

Run the following before committing:
```bash
pnpm format
pnpm lint
```

### Pre-Commit Hooks
We use pre-commit hooks to ensure code quality:
```bash
"pre-commit": "pnpm format && pnpm lint && pnpm build"
```

## Commit Message Guidelines
Follow the [Conventional Commits](https://www.conventionalcommits.org/) format:
- **feat**: New feature.
- **fix**: Bug fix.
- **docs**: Documentation update.
- **style**: Code formatting changes.
- **refactor**: Code refactoring without changing functionality.
- **test**: Adding or modifying tests.

## Submitting Issues
To submit an issue, follow these steps:
1. **Search for duplicates**: Check if an issue already exists.
2. **Describe the issue**: Provide a detailed description, steps to reproduce, and any relevant screenshots.
3. **Suggest potential fixes**: If applicable, propose a solution.

## Pull Request Guidelines
1. Fork the repository and create a new branch.
2. Write clean, modular, and test-driven code.
3. Update the documentation if necessary.
4. Run tests and ensure all checks pass.
5. Open a pull request with a clear description of the changes.

## License
This project is licensed under a **Custom License** that restricts commercial use. See the [LICENSE](./LICENSE) file for more details.

## Contact
If you have any questions, feel free to contact us at **hyattherate2005 [at] gmail.com**.
