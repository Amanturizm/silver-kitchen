'use client';

import { Controller } from 'react-hook-form';
import { FieldType } from '@/widgets/ui/DynamicForm/configs/types';
import { Select } from '@/widgets/ui/InputField/ui/Select';
import { TextInput } from '@/widgets/ui/InputField/ui/TextInput';
import { NumberInput } from '@/widgets/ui/InputField/ui/NumberInput';
import { Textarea } from '@/widgets/ui/InputField/ui/Textarea';
import { PasswordInput } from '@/widgets/ui/InputField/ui/PasswordInput';
import { FileInput } from '@/widgets/ui/InputField/ui/FileInput';

interface Option {
  value: string | number;
  label: string;
}

interface Props {
  control?: any;
  name: string;
  label?: string;
  type?: FieldType;
  placeholder?: string;
  disabled?: boolean;
  options?: Option[];
  multiple?: boolean;
  value?: string | number;
  onChange?: (value: any) => void;
}

export const InputField = ({
  control,
  name,
  label,
  type = 'text',
  placeholder,
  disabled,
  options = [],
  multiple,
  value,
  onChange,
}: Props) => {
  const renderComponent = (field?: any, fieldState?: any) => {
    const currentValue = field ? field.value : value;
    const changeHandler = (val: any) => {
      field?.onChange(val);
      onChange?.(val);
    };

    const commonProps = {
      label,
      placeholder,
      disabled,
      value: currentValue,
      onChange: changeHandler,
      error: fieldState?.error,
      multiple,
      options,
    };

    switch (type) {
      case 'text':
        return <TextInput {...commonProps} />;
      case 'number':
        return <NumberInput {...commonProps} />;
      case 'textarea':
        return <Textarea {...commonProps} />;
      case 'password':
        return <PasswordInput {...commonProps} />;
      case 'file':
      case 'files':
        return <FileInput {...commonProps} />;
      case 'select':
        return <Select {...commonProps} />;
      default:
        return <TextInput {...commonProps} />;
    }
  };

  if (control) {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => renderComponent(field, fieldState)}
      />
    );
  }

  return renderComponent();
};
