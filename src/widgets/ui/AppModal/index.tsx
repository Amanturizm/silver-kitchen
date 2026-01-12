'use client';
import React, { ReactNode, useState } from 'react';
import { Loader } from 'lucide-react';

interface ModalProps {
  open: boolean;
  title?: string;
  children?: ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => Promise<void>;
  onClose: () => void;
}

export const AppModal = ({
  open,
  title = 'Подтверждение',
  children,
  confirmText = 'Подтвердить',
  cancelText = 'Отмена',
  onConfirm,
  onClose,
}: ModalProps) => {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    if (!onConfirm) return;
    try {
      setLoading(true);
      await onConfirm();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`
        fixed inset-0 z-[999] flex items-center justify-center p-4
        bg-black/60 backdrop-blur-[1px]
        transition-opacity duration-200
        ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}
      `}
      onClick={onClose}
    >
      <div
        className={`
          relative w-full max-w-md sm:max-w-lg p-4 sm:p-6
          rounded-xl bg-white shadow-sm animate-duration-200
          ${open ? 'animate-jump-in' : 'animate-jump-out animate-duration-100 animate-ease-linear'}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex shrink-0 items-center pb-4 text-lg sm:text-xl font-medium text-slate-800">
          {title}
        </div>

        <div className="relative border-t border-slate-200 py-4 leading-normal text-sm sm:text-base text-slate-600 font-light">
          {children}
        </div>

        <div className="flex flex-col-reverse sm:flex-row shrink-0 items-stretch sm:items-center pt-2 gap-2 sm:gap-0 sm:justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto cursor-pointer rounded-lg border border-transparent py-2 px-4 text-sm sm:text-md text-slate-600 hover:bg-slate-100"
          >
            {cancelText}
          </button>

          <button
            onClick={handleConfirm}
            className="w-full sm:w-auto sm:ml-2 flex items-center justify-center gap-2 rounded-lg bg-red-600 hover:bg-red-700 transition-all py-2 px-4 text-sm sm:text-md text-white shadow-md hover:shadow-lg focus:bg-red-700 active:bg-red-700"
            disabled={loading}
            style={{
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? <Loader className="animate-spin" size={20} /> : null}
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};
