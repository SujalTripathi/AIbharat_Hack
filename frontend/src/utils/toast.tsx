import toast from 'react-hot-toast';
import confetti from 'canvas-confetti';

export const showToast = {
  success: (message: string, withConfetti: boolean = false) => {
    toast.success(message, {
      duration: 3000,
      position: 'top-right',
      style: {
        background: 'linear-gradient(135deg, #10b981, #059669)',
        color: '#fff',
        padding: '16px',
        borderRadius: '12px',
        boxShadow: '0 10px 40px rgba(16, 185, 129, 0.3)',
      },
      icon: '✓',
    });
    
    if (withConfetti) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#10b981', '#059669', '#34d399']
      });
    }
  },

  error: (message: string) => {
    toast.error(message, {
      duration: 4000,
      position: 'top-right',
      style: {
        background: 'linear-gradient(135deg, #ef4444, #dc2626)',
        color: '#fff',
        padding: '16px',
        borderRadius: '12px',
        boxShadow: '0 10px 40px rgba(239, 68, 68, 0.3)',
      },
      icon: '✕',
    });
  },

  info: (message: string) => {
    toast(message, {
      duration: 3000,
      position: 'top-right',
      style: {
        background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
        color: '#fff',
        padding: '16px',
        borderRadius: '12px',
        boxShadow: '0 10px 40px rgba(59, 130, 246, 0.3)',
      },
      icon: 'ℹ',
    });
  },

  loading: (message: string) => {
    return toast.loading(message, {
      position: 'top-right',
      style: {
        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
        color: '#fff',
        padding: '16px',
        borderRadius: '12px',
        boxShadow: '0 10px 40px rgba(99, 102, 241, 0.3)',
      },
    });
  },

  promise: <T,>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string;
      error: string;
    },
    withConfetti: boolean = false
  ) => {
    return toast.promise(
      promise,
      {
        loading: messages.loading,
        success: (data) => {
          if (withConfetti) {
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 },
              colors: ['#10b981', '#059669', '#34d399']
            });
          }
          return messages.success;
        },
        error: messages.error,
      },
      {
        position: 'top-right',
        style: {
          padding: '16px',
          borderRadius: '12px',
        },
      }
    );
  },
};

export const triggerConfetti = (options?: confetti.Options) => {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#10b981', '#059669', '#34d399', '#06b6d4', '#3b82f6'],
    ...options
  });
};
