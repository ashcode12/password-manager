import './App.css';
import React from 'react';
import AddPasswordForm from './components/AddPasswordForm';
import RetrievePassword from './components/RetrievePassword';
import PasswordList from './components/PasswordList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Password Manager</h1>
      </header>
      <main>
        <section>
          <AddPasswordForm />
        </section>
        <section>
          <RetrievePassword />
        </section>
        <section>
          <PasswordList />
        </section>
      </main>
    </div>
  );
}

export default App;
