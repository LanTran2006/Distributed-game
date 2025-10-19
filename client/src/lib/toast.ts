import { toast } from 'react-toastify';
import type { ToastOptions } from 'react-toastify';

// Default toast configuration
const defaultOptions: ToastOptions = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

// Toast utility functions
export const showToast = {
  success: (message: string, options?: ToastOptions) => {
    toast.success(message, { ...defaultOptions, ...options });
  },
  
  error: (message: string, options?: ToastOptions) => {
    toast.error(message, { ...defaultOptions, ...options });
  },
  
  info: (message: string, options?: ToastOptions) => {
    toast.info(message, { ...defaultOptions, ...options });
  },
  
  warning: (message: string, options?: ToastOptions) => {
    toast.warning(message, { ...defaultOptions, ...options });
  },
  
  // Custom toast for game events
  gameEvent: (message: string, type: 'win' | 'lose' | 'disconnect') => {
    const options: ToastOptions = {
      ...defaultOptions,
      autoClose: type === 'disconnect' ? 3000 : 8000,
    };
    
    switch (type) {
      case 'win':
        toast.success(`🎉 ${message}`, options);
        break;
      case 'lose':
        toast.error(`😢 ${message}`, options);
        break;
      case 'disconnect':
        toast.error(`⚠️ ${message}`, options);
        break;
    }
  }
};

export default showToast;