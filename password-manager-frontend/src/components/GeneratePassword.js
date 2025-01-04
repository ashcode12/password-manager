import React, { useState } from "react";

const GeneratePassword = () => {
  const [length, setLength] = useState(12);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleGeneratePassword = async () => {
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

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error generating password");
      }

      const data = await response.json();
      setGeneratedPassword(data.password);
      setErrorMessage(""); // Clear any previous error message
    } catch (error) {
      console.error("Error generating password:", error);
      setGeneratedPassword(""); // Clear the previous password if an error occurs
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="generate-password">
      <h2>Generate Password</h2>
      <label>
        Length:
        <input
          type="number"
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
      <button onClick={handleGeneratePassword}>Generate Password</button>
      {generatedPassword && (
        <p>
          <strong>Generated Password:</strong> {generatedPassword}
        </p>
      )}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
};

export default GeneratePassword;
