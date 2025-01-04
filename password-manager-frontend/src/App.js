import React from "react";
import AddPassword from "./components/AddPassword";
import RetrievePassword from "./components/RetrievePassword";
import ListPasswords from "./components/ListPasswords";
import GeneratePassword from "./components/GeneratePassword";

import "./App.css";

function App() {
  return (
    <div className="App">
      {/* Navbar */}
      <header className="navbar">
        <h1>Password Manager</h1>
      </header>

      {/* Main Container */}
      <div className="container">
        {/* Left Column */}
        <div className="left-column">
          <div className="card">
            <h2>Add Password</h2>
            <AddPassword />
          </div>
          <div className="card">
            <h2>Generate Password</h2>
            <GeneratePassword />
          </div>
        </div>

        {/* Right Column */}
        <div className="right-column">
          <div className="card">
            <h2>Retrieve Password</h2>
            <RetrievePassword />
          </div>
          <div className="card">
            <h2>List Passwords</h2>
            <ListPasswords />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
