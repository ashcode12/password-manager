import React from 'react';
import AddPassword from './components/AddPassword';
import RetrievePassword from './components/RetrievePassword';
import ListPasswords from './components/ListPasswords';

function App() {
  return (
    <div>
      <h1>Password Manager</h1>
      <AddPassword />
      <RetrievePassword />
      <ListPasswords />
    </div>
  );
}

export default App;
