import React, { ReactNode } from 'react';

export type DetailColumn<T> = {
  key: keyof T | string;
  title: string;
  render?: (row: T) => ReactNode;
};

export type DetailConfig<T> = {
  columns: DetailColumn<T>[];
};

interface DynamicDetailViewProps<T> {
  data: T;
  config: DetailConfig<T>;
}

export const DynamicDetailView = <T,>({ data, config }: DynamicDetailViewProps<T>) => {
  const renderRow = (title: string, value: ReactNode) => (
    <div className="flex gap-2 py-1">
      <span className="font-medium w-32">{title}:</span>
      <span>{value ?? '-'}</span>
    </div>
  );

  return (
    <div className="flex flex-col gap-2">
      {config.columns.map((col) => {
        const value = col.render ? col.render(data) : (data as any)[col.key];
        return renderRow(col.title, value);
      })}
    </div>
  );
};
