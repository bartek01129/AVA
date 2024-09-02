import React from 'react';
import './css/StartPage.css';
import { Link } from 'react-router-dom';

const App = () => {
  return (
    <div class="container">
      <h1 class="start-h1">AVA APP</h1>
      <Link to="/login">
        <button class="button-start">Zaloguj się</button>
      </Link>
      <Link to="/register">
        <button class="button-start">Zarejestruj się</button>
      </Link>
    </div>
  );
};

export default App;
