import React, { useState } from 'react';
import './App.css';
import LoginPage from './pages/LoginPage';
import DataPage from './pages/DataPage';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authData, setAuthData] = useState({ auth_user: '', auth_password: '' });

  const handleLogin = (userData: { auth_user: string; auth_password: string }) => {
    setAuthData(userData);
    setIsLoggedIn(true);
  };

  return (
    <div className="App">
      {isLoggedIn ? (
        <DataPage authData={authData} />
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;