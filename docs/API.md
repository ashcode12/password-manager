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
  - **201**: Password added successfully with the message:
    ```json
    {
      "message": "Password for \"exampleSite\" added successfully"
    }
    ```
  - **400**: Invalid input if `name` or `password` is empty or does not meet validation requirements. Returns:
    ```json
    {
      "message": "Invalid input: name must have at least 3 characters, and password cannot be empty"
    }
    ```


### 2. Retrieve Password

- **Endpoint**: `GET /get-password/:name`
- **Description**: Retrieves and decrypts a stored password by the specified `name`.
- **URL Parameters**:
  - `name` (string): Name of the password entry to retrieve.
- **Response**:
  - **200**: Returns the password in plaintext if found:
    ```json
    {
      "name": "exampleSite",
      "password": "mySecurePassword123"
    }
    ```
  - **404**: No password found for the given `name`. Returns:
    ```json
    {
      "message": "No password entry found for \"exampleSite\". Please check the name and try again."
    }
    ```


### 3. List Passwords

- **Endpoint**: `GET /list-passwords`
- **Description**: Lists all stored passwords by name only, without showing the actual passwords.
- **Response**:
  - **200**: Returns a list of all password names if entries are available:
    ```json
    [
      {
        "name": "exampleSite"
      }
    ]
    ```
  - **200**: If no passwords are stored, returns:
    ```json
    {
      "message": "No passwords stored yet"
    }
    ```


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
- All inputs are validated to ensure `name` has at least 3 characters and `password` is not empty.


---