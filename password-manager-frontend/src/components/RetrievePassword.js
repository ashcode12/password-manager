import React, { useState } from "react";

const RetrievePassword = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSearch = async () => {
    console.log("Retrieving password for:", name);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/get-password/${name}`);
      const data = await response.json();

      console.log("Response from API:", data);

      if (response.ok) {
        setPassword(data.password);
        setMessage("");
      } else {
        setPassword("");
        setMessage(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred while retrieving the password.");
    }
  };

  return (
    <div>
      <h2>Retrieve Password</h2>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <button onClick={handleSearch}>Search</button>
      {password && <p>Password: {password}</p>}
      {message && <p>{message}</p>}
    </div>
  );
};

export default RetrievePassword;
