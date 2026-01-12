'use client';

import { CSSProperties, useState } from 'react';
import Sidebar from '@/widgets/layout-admin/ui/sidebar';
import Header from '@/widgets/layout-admin/ui/header';
import { Toaster } from 'sonner';

type Props = {
  children?: React.ReactNode;
  style?: CSSProperties;
};

export const AppLayoutAdmin = ({ children, style }: Props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <>
      <div className="flex h-screen overflow-hidden bg-gray-100" style={style}>
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

        <div className="flex-1 flex flex-col w-full lg:w-auto overflow-hidden">
          <Header onMenuClick={toggleSidebar} />

          <main className="flex-1 lg:ml-4 mt-4 p-4 lg:p-6 shadow-xl bg-white lg:rounded-tl-xl overflow-y-auto">
            {children}
          </main>
        </div>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-[1px] z-40 lg:hidden animate-in fade-in duration-300"
          onClick={closeSidebar}
        />
      )}

      <Toaster
        richColors
        position="bottom-right"
        toastOptions={{
          classNames: {
            toast: 'bg-slate-900 text-white border border-slate-700',
            title: 'text-[16px] font-semibold !leading-[1]',
            description: 'text-slate-300 leading-[1]',
            actionButton: 'bg-red-600 hover:bg-red-700',
            cancelButton: 'text-gray-400 hover:text-gray-200',
          },
        }}
      />
    </>
  );
};
