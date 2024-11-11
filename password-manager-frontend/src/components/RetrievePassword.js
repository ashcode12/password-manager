import React, { useState } from 'react';
import { getPassword } from '../services/apiService';

function RetrievePassword() {
  const [name, setName] = useState('');
  const [passwordData, setPasswordData] = useState(null);
  const [error, setError] = useState('');

  const handleRetrieve = async () => {
    try {
      const data = await getPassword(name);
      setPasswordData(data);
      setError('');
    } catch (error) {
      setError('Password not found or an error occurred');
      setPasswordData(null);
    }
  };

  return (
    <div>
      <h2>Retrieve Password</h2>
      <input
        type="text"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleRetrieve}>Retrieve</button>
      {passwordData && (
        <div>
          <p><strong>Name:</strong> {passwordData.name}</p>
          <p><strong>Password:</strong> {passwordData.password}</p>
        </div>
      )}
      {error && <p>{error}</p>}
    </div>
  );
}

export default RetrievePassword;
