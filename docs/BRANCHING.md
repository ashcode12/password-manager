# Git Branching Strategy

## Overview

This project follows a structured branching strategy to ensure a clean and organized version control process, suitable for both development and production environments.

### Branches

- **`main`**: The stable branch containing production-ready code. All completed and tested features will be merged into this branch.
- **`dev`**: The primary development branch where features are integrated before moving to `main`.
- **Feature Branches**: Each new feature or functionality should have its own branch, created off of `dev` and merged back once completed and tested.

### Workflow

1. **Start with the `dev` branch**:
   - Begin work by switching to the `dev` branch.
   - Create feature branches off of `dev` for each new functionality.

2. **Feature Branch Workflow**:
   - Create a feature branch for each task:
     ```bash
     git checkout -b feature/branch-name
     ```
   - Complete the feature and test it locally.
   - Once finished, merge the feature branch into `dev`:
     ```bash
     git checkout dev
     git merge feature/branch-name
     ```
   - Push changes to the `dev` branch:
     ```bash
     git push origin dev
     ```

3. **Finalizing Code for Production**:
   - When all features are ready, merge the `dev` branch into `main` for production:
     ```bash
     git checkout main
     git merge dev
     git push origin main
     ```

### Example Branch Names

- `feature/encryption`
- `feature/firestore-integration`
- `feature/api-routes`

---

## Summary

Following this branching strategy helps maintain a stable main branch, allows for isolated feature development, and enables smoother transitions from development to production-ready code.

