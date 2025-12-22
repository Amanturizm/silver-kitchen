import React, { CSSProperties } from 'react';
import { Loader, SearchX } from 'lucide-react';

export const Loading = ({ style }: { style?: CSSProperties }) => (
  <div className="flex items-center gap-2 py-0 text-gray-500" style={style}>
    <Loader className="animate-spin" size={24} />
    <span>Загрузка...</span>
  </div>
);

export const NotFound = ({ message, style }: { message?: string; style?: CSSProperties }) => (
  <div className="flex items-center gap-2 py-0 text-red-500" style={style}>
    <SearchX size={26} />
    <span>{message || 'Не найдено'}</span>
  </div>
);
