import React from 'react';
import './Auth.css';

const SignUp = () => {
  return (
    <div className="auth-box">
      <h2>Sign Up</h2>
      <input type="text" placeholder="Username" />
      <input type="password" placeholder="Password" />
      <button>Sign Up</button>
    </div>
  );
};

export default SignUp;
