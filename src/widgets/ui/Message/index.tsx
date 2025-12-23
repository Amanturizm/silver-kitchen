import React, { CSSProperties } from 'react';
import { Loader, SearchX } from 'lucide-react';

export const Loading = ({ style, size = 24 }: { style?: CSSProperties; size?: number }) => (
  <div
    className="flex items-center gap-2 py-0 text-gray-500"
    style={{ ...style, fontSize: size - 10 }}
  >
    <Loader className="animate-spin" size={size} />
    <span>Загрузка...</span>
  </div>
);

export const NotFound = ({
  message,
  style,
  size = 26,
}: {
  message?: string;
  style?: CSSProperties;
  size?: number;
}) => (
  <div
    className="flex items-center gap-2 py-0 text-red-500"
    style={{ ...style, fontSize: size - 10 }}
  >
    <SearchX size={size} />
    <span>{message || 'Не найдено'}</span>
  </div>
);
