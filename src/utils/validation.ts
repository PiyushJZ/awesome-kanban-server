import { emailRegex, passwordRegex } from '@regex';

export const validateEmail = (email: string): boolean => {
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  return passwordRegex.test(password);
};
