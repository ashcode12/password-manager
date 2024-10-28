# Testing Documentation

## Overview

This document outlines the testing approach for the Password Manager project, including the framework, test cases, and expected outcomes.

## Framework

- **Testing Framework**: Jest
- **HTTP Testing**: Supertest
- **Automated Testing**: Jenkins (set up in CI/CD pipeline)

## Test Cases

### 1. Add Password
- **Description**: Verifies that passwords can be added successfully.
- **Method**: POST `/add-password`
- **Expected Result**: Returns 201 status with a success message if input is valid.

### 2. Retrieve Password
- **Description**: Retrieves a password by its name.
- **Method**: GET `/get-password/:name`
- **Expected Result**: Returns 200 status and the decrypted password if the entry exists.

### 3. List All Passwords
- **Description**: Lists all stored password names.
- **Method**: GET `/list-passwords`
- **Expected Result**: Returns 200 status and an array of password names.
