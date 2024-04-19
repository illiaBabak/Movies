import { UserData } from 'src/types/types';

export const setCurrentUserStorage = (userInfo: UserData | string): void =>
  sessionStorage.setItem('current-user', JSON.stringify(userInfo));
