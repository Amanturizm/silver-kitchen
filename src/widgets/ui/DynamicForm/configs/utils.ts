export function extractFinalParentId(data: Record<string, any>, name: string = 'parentId') {
  const entries = Object.entries(data)
    .filter(([key]) => key === name || key.startsWith(`${name}_`))
    .sort(([a], [b]) => {
      const na = a === name ? 0 : Number(a.replace(`${name}_`, ''));
      const nb = b === name ? 0 : Number(b.replace(`${name}_`, ''));
      return na - nb;
    });

  for (let i = entries.length - 1; i >= 0; i--) {
    const value = entries[i][1];
    if (value !== null && value !== undefined && value !== '' && value !== '0') {
      return value;
    }
  }

  return null;
}

export function cleanupParentFields(data: Record<string, any>, name: string = 'parentId') {
  const result: Record<string, any> = {};

  Object.entries(data).forEach(([key, value]) => {
    if (!key.startsWith(name)) result[key] = value;
  });

  return result;
}

// DynamicForm
import { FieldDef } from './types';
import { UseFormResetField } from 'react-hook-form';

export const getLevel = (fieldName: string) => {
  const parts = fieldName.split('_');
  if (parts.length === 1) return 0;
  const num = parseInt(parts[1], 10);
  return isNaN(num) ? 0 : num;
};

interface UpdateDynamicChainParams {
  dynamicFields: FieldDef[];
  setDynamicFields: (fields: FieldDef[]) => void;
  resetField: UseFormResetField<any>;
  fieldName: string;
  fieldLabel: string;
  value: string;
  getNextOptions?: (val: string) => { label: string; value: string }[];
}

export const updateDynamicChain = ({
  dynamicFields,
  setDynamicFields,
  resetField,
  fieldName,
  fieldLabel,
  value,
  getNextOptions,
}: UpdateDynamicChainParams) => {
  const fieldIndex = dynamicFields.findIndex((f) => f.name === fieldName);

  const before = dynamicFields.slice(0, fieldIndex + 1);
  const after = dynamicFields.slice(fieldIndex + 1).filter((f) => !f.isDynamicChain);

  const removedFields = dynamicFields.slice(fieldIndex + 1).filter((f) => f.isDynamicChain);

  removedFields.forEach((f) => {
    resetField(f.name as any, { defaultValue: '' });
  });

  const nextOptions = getNextOptions?.(value);
  if (nextOptions?.length) {
    const level = getLevel(fieldName) + 1;

    const baseLabel = fieldLabel.includes('уровень')
      ? fieldLabel.replace(/уровень\s*\d+$/, '').trim()
      : fieldLabel;

    before.push({
      required: false,
      name: `${fieldName}_${level}`,
      label: `${baseLabel} уровень ${level}`,
      type: 'select',
      isDynamicChain: true,
      options: nextOptions,
      getNextOptions,
    });
  }

  setDynamicFields([...before, ...after]);
};
