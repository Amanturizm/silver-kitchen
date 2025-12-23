'use client';
import React from 'react';

interface Props {
  label?: string;
  value?: number | string;
  placeholder?: string;
  disabled?: boolean;
  onChange: (val: number | '') => void;
  error?: any;
}

export const NumberInput = ({ label, value, placeholder, disabled, onChange, error }: Props) => {
  const baseInput =
    'w-full rounded-md bg-white px-3 py-2 text-sm font-sans outline-none border border-gray-300 focus:border-blue-500 disabled:bg-gray-100';

  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm">{label}</label>}
      <input
        type="number"
        value={value ?? ''}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(e) => {
          const val = e.target.value;
          if (val === '') {
            onChange('');
            return;
          }
          if (/^\d+$/.test(val)) {
            onChange(Number(val));
          }
        }}
        className={
          error
            ? baseInput.replace(
                'border-gray-300 focus:border-blue-500',
                'border-red-500 focus:border-red-500',
              )
            : baseInput
        }
      />
      <span className="text-xs text-red-500 h-4">{error?.message || ''}</span>
    </div>
  );
};
