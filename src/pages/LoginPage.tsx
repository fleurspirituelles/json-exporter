import React, { useState } from 'react';
import './styles/LoginPage.css';

interface LoginPageProps {
  onLogin: (userData: { auth_user: string; auth_password: string }) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [auth_user, setAuthUser] = useState('');
  const [auth_password, setAuthPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({ auth_user, auth_password });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            value={auth_user}
            placeholder='Username'
            onChange={(e) => setAuthUser(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            value={auth_password}
            placeholder='Password'
            onChange={(e) => setAuthPassword(e.target.value)}
            required
          />
        </div>
        <button className='login-button' type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;