import React, { useState } from "react";

const AddPassword = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting to API:", process.env.REACT_APP_API_URL);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/add-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, password }),
      });

      const data = await response.json();
      console.log("Response from API:", data);
      setMessage(data.message);
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred while adding the password.");
    }
  };

  return (
    <div>
      <h2>Add Password</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Add Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddPassword;
