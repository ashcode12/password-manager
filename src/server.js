const express = require('express');
const crypto = require('crypto');
const admin = require('firebase-admin');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Initialize Firestore using the service account key in the config folder
const serviceAccount = require('../config/pmdevops-b855db43441d.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();
const passwordsCollection = db.collection('passwords');

// Encryption setup
const ENCRYPTION_KEY = crypto.randomBytes(32);
const IV_LENGTH = 16;

function encrypt(text) {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

function decrypt(text) {
  const textParts = text.split(':');
  const iv = Buffer.from(textParts.shift(), 'hex');
  const encryptedText = Buffer.from(textParts.join(':'), 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

// Function to validate password input
const validatePasswordInput = (name, password) => {
    // Check if 'name' is at least 3 characters and 'password' is not empty
    return (
      typeof name === 'string' &&
      name.trim().length >= 3 &&
      typeof password === 'string' &&
      password.trim() !== ''
    );
  };
  

// Route to add a password to Firestore
app.post('/add-password', async (req, res) => {
    const { name, password } = req.body;
  
    // Check if input is valid
    if (validatePasswordInput(name, password)) {
      try {
        // Encrypt the password and store in Firestore
        const encryptedPassword = encrypt(password);
        await passwordsCollection.doc(name).set({ name, password: encryptedPassword });
        res.status(201).json({ message: `Password for "${name}" added successfully` });
      } catch (error) {
        // Log the error and respond with a generic message
        console.error("Error adding password:", error);
        res.status(500).json({ message: 'An error occurred while adding the password. Please try again.' });
      }
    } else {
      // Invalid input response
      res.status(400).json({ message: 'Invalid input: Name must have at least 3 characters, and password cannot be empty' });
    }
  });
  

// Route to retrieve a specific password from Firestore
app.get('/get-password/:name', async (req, res) => {
    const { name } = req.params;
  
    try {
      // Fetch the encrypted password from Firestore
      const doc = await passwordsCollection.doc(name).get();
      if (doc.exists) {
        // Decrypt and return the password
        const encryptedPassword = doc.data().password;
        const decryptedPassword = decrypt(encryptedPassword);
        res.status(200).json({ name, password: decryptedPassword });
      } else {
        // Password entry not found
        res.status(404).json({ message: `No password entry found for "${name}". Please check the name and try again.` });
      }
    } catch (error) {
      // Log error and return a 500 status
      console.error("Error retrieving password:", error);
      res.status(500).json({ message: 'An error occurred while retrieving the password. Please try again.' });
    }
  });
  

// Route to list all stored passwords (names only for security)
app.get('/list-passwords', async (req, res) => {
    try {
      // Retrieve all documents in the passwords collection
      const snapshot = await passwordsCollection.get();
      if (snapshot.empty) {
        res.status(200).json({ message: 'No passwords stored yet' });
      } else {
        // Map document names only
        const passwordNames = snapshot.docs.map(doc => ({ name: doc.id }));
        res.status(200).json(passwordNames);
      }
    } catch (error) {
      // Log the error and return a 500 status
      console.error("Error listing passwords:", error);
      res.status(500).json({ message: 'An error occurred while listing passwords. Please try again.' });
    }
  });
  

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Only start the server if not in test environment
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  }
  
  // Export the app for testing
  module.exports = app;
