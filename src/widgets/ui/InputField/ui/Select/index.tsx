'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ChevronsUpDown, CircleX } from 'lucide-react';

interface Option {
  value: string | number;
  label: string;
}

interface Props {
  label?: string;
  options: Option[];
  value?: string | number;
  onChange?: (value: string | number) => void;
  error?: { message?: string };
  placeholder?: string;
  disabled?: boolean;
}

const baseSelectStyle =
  'w-full bg-white border px-3 py-2 text-sm rounded-md flex justify-between items-center cursor-pointer border-gray-300 hover:border-gray-400';

export const Select = ({
  label,
  options,
  value,
  onChange,
  error,
  placeholder,
  disabled,
}: Props) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const clearValue = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onChange?.('');
  };

  const current = options.find((o) => o.value === value);

  return (
    <div ref={ref} className="flex flex-col gap-1">
      {label && <label className="text-sm">{label}</label>}

      <div className="relative">
        <div className="relative flex items-center">
          <button
            type="button"
            disabled={disabled}
            onClick={() => setOpen((p) => !p)}
            className={
              error ? baseSelectStyle + ' border-red-500 hover:border-red-500' : baseSelectStyle
            }
          >
            <span
              className={'h-5 flex items-center ' + (current ? 'text-gray-900' : 'text-gray-400')}
            >
              {current ? current.label : placeholder || ''}
            </span>
            {!current && (
              <ChevronsUpDown size={18} className={error ? 'text-red-500' : 'text-gray-600'} />
            )}
          </button>

          {current && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                clearValue(e);
              }}
              className={`absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-md cursor-pointer transition-colors duration-100 flex items-center justify-center ${
                error ? 'text-red-500' : 'text-gray-500 hover:text-gray-600'
              }`}
            >
              <CircleX size={20} />
            </button>
          )}
        </div>

        {open && (
          <div className="absolute top-full left-0 z-20 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-56 overflow-y-auto">
            {options.map((opt) => (
              <div
                key={opt.value}
                onClick={() => {
                  onChange?.(opt.value);
                  setOpen(false);
                }}
                className={
                  'px-3 py-2.5 text-sm cursor-pointer transition leading-4 ' +
                  (opt.value === value
                    ? 'bg-gray-600 text-white'
                    : 'hover:bg-gray-100 text-gray-800')
                }
              >
                {opt.label}
              </div>
            ))}
          </div>
        )}
      </div>

      <span className="text-xs text-red-500 h-4">{error?.message || ''}</span>
    </div>
  );
};
