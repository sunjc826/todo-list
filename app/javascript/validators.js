// list of client side validators

export const required = (field) => {
  return field && field.length;
};

export const minLength = (len) => (field) => {
  return field && field.length >= len;
};

export const maxLength = (len) => (field) => {
  return field && field.length <= len;
};

export const isNumber = (field) => !isNaN(Number(field));

export const validEmail = (field) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(field);
