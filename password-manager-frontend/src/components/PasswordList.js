import React, { useEffect, useState } from 'react';
import { listPasswords } from '../services/apiService';

function PasswordList() {
  const [passwords, setPasswords] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPasswords = async () => {
      try {
        const data = await listPasswords();
        setPasswords(data);
      } catch (error) {
        setError('Error fetching passwords');
      }
    };

    fetchPasswords();
  }, []);

  return (
    <div>
      <h2>Stored Passwords</h2>
      {error && <p>{error}</p>}
      {passwords.length > 0 ? (
        <ul>
          {passwords.map((entry, index) => (
            <li key={index}>{entry.name}</li>
          ))}
        </ul>
      ) : (
        <p>No passwords stored yet.</p>
      )}
    </div>
  );
}

export default PasswordList;
