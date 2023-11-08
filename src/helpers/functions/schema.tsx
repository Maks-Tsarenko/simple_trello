import * as yup from 'yup';

export const schema = yup.object({
  name: yup.string().required('Name is required'),
  description: yup.string().notRequired().max(200, 'Description cannot be more than 200 characters.'),
  dueDate: yup.string().nullable().notRequired(),
}).required();
