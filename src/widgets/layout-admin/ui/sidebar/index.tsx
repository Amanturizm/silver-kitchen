import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logoImg from '@/shared/assets/images/logo.png';
import { usePathname } from 'next/navigation';
import { ChartBarStacked, ShoppingBasket, Tag } from 'lucide-react';

const linkBase = 'px-4 py-2 hover:bg-gray-200 rounded-lg flex items-center justify-between';
const getNavClass = (isActive: boolean) =>
  `${linkBase} ${isActive ? 'bg-gray-600 hover:bg-gray-600 text-white' : 'bg-none'}`;

const Sidebar = () => {
  const path = usePathname();

  return (
    <aside className="w-[300px] flex-shrink-0 flex flex-col h-screen">
      <div className="h-16 px-2 text-lg font-bold flex justify-center items-center bg-white shadow-md rounded-b-xl">
        <Image src={logoImg} alt="logo-img" height={60} priority />
      </div>

      <nav className="mt-4 pt-4 text-lg flex flex-col gap-1 px-2 bg-white shadow-md rounded-t-xl flex-1">
        <Link href="/admin/brands" className={getNavClass(path.startsWith('/admin/brands'))}>
          Бренды
          <Tag size={20} />
        </Link>
        <Link
          href="/admin/categories"
          className={getNavClass(path.startsWith('/admin/categories'))}
        >
          Категории
          <ChartBarStacked size={20} />
        </Link>
        <Link href="/admin/items" className={getNavClass(path.startsWith('/admin/items'))}>
          Товары
          <ShoppingBasket size={20} />
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
