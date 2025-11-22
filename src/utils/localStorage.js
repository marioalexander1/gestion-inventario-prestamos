// Claves para localStorage
const TOOLS_KEY = 'app_tools';
const LOANS_KEY = 'app_loans';
const USER_KEY = 'app_user';
const USERS_LIST_KEY = 'app_users_list';

// --- Gestión de Herramientas ---
export const saveTools = (tools) => {
  try {
    localStorage.setItem(TOOLS_KEY, JSON.stringify(tools));
  } catch (error) {
    console.error('Error guardando herramientas en localStorage:', error);
  }
};

export const loadTools = () => {
  try {
    const tools = localStorage.getItem(TOOLS_KEY);
    return tools ? JSON.parse(tools) : [];
  } catch (error) {
    console.error('Error cargando herramientas desde localStorage:', error);
    return [];
  }
};

// --- Gestión de Préstamos ---
export const saveLoans = (loans) => localStorage.setItem(LOANS_KEY, JSON.stringify(loans));
export const loadLoans = () => JSON.parse(localStorage.getItem(LOANS_KEY)) || [];

// --- Gestión del Usuario Autenticado ---
export const saveUser = (user) => localStorage.setItem(USER_KEY, JSON.stringify(user));
export const loadUser = () => JSON.parse(localStorage.getItem(USER_KEY));
export const removeUser = () => localStorage.removeItem(USER_KEY);

// --- Gestión de la Lista Completa de Usuarios ---
export const saveUsers = (users) => {
  try {
    localStorage.setItem(USERS_LIST_KEY, JSON.stringify(users));
  } catch (error) {
    console.error('Error guardando la lista de usuarios en localStorage:', error);
  }
};

export const loadUsers = () => {
  const users = localStorage.getItem(USERS_LIST_KEY);
  return users ? JSON.parse(users) : null; // Devolvemos null si no hay nada
};