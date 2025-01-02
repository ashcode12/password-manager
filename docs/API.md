# API Documentation

## Base URL
`http://localhost:3000`

---

### 1. Add Password
- **Endpoint**: `POST /add-password`
- **Description**: Encrypts and adds a password entry to the local JSON storage.
- **Request Body**:
  ```json
  {
    "name": "exampleSite",
    "password": "securePassword123"
  }
  ```
- **Response**:
  - **201**: Password added successfully.
    ```json
    {
      "message": "Password for \"exampleSite\" added successfully"
    }
    ```
  - **400**: Invalid input.
    ```json
    {
      "message": "Invalid input: Name must have at least 3 characters, and password cannot be empty."
    }
    ```

---

### 2. Retrieve Password
- **Endpoint**: `GET /get-password/:name`
- **Description**: Retrieves and decrypts the password for the given name.
- **Response**:
  - **200**: Returns the password.
    ```json
    {
      "name": "exampleSite",
      "password": "securePassword123"
    }
    ```
  - **404**: No entry found for the given name.
    ```json
    {
      "message": "No password entry found for \"exampleSite\"."
    }
    ```

---

### 3. List Passwords
- **Endpoint**: `GET /list-passwords`
- **Description**: Lists all stored passwords (names only).
- **Response**:
  - **200**: Returns a list of names.
    ```json
    [
      { "name": "exampleSite" }
    ]
    ```
  - **200**: No passwords stored.
    ```json
    {
      "message": "No passwords stored yet."
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
    "password": "securePassword123"
  }
  ```

- **Response**:
  ```json
  {
    "message": "Password for \"exampleSite\" added successfully"
  }
  ```

---

### Retrieve Password Example

- **Request**:
  ```http
  GET /get-password/exampleSite
  ```

- **Response**:
  ```json
  {
    "name": "exampleSite",
    "password": "securePassword123"
  }
  ```

---

### List Passwords Example

- **Request**:
  ```http
  GET /list-passwords
  ```

- **Response**:
  ```json
  [
    { "name": "exampleSite" }
  ]
  ```

---

## Notes

- All responses include appropriate status codes and messages to indicate success or errors.
- The application ensures that passwords are securely encrypted before storage and decrypted upon retrieval.
- All inputs are validated to ensure `name` has at least 3 characters and `password` is not empty.
```