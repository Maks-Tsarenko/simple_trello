import { format } from 'date-fns';

export const formatDateToString = (date: Date): string => {
  return format(date, 'dd.MM.yyyy');
};
