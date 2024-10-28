const express = require('express');
const crypto = require('crypto');
const admin = require('firebase-admin');
const app = express();
const PORT = 3000;

app.use(express.json());

// Firebase setup
const serviceAccount = require('./path-to-your-service-account-key.json');
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

const validatePasswordInput = (name, password) => {
  return name && password && name.trim() !== '' && password.trim() !== '';
};

// Route to add a password to Firestore
app.post('/add-password', async (req, res) => {
  const { name, password } = req.body;
  if (validatePasswordInput(name, password)) {
    const encryptedPassword = encrypt(password);
    await passwordsCollection.doc(name).set({ name, password: encryptedPassword });
    res.status(201).json({ message: 'Password added successfully' });
  } else {
    res.status(400).json({ message: 'Invalid input: name and password cannot be empty' });
  }
});

// Route to retrieve a specific password from Firestore
app.get('/get-password/:name', async (req, res) => {
  const { name } = req.params;
  const doc = await passwordsCollection.doc(name).get();
  if (doc.exists) {
    const encryptedPassword = doc.data().password;
    const decryptedPassword = decrypt(encryptedPassword);
    res.status(200).json({ name, password: decryptedPassword });
  } else {
    res.status(404).json({ message: `No password found for '${name}'` });
  }
});

// Route to list all stored passwords (names only for security)
app.get('/list-passwords', async (req, res) => {
  const snapshot = await passwordsCollection.get();
  if (snapshot.empty) {
    res.status(200).json({ message: 'No passwords stored yet' });
  } else {
    const passwordNames = snapshot.docs.map(doc => ({ name: doc.id }));
    res.status(200).json(passwordNames);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
