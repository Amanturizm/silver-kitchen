import { ReactNode } from 'react';

export type TableColumn<T> = {
  key: keyof T | string;
  title: string;
  width?: string | number;
  align?: 'left' | 'center' | 'right';
  render?: (row: T) => ReactNode;
};

export type TableConfig<T> = {
  columns: TableColumn<T>[];
  rowKey: (row: T) => string;
  onRowClick?: (row: T) => void;
  emptyText?: string;
  pageName?: string;
};
