import React from 'react';
import dynamic from 'next/dynamic';

const ProfileMenu = dynamic(() => import('@/widgets/layout-admin/ui/profile-menu'), { ssr: false });

const Header = () => {
  return (
    <header className="h-16 bg-white shadow-md ml-4 rounded-bl-xl flex items-center justify-between px-6">
      <div className="text-lg font-semibold">Silver Kitchen KG</div>

      <ProfileMenu/>
    </header>
  );
};

export default Header;
