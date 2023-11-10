import { parse } from 'date-fns';

export const formatStringToDate = (date?: string | null) => {
  if (date) {
    return parse(date, 'dd.MM.yyyy', new Date());
  }
};
