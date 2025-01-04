import React, { useState } from "react";

const GeneratePassword = () => {
  const [length, setLength] = useState(12);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleGenerate = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/generate-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          length,
          includeNumbers,
          includeSymbols,
          includeUppercase,
          includeLowercase,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setGeneratedPassword(data.password);
        setMessage("");
      } else {
        setGeneratedPassword("");
        setMessage(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred while generating the password.");
    }
  };

  return (
    <div>
      <h2>Generate Password</h2>
      <label>
        Length:
        <input
          type="number"
          value={length}
          min="1"
          max="128"
          onChange={(e) => setLength(Number(e.target.value))}
        />
      </label>
      <label>
        <input
          type="checkbox"
          checked={includeNumbers}
          onChange={() => setIncludeNumbers(!includeNumbers)}
        />
        Include Numbers
      </label>
      <label>
        <input
          type="checkbox"
          checked={includeSymbols}
          onChange={() => setIncludeSymbols(!includeSymbols)}
        />
        Include Symbols
      </label>
      <label>
        <input
          type="checkbox"
          checked={includeUppercase}
          onChange={() => setIncludeUppercase(!includeUppercase)}
        />
        Include Uppercase
      </label>
      <label>
        <input
          type="checkbox"
          checked={includeLowercase}
          onChange={() => setIncludeLowercase(!includeLowercase)}
        />
        Include Lowercase
      </label>
      <button onClick={handleGenerate}>Generate Password</button>
      {generatedPassword && (
        <p>
          <strong>Generated Password:</strong> {generatedPassword}
        </p>
      )}
      {message && <p>{message}</p>}
    </div>
  );
};

export default GeneratePassword;
