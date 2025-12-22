'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import logoImg from '@/shared/assets/images/logo.png';
import phoneIcon from '@/shared/assets/icons/phone.svg';
import whatsappIcon from '@/shared/assets/icons/whatsapp.svg';
import Searcher from '@/widgets/ui/Searcher';

const linkBase = 'text-xl font-medium';
const getNavClass = (isActive: boolean) => `${linkBase} ${isActive ? 'text-black' : 'text-white'}`;

const Header = () => {
  const pathname = usePathname();

  return (
    <header className="container relative mt-7 h-[33vw] bg-[url('@/shared/assets/images/header-background.png')] bg-no-repeat bg-cover bg-top-left rounded-[25px]">
      <div className="flex items-center justify-between max-w-2/4 h-[80px] pl-8 pt-8">
        <Image src={logoImg} alt="logo-img" height={80} />

        <nav className="flex items-center justify-between gap-10">
          <Link href="/" className={getNavClass(pathname === '/')}>
            Главная
          </Link>

          <Link href="/products" className={getNavClass(pathname === '/products')}>
            Продукция
          </Link>

          <Link href="/about" className={getNavClass(pathname === '/about')}>
            О нас
          </Link>

          <Link href="/contacts" className={getNavClass(pathname === '/contacts')}>
            Контакты
          </Link>
        </nav>

        <div className="absolute right-40 top-6 flex items-center gap-12 font-sans font-bold text-lg">
          <div className="flex items-center gap-4">
            <Image src={phoneIcon} alt="phone-icon" className="rounded-2xl" />
            <div>
              <h6>+996 707 707 707</h6>
              <h6>+996 707 707 707</h6>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Image src={whatsappIcon} alt="whatsapp-icon" className="rounded-2xl" />
            <div>
              <h6>+996 707 707 707</h6>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-full flex flex-col items-center justify-center max-w-2/4 mx-auto">
        <h1 className="text-white text-center text-6xl">ПРОФЕССИОНАЛЬНОЕ КУХОННОЕ ОБОРУДОВАНИЕ</h1>

        <Searcher />
      </div>
    </header>
  );
};

export default Header;
