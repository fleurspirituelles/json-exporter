import React, { useState } from 'react';

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
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>User:</label>
          <input
            type="text"
            value={auth_user}
            onChange={(e) => setAuthUser(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={auth_password}
            onChange={(e) => setAuthPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;