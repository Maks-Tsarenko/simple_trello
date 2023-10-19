export const getColorBasedOnDate = (dueDate: Date | string): string => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (!(dueDate instanceof Date)) {
    dueDate = new Date(dueDate);
  }
  dueDate.setHours(0, 0, 0, 0);

  if (dueDate < today) {
    return '--red';
  } else if (dueDate.getTime() === today.getTime()) {
    return '--yellow-hot';
  } else if (dueDate.getTime() === tomorrow.getTime()) {
    return '--yellow';
  } else {
    return '--default';
  }
};