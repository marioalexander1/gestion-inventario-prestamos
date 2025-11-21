// Archivo de compatibilidad para reemplazar react-hot-toast
// Este archivo exporta funciones que pueden ser usadas igual que toast
// pero internamente usan el NotificationContext

let notificationContext = null;

export const setNotificationContext = (context) => {
  notificationContext = context;
};

const toast = {
  success: (message) => {
    if (notificationContext) {
      notificationContext.success(message);
    } else {
      console.log('✅ SUCCESS:', message);
    }
  },
  error: (message) => {
    if (notificationContext) {
      notificationContext.error(message);
    } else {
      console.error('❌ ERROR:', message);
    }
  },
  warning: (message) => {
    if (notificationContext) {
      notificationContext.warning(message);
    } else {
      console.warn('⚠️ WARNING:', message);
    }
  },
  info: (message) => {
    if (notificationContext) {
      notificationContext.info(message);
    } else {
      console.info('ℹ️ INFO:', message);
    }
  },
};

export default toast;
