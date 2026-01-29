export const getUserId = (): string | null => {
  return localStorage.getItem('userId');
};

export const setUserId = (userId: string): void => {
  localStorage.setItem('userId', userId);
};

export const getUserEmail = (): string | null => {
  return localStorage.getItem('userEmail');
};

export const setUserEmail = (email: string): void => {
  localStorage.setItem('userEmail', email);
};

export const clearUserData = (): void => {
  localStorage.removeItem('userId');
  localStorage.removeItem('userEmail');
};

export const isAuthenticated = (): boolean => {
  return !!getUserId();
};
