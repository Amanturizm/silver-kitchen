import React from 'react';

export type DetailColumn<T> = {
  key: keyof T;
  title: string;

  value?: (data: T) => React.ReactNode;
  format?: (value: T[keyof T]) => React.ReactNode;
  visible?: (data: T) => boolean;
  variant?: 'row' | 'block';
  emptyText?: React.ReactNode;
};

export type DetailConfig<T> = {
  columns: DetailColumn<T>[];
};

interface DynamicDetailViewProps<T> {
  data: T;
  config: DetailConfig<T>;
}

export const DynamicDetailView = <T,>({ data, config }: DynamicDetailViewProps<T>) => {
  return (
    <div className="flex flex-col gap-3">
      {config.columns.map((col) => {
        if (col.visible && !col.visible(data)) return null;

        const rawValue = col.value?.(data) ?? (data[col.key] as React.ReactNode);

        const value =
          rawValue == null || rawValue === ''
            ? (col.emptyText ?? '—')
            : col.format
              ? col.format(rawValue as any)
              : rawValue;

        if (col.variant === 'block') {
          return (
            <div key={String(col.key)} className="flex flex-col gap-1">
              <span className="font-medium">{col.title}</span>
              <div>{value}</div>
            </div>
          );
        }

        return (
          <div
            key={String(col.key)}
            className="flex flex-col sm:flex-row gap-1 sm:gap-2 py-1 items-start"
          >
            <span className="font-medium w-full sm:w-40 shrink-0">{col.title}:</span>
            <span className="min-w-0 wrap-break-word">{value}</span>
          </div>
        );
      })}
    </div>
  );
};
