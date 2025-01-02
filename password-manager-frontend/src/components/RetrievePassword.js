import React, { useState } from 'react';
import axios from 'axios';

const RetrievePassword = () => {
  const [name, setName] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/get-password/${name}`);
      setResult(response.data.password);
      setError('');
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
      setResult('');
    }
  };

  return (
    <div>
      <h2>Retrieve Password</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      {result && <p>Password: {result}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default RetrievePassword;