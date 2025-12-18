import React, { useEffect, useRef, useState } from 'react';
import { useLogoutMutation } from '@/features/auth/authApiSlice';
import { useRouter } from 'next/navigation';
import { LoginResponse } from '@/features/auth/types';

const ProfileMenu = () => {
  const router = useRouter();
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement | null>(null);
  const [logout] = useLogoutMutation();

  const user = JSON.parse(localStorage.getItem('user') as string) as LoginResponse | null;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      router.push('/admin/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="relative" ref={profileRef}>
      <button
        onClick={() => setProfileOpen((prev) => !prev)}
        className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 cursor-pointer"
      >
        {user?.username}
      </button>

      {profileOpen && (
        <div
          className="absolute right-0 mt-2 w-40 bg-white shadow-md border border-gray-400 rounded-lg overflow-hidden">
          <button
            onClick={handleLogout}
            className="w-full text-left px-3 py-1.5 hover:bg-gray-100 cursor-pointer"
          >
            Выйти
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;