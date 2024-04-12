import { UserData } from 'src/types/types';
import { isUserDataArr } from './guards';

export const getUsers = (): UserData[] => {
  const usersLocalStorage = localStorage.getItem('users');
  const usersData: unknown = usersLocalStorage ? JSON.parse(usersLocalStorage) : '';
  const parsedUsersData = isUserDataArr(usersData) ? usersData : [];

  return parsedUsersData;
};
