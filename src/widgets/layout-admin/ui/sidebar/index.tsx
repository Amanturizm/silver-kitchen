import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logoImg from '@/shared/assets/images/logo.png';
import { usePathname } from 'next/navigation';

const linkBase = 'px-4 py-2 hover:bg-gray-200 rounded-lg';
const getNavClass = (isActive: boolean) =>
  `${linkBase} ${isActive ? 'bg-gray-600 hover:bg-gray-600 text-white' : 'bg-none'}`;

const Sidebar = () => {
  const path = usePathname();

  return (
    <aside className="w-[300px] flex-shrink-0">
      <div className="h-16 px-2 text-lg font-bold flex items-center bg-white shadow-md rounded-br-xl">
        <Image src={logoImg} alt="logo-img" height={60} priority/>
      </div>

      <nav className="mt-4 pt-4 text-lg flex flex-col gap-1 px-2 bg-white h-full shadow-md rounded-tr-xl">
        <Link href="/admin/items" className={getNavClass(path === '/admin/items')}>Товары</Link>
        <Link href="/admin/brands" className={getNavClass(path === '/admin/brands')}>Бренды</Link>
        <Link href="/admin/categories" className={getNavClass(path === '/admin/categories')}>Категории</Link>
      </nav>
    </aside>
  );
};

export default Sidebar;