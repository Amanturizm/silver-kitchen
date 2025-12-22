'use client';

import { CSSProperties } from 'react';
import Sidebar from '@/widgets/layout-admin/ui/sidebar';
import Header from '@/widgets/layout-admin/ui/header';

type Props = {
  children?: React.ReactNode;
  style?: CSSProperties;
};

export const AppLayoutAdmin = ({ children, style }: Props) => {
  return (
    <div className="flex min-h-screen bg-gray-100" style={style}>
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />

        <main className="flex-1 ml-4 mt-4 p-6 shadow-xl bg-white rounded-tl-xl">{children}</main>
      </div>
    </div>
  );
};
