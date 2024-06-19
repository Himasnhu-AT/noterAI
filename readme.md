# NoterAI

NoterAI helps students learn better by enabling them to take notes using a Notion-like UI, or their voice. The platform leverages AI to summarize notes, generate quizzes from notes, answer questions based on the notes, and keep students motivated with interesting facts related to their study topics.

### Prerequisites

- npm (version X.X.X)
- Flutter (version X.X.X)
- Cargo (Rust, version X.X.X)

### Tech Stack

- **Backend**: NestJS
- **Mobile**: Flutter
- **Web**: Next.js
- **AI**: Rust

### Installation

1. **Clone the repo**

   ```bash
   git clone https://github.com/himasnhu-at/noterAI.git
   cd noterAI
   ```

2. **Install the dependencies**

   ```bash
   bash scripts/bash/install.sh # for Linux / macOS
   # ----------------- OR -----------------
   scripts/batch/install.bat # for Windows
   ```

3. **Setup Environment Variables**

   Run the script and enter the required environment variables.

   ```bash
   bash scripts/bash/setup.sh # for Linux / macOS
   # ----------------- OR -----------------
   scripts/batch/setup.bat # for Windows
   ```

4. **Start Application**

   In `<args>`, you can pass the following arguments:

   - `--web` to start the web application
   - `--android` to start the mobile application
   - `--ios` to start the mobile application
   - `--windows` to start the desktop application
   - `--mac` to start the desktop application
   - `--linux` to start the desktop application

   ```bash
   bash scripts/bash/start.sh <args> # for Linux / macOS
   # ----------------- OR -----------------
   scripts/batch/start.bat <args>  # for Windows
   ```

5. **Start Backend**

   ```bash
   cd apps/server/backend
   npm run start:dev
   ```

6. **Start AI**

   ```bash
   cd apps/server/ai
   cargo run
   ```

### Usage

#### Mobile Apps (iOS and Android)

Due to financial constraints, the iOS app is not released yet. For Android, download from our site [noterAI] or visit the [Google Play Store]().

#### Desktop Application (Windows, macOS, Linux)

Visit our [download page]() to download the application.

#### Website

Access via [web portal]().

### Features

- **Note-Taking**: Take notes using a Notion-like UI.
- **Summarization**: Summarize your notes with the help of AI.
- **Quizzes**: Generate quizzes from your notes to aid in studying.
- **Q&A**: Get answers to your questions based on your notes.
- **Strange Facts**: Receive interesting and motivational facts related to your studies.

### Contributing

We welcome contributions! To contribute, please follow these steps:

1. **Fork the repository.**
2. **Create a new branch:**

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes and commit them:**

   ```bash
   git commit -m 'Add some feature'
   ```

4. **Push to the branch:**

   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create a pull request.**

### Coding Standards

We follow industry standards, emphasizing test-driven development and clean, modular code. Please ensure your contributions adhere to these guidelines.

### License

This project is licensed under the `Custom License` to prevent commercial use. See the [LICENSE](LICENSE) file for details.

### Contact

If you want to contact us, please reach out at contact@noterAI.com.

### Support

If you encounter any issues, please create an issue in our GitHub repository.

### Acknowledgments

- Thanks to all the contributors who helped in developing this project.
- Special thanks to the AI community for their support and resources.

---

Enjoy learning with noterAI and enhance your study experience!

---

For more detailed documentation, please refer to our Docs (coming soon).
