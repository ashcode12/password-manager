# Backend Testing

## Overview

This document outlines the testing approach for the Password Manager project, including the framework, test cases, and expected outcomes.

---

## Testing Tools

- **Framework**: Jest
- **HTTP Testing**: Supertest
- **Automated Testing**: Jenkins (integrated into the CI/CD pipeline)
- **Manual Testing**: `curl` commands for API endpoints

---

## Test Cases

### 1. Add Password
- **Description**: Verifies that passwords can be added successfully.
- **Method**: POST `/add-password`
- **Expected Result**:
  - **201**: Returns a success message if input is valid.
- **Command**:
  ```bash
  curl -X POST http://localhost:3000/add-password -H "Content-Type: application/json" -d '{"name": "exampleSite", "password": "securePassword123"}'
  ```
- **Expected Response**:
  ```json
  {
    "message": "Password for \"exampleSite\" added successfully"
  }
  ```
- **Result**: Passed.

---

### 2. Retrieve Password
- **Description**: Retrieves a password by its name.
- **Method**: GET `/get-password/:name`
- **Expected Result**:
  - **200**: Returns the decrypted password if the entry exists.
  - **404**: Returns an error message if the entry does not exist.
- **Command**:
  ```bash
  curl http://localhost:3000/get-password/exampleSite
  ```
- **Expected Response (Success)**:
  ```json
  {
    "name": "exampleSite",
    "password": "securePassword123"
  }
  ```
- **Expected Response (Error)**:
  ```json
  {
    "message": "No password entry found for \"exampleSite\"."
  }
  ```
- **Result**: Passed.

---

### 3. List Passwords
- **Description**: Lists all stored password names.
- **Method**: GET `/list-passwords`
- **Expected Result**:
  - **200**: Returns an array of password names if entries exist.
  - **200**: Returns a message if no passwords are stored.
- **Command**:
  ```bash
  curl http://localhost:3000/list-passwords
  ```
- **Expected Response (With Entries)**:
  ```json
  [
    { "name": "exampleSite" }
  ]
  ```
- **Expected Response (No Entries)**:
  ```json
  {
    "message": "No passwords stored yet."
  }
  ```
- **Result**: Passed.

---

## Notes

- The manual tests were conducted using `curl` commands to validate the API endpoints locally.
- Jest and Supertest are configured for automated testing, ensuring endpoint stability during continuous development.
- Jenkins integration ensures testing is automated in the CI/CD pipeline.