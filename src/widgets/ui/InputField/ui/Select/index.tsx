'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronsUpDown } from 'lucide-react';

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

  const current = options.find((o) => o.value === value);

  return (
    <div ref={ref} className="flex flex-col gap-1">
      {label && <label className="text-sm">{label}</label>}

      <div className="relative">
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
          <ChevronsUpDown size={18} className={error ? 'text-red-500' : 'text-gray-600'} />
        </button>

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
