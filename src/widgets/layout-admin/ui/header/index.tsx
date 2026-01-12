import dynamic from 'next/dynamic';
import { Menu } from 'lucide-react';

const ProfileMenu = dynamic(() => import('@/widgets/layout-admin/ui/profile-menu'), { ssr: false });

type Props = {
  onMenuClick: () => void;
};

const Header = ({ onMenuClick }: Props) => {
  return (
    <header className="min-h-16 bg-white shadow-md lg:ml-4 lg:rounded-bl-xl flex items-center justify-between px-4 lg:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Открыть меню"
        >
          <Menu size={24} />
        </button>
        <div className="text-base lg:text-lg font-semibold">Silver Kitchen KG</div>
      </div>

      <ProfileMenu />
    </header>
  );
};

export default Header;
