import React, { useState } from 'react';
import './LoginPage.css';
import image from "../components/images/spongebob_header.jpg";

export const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const user = await response.json();
        onLogin(user);
      } else {
        console.log('Login failed');
      }
    } catch (error) {
      console.log('login Error:', error);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundImage: `url(${image})`, backgroundSize: "cover", backgroundRepeat: "no-repeat"}} > 
      <form className="login-form" onSubmit={handleLogin}>
      <h1 className='bann'>SpongeBob SquarePants</h1>
        <input
          type="text"
          className="login-input"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="login-input"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}

        />
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>

  );
};

export default LoginPage;
