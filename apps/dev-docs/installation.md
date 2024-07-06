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
