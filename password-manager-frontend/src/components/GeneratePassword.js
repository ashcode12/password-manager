import React, { useState } from "react";

const GeneratePassword = ({ onPasswordGenerated }) => {
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

      if (response.ok) {
        const data = await response.json();
        setGeneratedPassword(data.password);
        setMessage("Password generated successfully!");
        onPasswordGenerated(data.password); // Send the generated password to AddPassword
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || "Error generating password.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred while generating the password.");
    }
  };

  const handleCopy = () => {
    if (generatedPassword) {
      navigator.clipboard.writeText(generatedPassword);
      setMessage("Password copied to clipboard!");
    }
  };

  return (
    <div className="password-generator">
      <h2>Generate Password</h2>
      <label>
        Length:
        <input
          type="number"
          min="1"
          max="128"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
        />
      </label>
      <div>
        <label>
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={(e) => setIncludeNumbers(e.target.checked)}
          />
          Include Numbers
        </label>
        <label>
          <input
            type="checkbox"
            checked={includeSymbols}
            onChange={(e) => setIncludeSymbols(e.target.checked)}
          />
          Include Symbols
        </label>
        <label>
          <input
            type="checkbox"
            checked={includeUppercase}
            onChange={(e) => setIncludeUppercase(e.target.checked)}
          />
          Include Uppercase
        </label>
        <label>
          <input
            type="checkbox"
            checked={includeLowercase}
            onChange={(e) => setIncludeLowercase(e.target.checked)}
          />
          Include Lowercase
        </label>
      </div>
      <button onClick={handleGenerate}>Generate Password</button>
      {generatedPassword && (
        <div>
          <p>Generated Password: {generatedPassword}</p>
          <button onClick={handleCopy}>Copy to Clipboard</button>
        </div>
      )}
      {message && <p>{message}</p>}
    </div>
  );
};

export default GeneratePassword;
