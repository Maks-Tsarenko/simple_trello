export const formatDate = (date: Date): string => {
  let dd: string | number = date.getDate();
  let mm: string | number = date.getMonth() + 1;
  const yyyy: number = date.getFullYear();

  if (dd < 10) {
    dd = '0' + dd;
  }

  if (mm < 10) {
    mm = '0' + mm;
  }

  return dd + '.' + mm + '.' + yyyy;
};