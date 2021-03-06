// list of client side validators

export type Field = string | null;
export type BoolLike = boolean | number | string | null;
export type ValidatorRecord = Record<string, Array<(field: Field) => BoolLike>>;

export const required = (field: Field) => {
  return field && field.length;
};

export const minLength = (len: number) => (field: Field) => {
  return field && field.length >= len;
};

export const maxLength = (len: number) => (field: Field) => {
  return field && field.length <= len;
};

export const isNumber = (field: Field) => !isNaN(Number(field));

export const validEmail = (field: Field) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(field!);
