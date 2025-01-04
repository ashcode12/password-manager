import React, { useState } from "react";

const RetrievePassword = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [copyStatus, setCopyStatus] = useState("");

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/get-password/${name}`
      );
      const data = await response.json();

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

  const handleCopy = () => {
    navigator.clipboard.writeText(password).then(
      () => {
        setCopyStatus("Password copied to clipboard!");
        setTimeout(() => setCopyStatus(""), 2000); // Clear status after 2 seconds
      },
      () => {
        setCopyStatus("Failed to copy password.");
        setTimeout(() => setCopyStatus(""), 2000);
      }
    );
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
      {password && (
        <div>
          <p>
            <strong>Password:</strong> {password}
          </p>
          <button onClick={handleCopy}>Copy to Clipboard</button>
          {copyStatus && <p>{copyStatus}</p>}
        </div>
      )}
      {message && <p>{message}</p>}
    </div>
  );
};

export default RetrievePassword;
