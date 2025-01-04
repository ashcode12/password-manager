### Step 1: **Version 2.1.0 - UI Redesign**

For this step, we will redesign the UI to make it more structured, visually appealing, and user-friendly, resembling the outline in the screenshot.

---

### Tasks for UI Redesign:
1. **Update the Layout**:
   - Use a **two-column layout**:
     - Left column: "Add Password" and "Generate Password".
     - Right column: "Retrieve Password" and "List Passwords".
   - Introduce a **navbar/header** with the title "Password Manager".

2. **Style Individual Sections**:
   - Wrap each feature (Add, Retrieve, List, Generate) in a **card-like component** for better visual separation.
   - Add margins and padding for clarity.

3. **Introduce a CSS Framework (Optional)**:
   - Use **Bootstrap** or **Material-UI** to simplify styling and create responsive components.

4. **Enhance Fonts and Colors**:
   - Use modern fonts like **Roboto** or **Open Sans**.
   - Introduce a clean color palette (e.g., white background, light gray cards, and blue buttons).

---

### Updated React Files:

#### App.js
This will include the overall layout and structure for the new design.

### Screenshot of final draft

![Password Manager Version 2.1.1 Screenshot](/docs/Versions/Version2.1.x/Images/Version2.1.1.png)


---

### Version 2.1.1 - Password Generation UI and Error Message Fixes

#### Backend Changes:
1. **Server.js**:
   - Added validation for password generation to provide user-friendly error messages for invalid inputs (length less than 1 or greater than 128 characters).
   - Ensure proper response messages for edge cases during password generation.

#### Frontend Changes:
1. **GeneratePassword.js**:
   - Updated error handling to display meaningful error messages directly in the UI when inputs are invalid.
   - Included proper validation logic for password generation.
   - Improved display of the generated password in the UI.
   
2. **Styling**:
   - Added `GeneratePassword.css` for improved visual clarity and user experience in the password generation component.

#### Testing:
- Verified functionality for generating passwords with valid inputs:
  - Numbers, symbols, uppercase, and lowercase options work correctly.
- Confirmed error messages for invalid inputs:
  - Inputs with lengths less than 1 or greater than 128 provide appropriate messages.
- UI is responsive and visually aligned with other components.

---