import { Controller } from 'react-hook-form';
import { useState } from 'react';
import { Eye, EyeOff, X } from 'lucide-react';

interface Option {
  value: string | number;
  label: string;
}

interface Props {
  control: any;
  name: string;
  label?: string;
  type?: 'text' | 'password' | 'textarea' | 'select' | 'file' | 'date';
  placeholder?: string;
  disabled?: boolean;
  options?: Option[];
  multiple?: boolean;
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
                           }: Props) => {
  const [showPassword, setShowPassword] = useState(false);

  const baseInput =
    'w-full rounded-md bg-white px-3 py-2 text-sm shadow-md outline-none border border-transparent focus:border-blue-500 disabled:bg-gray-100';

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        if (type === 'file') {
          const files: File[] = field.value || [];

          return (
            <div className="flex flex-col gap-2">
              {label && <span className="text-sm">{label}</span>}

              <input
                type="file"
                multiple={multiple}
                disabled={disabled}
                onChange={(e) =>
                  field.onChange(Array.from(e.target.files || []))
                }
                className="block text-sm"
              />

              {!!files.length && (
                <div className="flex flex-wrap gap-2">
                  {files.map((f, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-1 rounded bg-blue-800 text-white text-xs px-2 py-1"
                    >
                      {f.name}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() =>
                          field.onChange(files.filter((_, idx) => idx !== i))
                        }
                      />
                    </div>
                  ))}
                </div>
              )}

              {fieldState.error && (
                <span className="text-xs text-red-500">
                  {fieldState.error.message}
                </span>
              )}
            </div>
          );
        }

        if (type === 'select') {
          return (
            <div className="flex flex-col gap-1">
              {label && <label className="text-sm">{label}</label>}
              <select
                {...field}
                value={field.value ?? (multiple ? [] : '')}
                multiple={multiple}
                disabled={disabled}
                className={baseInput}
              >
                {!multiple && <option value="">—</option>}
                {options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              {fieldState.error && (
                <span className="text-xs text-red-500">
                  {fieldState.error.message}
                </span>
              )}
            </div>
          );
        }

        if (type === 'textarea') {
          return (
            <div className="flex flex-col gap-1">
              {label && <label className="text-sm">{label}</label>}
              <textarea
                {...field}
                value={field.value ?? ''}
                rows={4}
                placeholder={placeholder}
                disabled={disabled}
                className={baseInput}
              />
              {fieldState.error && (
                <span className="text-xs text-red-500">
                  {fieldState.error.message}
                </span>
              )}
            </div>
          );
        }

        return (
          <div className="flex flex-col gap-1">
            {label && <label className="text-sm">{label}</label>}

            <div className="relative">
              <input
                {...field}
                value={field.value ?? ''}
                type={
                  type === 'password'
                    ? showPassword
                      ? 'text'
                      : 'password'
                    : type
                }
                placeholder={placeholder}
                disabled={disabled}
                className={
                  fieldState.error ?
                    baseInput.replace(
                      'border-transparent focus:border-blue-500',
                      'border-red-500 focus:border-red-500'
                    )
                    : baseInput
                }
              />

              {type === 'password' && (
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                  onClick={() => setShowPassword((p) => !p)}
                >
                  {showPassword ? <EyeOff size={16}/> : <Eye size={16}/>}
                </button>
              )}
            </div>

            <span className="text-xs text-red-500 h-4">
              {fieldState.error ? fieldState.error.message : ''}
            </span>
          </div>
        );
      }}
    />
  );
};
