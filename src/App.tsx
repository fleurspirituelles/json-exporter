import React, { useState } from 'react';
import LoginPage from './pages/LoginPage';
import DataPage from './pages/DataPage';
import './styles/variables.css';
import './styles/globals.css';

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