const MONTH_NAME = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const;

export const getCurrentDate = (): string => {
  const currentDate = new Date();

  const day = currentDate.getDate();
  const month = MONTH_NAME[currentDate.getMonth()];
  const year = currentDate.getFullYear();

  return `${day} ${month} ${year}`;
};
