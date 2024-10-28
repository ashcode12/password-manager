# Development Setup

## Prerequisites
- **Node.js**: Install Node.js and npm (latest LTS version is recommended)
  - [Download Node.js](https://nodejs.org/)
- **Git**: Version control system for project management
  - [Download Git](https://git-scm.com/)

## Development Environment Setup

1. **Clone the Repository**
   - Open a terminal and run:
     ```bash
     git clone https://github.com/ashcode12/password-manager.git
     cd password-manager
     ```

2. **Install Dependencies**
   - Inside the project directory, run:
     ```bash
     npm install
     ```

3. **Set Up Firebase Key**
   - Place the Firebase service account JSON key (downloaded from GCP) into the project folder.
   - Ensure the key file is listed in `.gitignore` to keep it secure.

4. **Run the Application**
   - Start the server by running:
     ```bash
     node src/server.js
     ```
   - The application will be accessible at `http://localhost:3000`.

---

## Folder Structure

- **/src**: Main application code (API routes, encryption).
- **/tests**: Placeholder for tests (to be added in later phases).
- **/docs**: Project documentation.

