import { MONTHS } from './constants';

export const roundVote = (num: number): number => Math.round((num + Number.EPSILON) * 100) / 100;

export const formatDateToWords = (dateString: string): string => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = MONTHS[date.getMonth()];
  const day = date.getDate();

  return `${month} ${day}, ${year}`;
};
