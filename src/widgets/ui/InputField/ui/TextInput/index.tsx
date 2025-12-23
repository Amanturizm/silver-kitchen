'use client';

import React, { ReactNode } from 'react';

interface Props {
  value?: string;
  onChange?: (val: string) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: { message?: string };
  leftSection?: ReactNode;
}

export const TextInput = ({
  value = '',
  onChange,
  label,
  placeholder,
  disabled,
  error,
  leftSection,
}: Props) => {
  const baseInput =
    'w-full rounded-md bg-white px-3 py-2 text-sm font-sans outline-none border border-gray-300 focus:border-blue-500 disabled:bg-gray-100';

  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm">{label}</label>}

      <div className="flex gap-2">
        {leftSection}
        <input
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className={
            error
              ? baseInput.replace(
                  'border-gray-300 focus:border-blue-500',
                  'border-red-500 focus:border-red-500',
                )
              : baseInput
          }
          style={{
            cursor: disabled ? 'not-allowed' : 'initial',
          }}
        />
      </div>

      <span className="text-xs text-red-500 h-4">{error?.message || ''}</span>
    </div>
  );
};
