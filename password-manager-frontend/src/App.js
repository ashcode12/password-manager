import React, { useState } from "react";
import AddPassword from "./components/AddPassword";
import RetrievePassword from "./components/RetrievePassword";
import ListPasswords from "./components/ListPasswords";
import GeneratePassword from "./components/GeneratePassword";
import "./App.css";

function App() {
  const [generatedPassword, setGeneratedPassword] = useState("");

  const handlePasswordGenerated = (password) => {
    setGeneratedPassword(password);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Password Manager</h1>
      </header>
      <main className="App-main">
        <div className="App-section">
          <GeneratePassword onPasswordGenerated={handlePasswordGenerated} />
        </div>
        <div className="App-section">
          <AddPassword prefilledPassword={generatedPassword} />
        </div>
        <div className="App-section">
          <RetrievePassword />
        </div>
        <div className="App-section">
          <ListPasswords />
        </div>
      </main>
    </div>
  );
}

export default App;
