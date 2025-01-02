import React, { useState, useEffect } from "react";

const ListPasswords = () => {
  const [passwords, setPasswords] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchPasswords = async () => {
      console.log("Fetching passwords from API:", process.env.REACT_APP_API_URL);

      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/list-passwords`);
        const data = await response.json();

        console.log("Response from API:", data);

        if (response.ok) {
          if (Array.isArray(data)) {
            setPasswords(data);
            setMessage("");
          } else {
            setPasswords([]);
            setMessage(data.message);
          }
        } else {
          setMessage("An error occurred while listing passwords.");
        }
      } catch (error) {
        console.error("Error:", error);
        setMessage("An error occurred while listing passwords.");
      }
    };

    fetchPasswords();
  }, []);

  return (
    <div>
      <h2>List Passwords</h2>
      {message && <p>{message}</p>}
      <ul>
        {passwords.map((p, index) => (
          <li key={index}>{p.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ListPasswords;
