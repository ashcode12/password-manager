import React, { useState } from "react";

const GeneratePassword = () => {
  const [length, setLength] = useState(12);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [password, setPassword] = useState("");

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
      setPassword(data.password || "Error generating password");
    } catch (error) {
      console.error("Error:", error);
      setPassword("An error occurred while generating the password.");
    }
  };

  return (
    <div>
      <label>
        Length:
        <input
          type="number"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          min="1"
          max="128"
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
      {password && <p><strong>Generated Password:</strong> {password}</p>}
    </div>
  );
};

export default GeneratePassword;
