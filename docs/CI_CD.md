# CI/CD Pipeline Setup Documentation

## Overview

This document outlines the steps taken to set up the Continuous Integration/Continuous Deployment (CI/CD) pipeline using Jenkins for the Password Manager project. The purpose of this setup is to automate the testing process, ensure code quality, and provide continuous feedback on changes made to the `dev` branch.

---

## Jenkins Installation and Configuration

### 1. Installation Details
- **Port**: Jenkins is installed and running on port `8080`.
- **User**: The Jenkins setup includes a username **"ashfaaq"** with a secure password for access.

### 2. Initial Project Setup
- **Project Name**: `password-manager-ci`
- **Project Type**: Freestyle project
- **SCM Configuration**: Configured to use **Git** with the repository URL pointing to the GitHub repository and the branch set to `dev`.

### 3. Build Steps
- **Build Command**: Configured with an **Execute Windows batch command** step to run:
  ```bash
  npm install
  npm test
  ```
- **Purpose**:
  - `npm install`: Ensures all project dependencies are installed.
  - `npm test`: Runs the Jest test suite to validate code functionality.

### 4. Post-Build Actions
- **Email Notifications**: Set up to send build results to `ashfaaqbaurtaully@outlook.com` to notify whether the build was successful or failed.

---

## Build and Test Process

### 1. Triggering Builds
- **Manual Test**: The initial build was triggered manually and confirmed as successful.
- **Future Automation**: Builds can be automated using GitHub webhooks or by configuring the **poll SCM** option in Jenkins to check for updates to the `dev` branch.

### 2. Test Results
- The initial test run passed successfully with all Jest tests completing as expected.
- Console output confirmed that the tests ran smoothly without errors, ensuring that the CI/CD pipeline is functioning properly.

### 3. Notifications
- Email notifications are configured to provide feedback after each build, informing if it passed or failed.

---

## Summary

The Jenkins CI/CD pipeline has been successfully configured to:
- Pull the latest code from the `dev` branch upon triggering.
- Install dependencies and run the Jest test suite.
- Notify the user about build outcomes via email.

This setup ensures that any changes made to the `dev` branch are validated through automated testing, contributing to continuous integration best practices.

---

## Next Steps

1. **Automate Build Triggers**: Implement GitHub webhooks or Jenkins' poll SCM feature for automatic builds.
2. **Phase 4 Preparation**: Begin planning for the web application development phase to create a user-friendly interface for interacting with the password manager.

---
