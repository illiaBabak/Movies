import { MONTHS } from './constants';

export const getCurrentDate = (): string => {
  const currentDate = new Date();

  const day = currentDate.getDate();
  const month = MONTHS[currentDate.getMonth()];
  const year = currentDate.getFullYear();

  return `${day} ${month} ${year}`;
};
