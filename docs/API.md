# API Documentation

This file provides detailed documentation for the API endpoints implemented in this project. Each endpoint is designed to handle password storage, retrieval, and listing functionalities.

---

## API Endpoints

### 1. Add Password

- **Endpoint**: `POST /add-password`
- **Description**: Adds a password entry with encryption before storing it in Firestore.
- **Request Body**:
  ```json
  {
    "name": "exampleSite",
    "password": "mySecurePassword123"
  }
  ```
- **Response**:
  - **201**: Password added successfully.
  - **400**: Invalid input if `name` or `password` is empty.

### 2. Retrieve Password

- **Endpoint**: `GET /get-password/:name`
- **Description**: Retrieves and decrypts a stored password by the specified `name`.
- **URL Parameters**:
  - `name` (string): Name of the password entry to retrieve.
- **Response**:
  - **200**: Returns the password in plaintext.
  - **404**: No password found for the given `name`.

### 3. List Passwords

- **Endpoint**: `GET /list-passwords`
- **Description**: Lists all stored passwords by name only, without showing the actual passwords.
- **Response**:
  - **200**: Returns a list of all password names.
  - **200**: Message indicating no passwords stored if the database is empty.

---

## Sample Request and Response

### Add Password Example

- **Request**:
  ```http
  POST /add-password
  Content-Type: application/json

  {
    "name": "exampleSite",
    "password": "mySecurePassword123"
  }
  ```

- **Response**:
  ```json
  {
    "message": "Password added successfully"
  }
  ```

### Retrieve Password Example

- **Request**:
  ```http
  GET /get-password/exampleSite
  ```

- **Response**:
  ```json
  {
    "name": "exampleSite",
    "password": "mySecurePassword123"
  }
  ```

### List Passwords Example

- **Request**:
  ```http
  GET /list-passwords
  ```

- **Response**:
  ```json
  [
    {
      "name": "exampleSite"
    }
  ]
  ```

---

## Notes

- All responses include appropriate status codes and messages to indicate success or errors.
- The application ensures that passwords are securely encrypted before storage and decrypted upon retrieval.

---