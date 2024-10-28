# Security Features

This document outlines the security measures implemented in the password manager application to ensure data protection and integrity. Key areas covered include encryption, secure storage, and protection of sensitive information.

---

## 1. Encryption

- **Encryption Algorithm**: AES-256-CBC
  - The application uses the Advanced Encryption Standard (AES) with a 256-bit key and CBC (Cipher Block Chaining) mode for encrypting passwords before storage.
  - This algorithm is widely recognized for its strength and reliability in protecting sensitive data.

- **Encryption Process**:
  - **Key Generation**: A 256-bit encryption key is generated and securely stored.
  - **Initialization Vector (IV)**: A random 16-byte IV is created for each encryption operation to ensure that even identical passwords produce unique ciphertexts.
  - **Ciphertext Storage**: The encrypted password (ciphertext) is stored in Firestore along with its IV, separated by a colon (`:`) for easy retrieval and decryption.

- **Decryption**:
  - Passwords are decrypted only when they need to be displayed or retrieved by the user, using the same key and IV used during encryption.

---

## 2. Firestore for Secure Storage

- **Firestore Database**: Firestore on Google Cloud Platform (GCP) is used as the database for storing encrypted passwords.
- **Access Control**:
  - The application interacts with Firestore via a service account with restricted permissions to ensure secure and controlled access to the database.
  - Sensitive information, such as the Firestore service account JSON key, is stored outside of the project repository and added to `.gitignore` to prevent accidental exposure.
  
- **Database Rules**:
  - Firestore operates in a production mode environment, with access restrictions configured to prevent unauthorized access.
  - Only the application using the service account credentials has access to perform read/write operations on the database.

---

## 3. Environment and Sensitive Data Protection

- **Service Account Key**:
  - The Firestore service account key (JSON file) is stored locally and excluded from version control using `.gitignore`.
  - In production environments, secure storage solutions such as environment variables or secrets management tools (e.g., GCP Secret Manager) are recommended.

- **`.gitignore` Configuration**:
  - The `.gitignore` file includes entries for sensitive files, such as:
    - Firebase service account key (`path-to-your-service-account-key.json`)
    - System-specific files and log files (e.g., `.DS_Store`, `npm-debug.log`).

---

## 4. Future Security Enhancements

- **Environment Variable Management**:
  - To further enhance security, consider migrating encryption keys and sensitive configuration files to environment variables or a secure secrets management tool, especially in a cloud-based deployment.

- **Role-Based Access Control (RBAC)**:
  - Implementing RBAC in Firestore could add additional layers of security by granting permissions only to specific users or roles, based on their level of access.

---

## Summary

This application follows industry-standard encryption practices and employs secure storage solutions to safeguard user data. Measures such as Firestore access control, encryption of sensitive data, and protection of sensitive files in `.gitignore` help ensure a robust security posture.

