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

// Lista inicial de usuarios. En una app real, esto vendría de una base de datos.
const initialUsers = [
  {
    id: 1,
    username: 'admin',
    password: 'admin123',
    name: 'Administrador',
    role: 'admin',
    permissions: {
      puede_crear_inventario: true,
      puede_editar_inventario: true,
      puede_eliminar_inventario: true,
      puede_gestionar_prestamos: true,
    },
  },
  {
    id: 2,
    username: 'obed_alvarado',
    password: 'obed123',
    name: 'Obed Alvarado',
    role: 'user',
    permissions: {
      puede_crear_inventario: true,
      puede_editar_inventario: true,
      puede_eliminar_inventario: false, // Este usuario no puede eliminar
      puede_gestionar_prestamos: true,
    },
  },
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState(initialUsers); // Estado para la lista de usuarios

  useEffect(() => {
    const savedUser = loadUser();
    if (savedUser) {
      setUser(savedUser);
    }
    setLoading(false);
  }, []);

  // Login
  const login = (username, password) => {
    const foundUser = users.find(
      (u) => u.username === username && u.password === password
    );

    if (foundUser) {
      const userData = {
        username: foundUser.username,
        name: foundUser.name,
        role: foundUser.role,
        permissions: foundUser.permissions || {}, // Incluir permisos
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

  // Verificar un permiso específico
  const hasPermission = (permission) => {
    // El admin siempre tiene todos los permisos
    if (user?.role === 'admin') return true;
    return user?.permissions?.[permission] || false;
  };

  const value = {
    user,
    loading,
    users, // Exponemos la lista de usuarios
    setUsers, // Exponemos la función para actualizar usuarios
    login,
    logout,
    isAuthenticated,
    hasRole,
    hasPermission, // Exponemos la nueva función
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
