// Utilidades para manejo de localStorage

const STORAGE_KEYS = {
  TOOLS: 'inventory_tools',
  LOANS: 'inventory_loans',
  USER: 'inventory_user',
};

// Guardar datos en localStorage
export const saveToLocalStorage = (key, data) => {
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(key, serializedData);
    return true;
  } catch (error) {
    console.error('Error saving to localStorage:', error);
    return false;
  }
};

// Cargar datos desde localStorage
export const loadFromLocalStorage = (key, defaultValue = null) => {
  try {
    const serializedData = localStorage.getItem(key);
    if (serializedData === null) {
      return defaultValue;
    }
    return JSON.parse(serializedData);
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return defaultValue;
  }
};

// Eliminar datos de localStorage
export const removeFromLocalStorage = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('Error removing from localStorage:', error);
    return false;
  }
};

// Limpiar todo el localStorage
export const clearLocalStorage = () => {
  try {
    localStorage.clear();
    return true;
  } catch (error) {
    console.error('Error clearing localStorage:', error);
    return false;
  }
};

// Funciones específicas para herramientas
export const saveTools = (tools) => {
  return saveToLocalStorage(STORAGE_KEYS.TOOLS, tools);
};

export const loadTools = () => {
  return loadFromLocalStorage(STORAGE_KEYS.TOOLS, [
    { id: 1, name: 'Martillo', category: 'Herramientas Manuales', brand: 'Stanley', availableStock: 8, totalStock: 10, status: 'Disponible' },
    { id: 2, name: 'Destornillador', category: 'Herramientas Manuales', brand: 'Bosch', availableStock: 2, totalStock: 5, status: 'Bajo Stock' },
    { id: 3, name: 'Taladro', category: 'Herramientas Eléctricas', brand: 'Makita', availableStock: 5, totalStock: 5, status: 'Disponible' },
  ]);
};

// Funciones específicas para préstamos
export const saveLoans = (loans) => {
  return saveToLocalStorage(STORAGE_KEYS.LOANS, loans);
};

export const loadLoans = () => {
  return loadFromLocalStorage(STORAGE_KEYS.LOANS, [
    { id: 1, user: 'Juan Pérez', toolId: 1, toolName: 'Martillo', loanDate: '2023-10-01', returnDate: '2023-10-15', status: 'Activo' },
    { id: 2, user: 'María García', toolId: 3, toolName: 'Taladro', loanDate: '2023-10-05', returnDate: '2023-10-20', status: 'Activo' },
  ]);
};

// Funciones específicas para usuario
export const saveUser = (user) => {
  return saveToLocalStorage(STORAGE_KEYS.USER, user);
};

export const loadUser = () => {
  return loadFromLocalStorage(STORAGE_KEYS.USER, null);
};

export const removeUser = () => {
  return removeFromLocalStorage(STORAGE_KEYS.USER);
};

const localStorageUtils = {
  saveToLocalStorage,
  loadFromLocalStorage,
  removeFromLocalStorage,
  clearLocalStorage,
  saveTools,
  loadTools,
  saveLoans,
  loadLoans,
  saveUser,
  loadUser,
  removeUser,
};

export default localStorageUtils;
