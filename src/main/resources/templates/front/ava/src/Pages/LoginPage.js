import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../css/LoginPage.css';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:8080/accounts/pass/${username}`
      );

      if (response.data === enteredPassword) {
        navigate(`/ava`, { state: { username } });
      }
    } catch (error) {
      console.error('Błąd podczas pobierania hasła', error);
    }
  };

  return (
    <div>
      <form class="login__form" onSubmit={handleSubmit}>
        <div class="login">
          <div class="login-coniatnier">
            <h1 class="login__title">Login AVA</h1>

            <div class="login-box-input">
              <label class="login-label">Username</label>
              <input
                type="text"
                required
                class="login-input"
                maxlength="15"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div class="login-box-input">
              <label class="login-label">Password</label>
              <input
                type="password"
                name="password"
                class="login-input"
                maxlength="20"
                value={enteredPassword}
                onChange={(e) => setEnteredPassword(e.target.value)}
              />
            </div>

            <button type="submit" class="login-button">
              Login
            </button>

            <p class="login-register">
              Don't have an account?{' '}
              <Link to="/register">
                <span class="register-text">Register</span>
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
