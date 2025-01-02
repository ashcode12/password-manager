const express = require('express');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Add CORS middleware
app.use(cors({
  origin: "http://localhost:3001" // Update this to match your React app's URL
}));

// Path to the local JSON "database"
const dbPath = path.join(__dirname, 'data.json');

// Encryption setup
const ENCRYPTION_KEY = Buffer.from('90e10808735e5ded5070f4471571e3cb3d4553b3452ffc07fecdb84a757dbe12', 'hex');
const IV_LENGTH = 16;

function encrypt(text) {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return iv.toString('hex') + ':' + encrypted;
}

function decrypt(text) {
  const [iv, encryptedText] = text.split(':');
  const decipher = crypto.createDecipheriv('aes-256-cbc', ENCRYPTION_KEY, Buffer.from(iv, 'hex'));
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

function validatePasswordInput(name, password) {
  return (
    typeof name === 'string' &&
    name.trim().length >= 3 &&
    typeof password === 'string' &&
    password.trim() !== ''
  );
}

// Add a new password
app.post('/add-password', async (req, res) => {
  const { name, password } = req.body;

  if (validatePasswordInput(name, password)) {
    try {
      const db = JSON.parse(fs.readFileSync(dbPath));
      const existingPassword = db.passwords.find(p => p.name === name);

      if (existingPassword) {
        return res.status(400).json({
          message: `Password for "${name}" already exists. Use a different name.`,
        });
      }

      const encryptedPassword = encrypt(password);
      db.passwords.push({ name, password: encryptedPassword });
      fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

      res.status(201).json({ message: `Password for "${name}" added successfully` });
    } catch (error) {
      console.error("Error adding password:", error);
      res.status(500).json({ message: "An error occurred while adding the password." });
    }
  } else {
    res.status(400).json({ message: "Invalid input: Name must have at least 3 characters, and password cannot be empty." });
  }
});

// Get a password by name
app.get('/get-password/:name', (req, res) => {
  const { name } = req.params;

  try {
    const db = JSON.parse(fs.readFileSync(dbPath));
    const entry = db.passwords.find(p => p.name === name);

    if (entry) {
      const decryptedPassword = decrypt(entry.password);
      res.status(200).json({ name, password: decryptedPassword });
    } else {
      res.status(404).json({ message: `No password entry found for "${name}".` });
    }
  } catch (error) {
    console.error('Error retrieving password:', error);
    res.status(500).json({ message: 'An error occurred while retrieving the password.' });
  }
});

// List all password names
app.get('/list-passwords', (req, res) => {
  try {
    const db = JSON.parse(fs.readFileSync(dbPath));
    const passwordNames = db.passwords.map(p => ({ name: p.name }));

    if (passwordNames.length === 0) {
      res.status(200).json({ message: 'No passwords stored yet.' });
    } else {
      res.status(200).json(passwordNames);
    }
  } catch (error) {
    console.error('Error listing passwords:', error);
    res.status(500).json({ message: 'An error occurred while listing passwords.' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Export the app for testing
module.exports = app;

// Password Generator
function generatePassword({ length, includeNumbers, includeSymbols, includeUppercase, includeLowercase }) {
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+[]{}|;:',.<>?";
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  let characterPool = "";
  if (includeNumbers) characterPool += numbers;
  if (includeSymbols) characterPool += symbols;
  if (includeLowercase) characterPool += lowercase;
  if (includeUppercase) characterPool += uppercase;

  if (!characterPool) {
    throw new Error("At least one character type must be selected");
  }

  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characterPool.length);
    password += characterPool[randomIndex];
  }
  return password;
}

// Endpoint for Password Generation
app.post('/generate-password', (req, res) => {
  try {
    const { length, includeNumbers, includeSymbols, includeUppercase, includeLowercase } = req.body;

    if (!length || length < 1 || length > 128) {
      return res.status(400).json({ message: "Invalid length. Please provide a length between 1 and 128." });
    }

    const password = generatePassword({
      length,
      includeNumbers,
      includeSymbols,
      includeUppercase,
      includeLowercase,
    });

    res.status(200).json({ password });
  } catch (error) {
    console.error("Error generating password:", error);
    res.status(500).json({ message: error.message });
  }
});
