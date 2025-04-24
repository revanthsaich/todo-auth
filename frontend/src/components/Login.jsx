import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    axios
      .post('http://localhost:5000/api/users/login', { username, password })
      .then((res) => {
        localStorage.setItem('token', res.data.token);       // ✅ Save token
        localStorage.setItem('userId', res.data.userId);
        localStorage.setItem('username', username);
        navigate('/');
      })
      .catch((err) => {
        console.error('Login failed', err);
      });
  };

  return (
    <div>
      <h2>Login</h2>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
