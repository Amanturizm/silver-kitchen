import * as yup from 'yup';
import { FieldDef, FieldType } from './types';

export const setNestedValue = (obj: any, path: string[], value: any) =>
  path.reduce((acc, key, idx) => {
    if (idx === path.length - 1) acc[key] = value;
    else return (acc[key] = acc[key] || {});
    return acc[key];
  }, obj);

export const setNestedSchema = (obj: any, path: string[], schema: any) =>
  path.reduce((acc, key, idx) => {
    if (idx === path.length - 1) acc[key] = schema;
    else return (acc[key] = acc[key] || {});
    return acc[key];
  }, obj);

export const createSchema = (yupType: any) => (required?: boolean, label?: string) =>
  required ? yupType().required(`${label} обязательное поле`) : yupType().nullable();

export const typeMap: Record<FieldType, (required?: boolean, label?: string) => yup.Schema<any>> = {
  text: createSchema(yup.string),
  password: createSchema(yup.string),
  textarea: createSchema(yup.string),
  number: createSchema(yup.number),
  select: createSchema(yup.mixed),
  date: createSchema(yup.date),
  map: createSchema(yup.object),
  file: (required?: boolean) =>
    required
      ? yup.mixed<File[]>().test('required', 'Выберите файл', (v) => !!v && v.length > 0)
      : yup.mixed().nullable(),
  files: (required?: boolean) =>
    required
      ? yup.array().of(yup.mixed<File>()).min(1, 'Выберите хотя бы один файл')
      : yup.array().nullable(),
};

export const buildYupObject = (fields: any): yup.ObjectSchema<any> => {
  const shape: Record<string, any> = {};
  for (const key in fields) {
    const value = fields[key];
    if (value?._type) shape[key] = value;
    else if (typeof value === 'object') shape[key] = buildYupObject(value);
    else shape[key] = yup.mixed().nullable();
  }
  return yup.object(shape);
};

export const createFormConfig = (entity: string, fields: FieldDef[]) => {
  const normalizedFields = fields.map((f) => ({ required: true, ...f }));

  const columns = normalizedFields.map((f) => ({
    name: f.name,
    label: f.label,
  }));

  const schemaFields: Record<string, any> = {};
  const defaultValues: Record<string, any> = {};

  normalizedFields.forEach((f) => {
    const path = f.name.split('.');
    const yupType = typeMap[f.type || 'text'](f.required, f.label);
    setNestedSchema(schemaFields, path, yupType);

    const initialValue = f.type === 'file' || f.type === 'files' ? [] : undefined;
    setNestedValue(defaultValues, path, initialValue);
  });

  return {
    entity,
    fields: normalizedFields,
    columns,
    schema: buildYupObject(schemaFields),
    defaultValues,
  };
};
