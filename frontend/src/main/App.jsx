import Login from '../Login';
import Cadastro from '../Cadastro';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import PrivateRoute from '../Private';
import { useState, useEffect } from "react"

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleSignup = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <BrowserRouter>
      {!isAuthenticated ? (
        <Routes>
          <Route path="/" element={<Login onLogin={handleLogin} />} />
          <Route path="/cadastro" element={<Cadastro onSignup={handleSignup} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      ) : (
        <div className="app">
          <Routes>
            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
        </div>
      )}
    </BrowserRouter>
  );
};

export default App;