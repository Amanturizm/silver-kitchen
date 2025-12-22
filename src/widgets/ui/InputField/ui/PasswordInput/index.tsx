'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface Props {
  value?: string;
  onChange?: (val: string) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: { message?: string };
}

export const PasswordInput = ({
  value = '',
  onChange,
  label,
  placeholder,
  disabled,
  error,
}: Props) => {
  const [show, setShow] = useState(false);

  const baseInput =
    'w-full rounded-md bg-white px-3 py-2 text-sm outline-none border border-gray-300 focus:border-blue-500 disabled:bg-gray-100';

  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm">{label}</label>}
      <div className="relative">
        <input
          type={show ? 'text' : 'password'}
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
        />
        <button
          type="button"
          onClick={() => setShow((p) => !p)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
        >
          {show ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
      <span className="text-xs text-red-500 h-4">{error?.message || ''}</span>
    </div>
  );
};
