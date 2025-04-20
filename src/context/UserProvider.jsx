import React, { useState, useEffect } from 'react';
import { UserContext } from './UserContext.jsx';

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const name = localStorage.getItem('name');
    const role = localStorage.getItem('role');
    const token = localStorage.getItem('token');

    if (name && role && token) {
      setUser({ name, role, token });
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('name', userData.name);
    localStorage.setItem('role', userData.role);
    localStorage.setItem('token', userData.token);
    console.log('Logging in:', userData);

  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('name');
    localStorage.removeItem('role');
    localStorage.removeItem('token');
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
