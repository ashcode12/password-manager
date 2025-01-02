import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ListPasswords = () => {
  const [passwords, setPasswords] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchPasswords = async () => {
      try {
        const response = await axios.get('http://localhost:3000/list-passwords');
        setPasswords(response.data);
      } catch (error) {
        setMessage(error.response?.data?.message || 'An error occurred');
      }
    };

    fetchPasswords();
  }, []);

  return (
    <div>
      <h2>List of Passwords</h2>
      {message && <p>{message}</p>}
      <ul>
        {passwords.map((password, index) => (
          <li key={index}>{password.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ListPasswords;