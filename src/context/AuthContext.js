import React, { createContext, useContext, useState, useEffect } from 'react';
import { saveUser, loadUser, removeUser } from '../utils/localStorage';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cargar usuario al iniciar
  useEffect(() => {
    const savedUser = loadUser();
    if (savedUser) {
      setUser(savedUser);
    }
    setLoading(false);
  }, []);

  // Login
  const login = (username, password) => {
    // Usuarios de prueba (en producción esto sería una llamada a API)
    const users = [
      { username: 'admin', password: 'admin123', name: 'Administrador', role: 'admin' },
      { username: 'obed_alvarado', password: 'obed123', name: 'Obed Alvarado', role: 'user' },
      { username: 'usuario', password: 'usuario123', name: 'Usuario Demo', role: 'user' },
    ];

    const foundUser = users.find(
      (u) => u.username === username && u.password === password
    );

    if (foundUser) {
      const userData = {
        username: foundUser.username,
        name: foundUser.name,
        role: foundUser.role,
        loginTime: new Date().toISOString(),
      };
      setUser(userData);
      saveUser(userData);
      return { success: true, user: userData };
    }

    return { success: false, message: 'Usuario o contraseña incorrectos' };
  };

  // Logout
  const logout = () => {
    setUser(null);
    removeUser();
  };

  // Verificar si está autenticado
  const isAuthenticated = () => {
    return user !== null;
  };

  // Verificar rol
  const hasRole = (role) => {
    return user && user.role === role;
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated,
    hasRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
