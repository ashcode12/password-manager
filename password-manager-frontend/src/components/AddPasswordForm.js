import React, { useState } from 'react';
import { addPassword } from '../services/apiService';

function AddPasswordForm() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addPassword({ name, password });
      setMessage(response.message);
      setName('');
      setPassword('');
    } catch (error) {
      setMessage('Failed to add password');
    }
  };

  return (
    <div>
      <h2>Add Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default AddPasswordForm;
