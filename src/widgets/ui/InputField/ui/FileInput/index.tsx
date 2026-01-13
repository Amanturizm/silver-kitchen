'use client';

import { Image, Images, X } from 'lucide-react';

interface AttachmentLike {
  id?: number | null;
  name?: string | null;
}

interface Props {
  value?: (File | string | AttachmentLike)[];
  onChange?: (files: (File | string | AttachmentLike)[]) => void;
  onDeleteImage?: (imageId: number) => void;
  label?: string;
  multiple?: boolean;
  disabled?: boolean;
  error?: { message?: string };
}

export const FileInput = ({ value = [], onChange, onDeleteImage, label, multiple, disabled, error }: Props) => {  
  const files = value.filter((f): f is File | string | AttachmentLike =>
    f instanceof File || typeof f === 'string' || (typeof f === 'object' && f !== null)
  );
  console.log(value, files);

  const baseInput =
    'w-full rounded-md bg-white px-3 py-2 text-sm outline-none border border-gray-300 focus:border-blue-500 disabled:bg-gray-100';

  const handleFiles = (selected: File[]) => {
    const imagesOnly = selected.filter((f) => f.type.startsWith('image/'));
    if (imagesOnly.length !== selected.length) console.warn('Разрешены только изображения');

    if (multiple) {
      onChange?.([...files, ...imagesOnly]);
    } else {
      onChange?.(imagesOnly);
    }
  };

  const removeFile = (idx: number) => {
    const file = files[idx];

    if (file && typeof file === 'object' && 'id' in file && file.id && onDeleteImage) {
      onDeleteImage(file.id);
    }

    const newFiles = files.filter((_, i) => i !== idx);
    onChange?.(newFiles);
  };

  return (
    <div className="flex flex-col gap-2">
      {label && <label className="text-sm">{label}</label>}
      <label
        className={
          error
            ? baseInput +
              ' cursor-pointer flex items-center gap-2 border-red-500 focus:border-red-500'
            : baseInput + ' cursor-pointer flex items-center gap-2'
        }
      >
        {multiple ? (
          <Images size={18} className={error ? 'stroke-red-500' : 'stroke-gray-500'} />
        ) : (
          // eslint-disable-next-line jsx-a11y/alt-text
          <Image size={18} className={error ? 'stroke-red-400' : 'stroke-gray-500'} />
        )}
        Выбрать файл{multiple ? 'ы' : ''}
        <input
          type="file"
          accept="image/*"
          multiple={multiple}
          disabled={disabled}
          className="hidden"
          onChange={(e) => handleFiles(Array.from(e.target.files || []))}
        />
      </label>

      {files.length > 0 && (
        <div className="flex flex-col gap-2 mt-1 w-min whitespace-nowrap">
          {files.map((f: File | string | AttachmentLike, i) => {
            let fileName = '';
            if (typeof f === 'string') {
              fileName = f.split('/').pop() || f;
            } else if (f instanceof File) {
              fileName = f.name;
            } else if (f && typeof f === 'object' && 'name' in f) {
              fileName = f.name || '';
            }

            return (
              <div
                key={i}
                className="flex justify-between items-center w-min gap-1 rounded bg-gray-200 px-2 py-1 text-sm"
              >
                {fileName}
                <button
                  type="button"
                  className="text-red-500 hover:text-red-700 cursor-pointer"
                  onClick={() => removeFile(i)}
                >
                  <X size={16} />
                </button>
              </div>
            );
          })}
        </div>
      )}

      <span className="text-xs text-red-500 h-4">{error?.message || ''}</span>
    </div>
  );
};
