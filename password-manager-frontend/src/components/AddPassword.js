import React, { useState } from "react";

const AddPassword = ({ prefilledPassword }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState(prefilledPassword || "");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/add-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, password }),
      });

      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred while adding the password.");
    }
  };

  // Update the password field if prefilledPassword changes
  React.useEffect(() => {
    if (prefilledPassword) {
      setPassword(prefilledPassword);
    }
  }, [prefilledPassword]);

  return (
    <div className="add-password">
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
