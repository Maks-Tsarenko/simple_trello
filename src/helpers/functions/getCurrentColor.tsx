import { getColorBasedOnDate } from 'helpers/functions/getColorBasedOnDate';

export const getCurrentColor = (dueDate?: Date | null) => {
  if (dueDate) {
    return getColorBasedOnDate(dueDate);
  } else {
    return '';
  }
};
