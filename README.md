# Password Manager - DevOps Project

### Project Overview

**Project Title**: Web-Based Password Manager with DevOps Pipeline  
**Objective**: Develop a secure, cloud-based password manager using DevOps practices, including continuous integration, automated testing, and cloud deployment.

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
