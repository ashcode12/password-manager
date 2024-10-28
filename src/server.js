const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

const passwords = [];

// Function to validate password input
const validatePasswordInput = (name, password) => {
  return name && password && name.trim() !== '' && password.trim() !== '';
};

// Route to add a password with validation
app.post('/add-password', (req, res) => {
  const { name, password } = req.body;
  if (validatePasswordInput(name, password)) {
    passwords.push({ name, password });
    res.status(201).json({ message: 'Password added successfully' });
  } else {
    res.status(400).json({ message: 'Invalid input: name and password cannot be empty' });
  }
});

// Route to retrieve a specific password with error handling
app.get('/get-password/:name', (req, res) => {
  const { name } = req.params;
  const entry = passwords.find(p => p.name === name);
  if (entry) {
    res.status(200).json(entry);
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

// Temporary route to clear all passwords (for testing purposes only)
app.delete('/clear-passwords', (req, res) => {
    passwords.length = 0; // Clears the array
    res.status(200).json({ message: 'All passwords cleared' });
  });
  

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
