import React from "react";
import AddPassword from "./components/AddPassword";
import RetrievePassword from "./components/RetrievePassword";
import ListPasswords from "./components/ListPasswords";
import ErrorBoundary from "./ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <div className="App">
        <h1>Password Manager</h1>
        <ErrorBoundary>
          <AddPassword />
        </ErrorBoundary>
        <ErrorBoundary>
          <RetrievePassword />
        </ErrorBoundary>
        <ErrorBoundary>
          <ListPasswords />
        </ErrorBoundary>
      </div>
    </ErrorBoundary>
  );
}

export default App;
