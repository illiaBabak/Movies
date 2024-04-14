import { UserData } from 'src/types/types';
import { isUserData } from './guards';

export const getCurrentUser = (): UserData | null => {
  const userSessionStorage = sessionStorage.getItem('current-user');
  const userData: unknown = userSessionStorage ? JSON.parse(userSessionStorage) : '';
  const parsedUser = isUserData(userData) ? userData : null;

  return parsedUser;
};
