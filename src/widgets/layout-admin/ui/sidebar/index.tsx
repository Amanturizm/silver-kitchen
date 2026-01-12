import logoImg from '@/shared/assets/images/logo.png';
import { ChartBarStacked, Contact, ShoppingBasket, Tag, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const linkBase = 'px-4 py-2 hover:bg-gray-200 rounded-lg flex items-center justify-between';
const getNavClass = (isActive: boolean) =>
  `${linkBase} ${isActive ? 'bg-gray-600 hover:bg-gray-600 text-white' : 'bg-none'}`;

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const Sidebar = ({ isOpen, onClose }: Props) => {
  const path = usePathname();

  return (
    <aside
      className={`
        w-[300px] flex-shrink-0 flex flex-col h-screen
        fixed lg:relative top-0 left-0 z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}
    >
      <div className="h-16 px-2 text-lg font-bold flex justify-between items-center bg-white shadow-md rounded-b-xl lg:justify-center">
        <Image src={logoImg} alt="logo-img" height={60} priority />
        <button
          onClick={onClose}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Закрыть меню"
        >
          <X size={24} />
        </button>
      </div>

      <nav className="mt-4 pt-4 text-lg flex flex-col gap-1 px-2 bg-white shadow-md rounded-t-xl flex-1">
        <Link
          href="/admin/items"
          className={getNavClass(path.startsWith('/admin/items'))}
          onClick={onClose}
        >
          Товары
          <ShoppingBasket size={20} />
        </Link>
        <Link
          href="/admin/categories"
          className={getNavClass(path.startsWith('/admin/categories'))}
          onClick={onClose}
        >
          Категории
          <ChartBarStacked size={20} />
        </Link>
        <Link
          href="/admin/brands"
          className={getNavClass(path.startsWith('/admin/brands'))}
          onClick={onClose}
        >
          Бренды
          <Tag size={20} />
        </Link>
        <Link
          href="/admin/contacts"
          className={getNavClass(path.startsWith('/admin/contacts'))}
          onClick={onClose}
        >
          Контакты
          <Contact size={20} />
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
