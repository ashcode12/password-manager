const express = require('express');
const crypto = require('crypto');
const app = express();
const PORT = 3000;

app.use(express.json());

const passwords = [];

// Encryption key and algorithm (securely stored in production)
const ENCRYPTION_KEY = crypto.randomBytes(32); // 256-bit key
const IV_LENGTH = 16; // Initialization vector length

// Encrypt function
function encrypt(text) {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

// Decrypt function
function decrypt(text) {
  const textParts = text.split(':');
  const iv = Buffer.from(textParts.shift(), 'hex');
  const encryptedText = Buffer.from(textParts.join(':'), 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

// Validate function
const validatePasswordInput = (name, password) => {
  return name && password && name.trim() !== '' && password.trim() !== '';
};

// Route to add a password with encryption
app.post('/add-password', (req, res) => {
    const { name, password } = req.body;
    if (validatePasswordInput(name, password)) {
      const encryptedPassword = encrypt(password);
      passwords.push({ name, password: encryptedPassword });
      res.status(201).json({ message: 'Password added successfully' });
    } else {
      res.status(400).json({ message: 'Invalid input: name and password cannot be empty' });
    }
  });
  

// Route to retrieve a specific password with decryption
app.get('/get-password/:name', (req, res) => {
  const { name } = req.params;
  const entry = passwords.find(p => p.name === name);
  if (entry) {
    const decryptedPassword = decrypt(entry.password);
    res.status(200).json({ name: entry.name, password: decryptedPassword });
  } else {
    res.status(404).json({ message: `No password found for '${name}'` });
  }
});

// Route to list all stored passwords (names only for security)
app.get('/list-passwords', (req, res) => {
  if (passwords.length > 0) {
    const passwordNames = passwords.map(p => ({ name: p.name }));
    res.status(200).json(passwordNames);
  } else {
    res.status(200).json({ message: 'No passwords stored yet' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
