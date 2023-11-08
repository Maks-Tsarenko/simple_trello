import { getColorBasedOnDate } from 'helpers/functions/getColorBasedOnDate';

export const getCurrentColor = (dueDate?: Date) => {
  if (dueDate) {
    return getColorBasedOnDate(dueDate);
  } else {
    return '';
  }
};
