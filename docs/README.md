### **Updated README.md**

# Password Manager - DevOps Project

## Version 2.0

### Overview
This is the second version of the Password Manager application. It introduces a new password generator feature while maintaining the existing password management functionalities.

### Features in Version 2.0
1. Add Password: Add a new username and encrypted password.
2. Retrieve Password: Retrieve a stored password by username.
3. List Passwords: View a list of stored usernames.
4. Password Generator: Generate a secure password with customizable options:
   - Password length (1 to 128 characters)
   - Include numbers, symbols, uppercase, and lowercase characters
5. Validation:
   - Ensures passwords are encrypted before storing.
   - Checks for duplicate usernames.
   - Handles invalid inputs gracefully.

---

### Installation and Setup

#### Backend
1. Clone the repository:
   ```bash
   git clone https://github.com/<username>/password-manager.git
   cd password-manager
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   pm2 start src/server.js --name password-manager
   ```

#### Frontend
1. Navigate to the frontend folder:
   ```bash
   cd password-manager-frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React development server:
   ```bash
   npm start
   ```

---

### API Endpoints

#### Add Password
- **Endpoint**: `POST /add-password`

#### Retrieve Password
- **Endpoint**: `GET /get-password/:name`

#### List Passwords
- **Endpoint**: `GET /list-passwords`

#### Generate Password (New)
- **Endpoint**: `POST /generate-password`
- **Description**: Generates a random password based on user-provided criteria.

---

### 1. Project Phases and Progress

#### Phase 1: Planning and Research
   - Defined the project’s core functionality:
     - Password storage with encryption, retrieval, and listing capabilities.
   - Security Requirements:
     - Passwords are encrypted using AES-256 before being stored.
     - Integrated with Firestore on GCP for persistent storage, using secure service accounts.
   - Tool Selection:
     - **Backend**: Node.js with Express for API routing.
     - **Database**: Firestore on GCP for secure data storage.
     - **Encryption**: Node.js `crypto` library for strong password encryption.

#### Phase 2: Development Setup and Version Control
   - Project Folder Structure:
     - `/src`: Main application code (API routes, encryption functions).
     - `/tests`: Placeholder for future test files.
     - `/docs`: Documentation for the project.
   - Initial Server Setup:
     - Created a Node.js Express server with API routes for password management.
   - Version Control and Branching:
     - Set up GitHub repository with `.gitignore` to exclude sensitive files.
     - Branching strategy: `main`, `dev`, and feature branches for clear project tracking.

#### Phase 3: Password Generator
   - Added the `/generate-password` API endpoint.
   - Implemented secure random password generation using Node.js `crypto.randomBytes`.
   - Validated user input for length and criteria.

---

## Technology Stack

- **Language**: JavaScript (Node.js)
- **Framework**: Express for backend API routing
- **Database**: Firestore (GCP) with Firebase Admin SDK for database integration
- **Encryption**: AES-256-CBC encryption using Node.js `crypto` module
- **Version Control**: Git and GitHub for version tracking and collaboration
- **Development Tools**: Postman for API testing, VS Code as the primary IDE

---

## Documentation Index

1. **[SETUP.md](SETUP.md)**: Development environment setup instructions.
2. **[BRANCHING.md](BRANCHING.md)**: Git branching strategy and workflow.
3. **[API.md](API.md)**: Documentation for API endpoints.
4. **[SECURITY.md](SECURITY.md)**: Security features and encryption details.