'use client';

import React, { useEffect, useRef, useState } from 'react';
import { DefaultValues, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FieldDef } from './configs/types';
import { InputField } from '@/widgets/ui/InputField';
import { updateDynamicChain } from '@/widgets/ui/DynamicForm/configs/utils';

interface DynamicFormProps<T extends Record<string, any>> {
  fields: FieldDef[];
  defaultValues: T;
  schema: yup.ObjectSchema<any>;
  onSubmit: SubmitHandler<T>;
  formOpen?: boolean;
  isEdit?: boolean;
}

export const DynamicForm = <T extends Record<string, any>>({
  fields,
  defaultValues,
  schema,
  onSubmit,
  formOpen = true,
  isEdit = false,
}: DynamicFormProps<T>) => {
  const { control, handleSubmit, reset, resetField } = useForm<T>({
    defaultValues: defaultValues as DefaultValues<T>,
    resolver: yupResolver(schema),
  });

  const [loading, setLoading] = useState(false);

  const initializedRef = useRef(false);
  const [dynamicFields, setDynamicFields] = useState<FieldDef[]>([]);

  useEffect(() => {
    setDynamicFields(fields.map((f) => ({ ...f, options: f.options ? [...f.options] : [] })));
  }, [fields]);

  useEffect(() => {
    if (!isEdit || initializedRef.current) return;

    const chainFields: FieldDef[] = dynamicFields.filter(
      (f) => f.isDynamicChain && f.getNextOptions,
    );
    if (!chainFields.length) return;

    const currentValues = { ...defaultValues };

    for (let i = 0; i < chainFields.length; i++) {
      const field = chainFields[i];
      const value = currentValues[field.name + 1];
      if (!value) break;

      updateDynamicChain({
        dynamicFields,
        setDynamicFields,
        resetField,
        fieldName: field.name,
        fieldLabel: field.label,
        value,
        getNextOptions: field.getNextOptions,
      });
    }

    initializedRef.current = true;
  }, [isEdit, dynamicFields, defaultValues, resetField]);

  const handleFormSubmit: SubmitHandler<T> = async (data) => {
    setLoading(true);
    try {
      await onSubmit(data);

      if (!isEdit) {
        setDynamicFields(fields.map((f) => ({ ...f, options: f.options ? [...f.options] : [] })));
        reset(defaultValues);
      }
    } finally {
      setLoading(false);
    }
  };

  if (!formOpen) return null;

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="rounded-lg flex flex-col gap-4">
      <div>
        {dynamicFields.map((f) => (
          <InputField
            key={f.name}
            control={control}
            name={f.name}
            label={f.label}
            type={f.type as any}
            options={f.options}
            multiple={f.type === 'files'}
            onChange={(val) => {
              if (f.isDynamicChain && f.getNextOptions) {
                updateDynamicChain({
                  dynamicFields,
                  setDynamicFields,
                  resetField,
                  fieldName: f.name,
                  fieldLabel: f.label,
                  value: val,
                  getNextOptions: f.getNextOptions,
                });
              }
            }}
          />
        ))}
      </div>

      <div className="flex flex-col sm:flex-row justify-end gap-2">
        <button
          type="submit"
          disabled={loading}
          className="mt-4 w-full sm:w-auto rounded-md bg-green-600 text-white py-2 px-6 hover:bg-green-700 transition cursor-pointer"
        >
          {loading
            ? isEdit
              ? 'Редактирование...'
              : 'Создание...'
            : isEdit
              ? 'Редактировать'
              : 'Создать'}
        </button>
      </div>
    </form>
  );
};
