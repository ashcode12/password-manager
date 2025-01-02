# Testing Documentation

## Manual Testing Results for Version 1.0

### Overview
This document outlines the testing approach and results for the Password Manager application, including validation for the backend API endpoints.

---

## Testing Tools

- **Framework**: Jest
- **HTTP Testing**: Supertest
- **Automated Testing**: Jenkins (integrated into the CI/CD pipeline)
- **Manual Testing**: `curl` commands for API endpoints

---

## Test Cases

### Add Password
1. **Valid Input**:
   - Command:
     ```bash
     curl -X POST http://localhost:3000/add-password -H "Content-Type: application/json" -d '{"name": "exampleSite", "password": "securePassword123"}'
     ```
   - Expected Response:
     ```json
     {
       "message": "Password for 'exampleSite' added successfully"
     }
     ```
   - Result: Passed.

2. **Duplicate Username**:
   - Command:
     ```bash
     curl -X POST http://localhost:3000/add-password -H "Content-Type: application/json" -d '{"name": "exampleSite", "password": "securePassword123"}'
     ```
   - Expected Response:
     ```json
     {
       "message": "Password for 'exampleSite' already exists. Use a different name."
     }
     ```
   - Result: Passed.

3. **Invalid Input**:
   - Command:
     ```bash
     curl -X POST http://localhost:3000/add-password -H "Content-Type: application/json" -d '{"name": "", "password": ""}'
     ```
   - Expected Response:
     ```json
     {
       "message": "Invalid input: Name must have at least 3 characters, and password cannot be empty."
     }
     ```
   - Result: Passed.

---

### Retrieve Password
1. **Valid Username**:
   - Command:
     ```bash
     curl http://localhost:3000/get-password/exampleSite
     ```
   - Expected Response:
     ```json
     {
       "name": "exampleSite",
       "password": "securePassword123"
     }
     ```
   - Result: Passed.

2. **Non-Existent Username**:
   - Command:
     ```bash
     curl http://localhost:3000/get-password/nonExistentSite
     ```
   - Expected Response:
     ```json
     {
       "message": "No password entry found for 'nonExistentSite'."
     }
     ```
   - Result: Passed.

---

### List Passwords
1. **Non-Empty List**:
   - Command:
     ```bash
     curl http://localhost:3000/list-passwords
     ```
   - Expected Response:
     ```json
     [
       { "name": "exampleSite" }
     ]
     ```
   - Result: Passed.

2. **Empty List**:
   - Command:
     ```bash
     curl http://localhost:3000/list-passwords
     ```
   - Expected Response:
     ```json
     {
       "message": "No passwords stored yet."
     }
     ```
   - Result: Passed.

---

## Edge Cases
1. **Empty Fields**:
   - Command:
     ```bash
     curl -X POST http://localhost:3000/add-password -H "Content-Type: application/json" -d '{"name": "", "password": ""}'
     ```
   - Expected Response:
     ```json
     {
       "message": "Invalid input: Name must have at least 3 characters, and password cannot be empty."
     }
     ```
   - Result: Passed.

2. **Duplicate Username**:
   - Prevents duplicates and provides appropriate error messages. Result: Passed.

3. **Case Sensitivity**:
   - Checked handling of usernames with different cases (e.g., "ExampleSite" vs. "examplesite"). Result: Passed.

---

## Notes
- Manual tests validate endpoint functionality and input handling.
- Jenkins integration ensures automated tests are executed during the CI/CD process.
- The frontend requires a page refresh to reflect updates after adding passwords (Version 1.0 limitation).
