'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Squash as Hamburger } from 'hamburger-react';
import logoImg from '@/shared/assets/images/logo.png';
import phoneIcon from '@/shared/assets/icons/phone.svg';
import whatsappIcon from '@/shared/assets/icons/whatsapp.svg';
import Searcher from '@/widgets/ui/Searcher';
import { useGetContactsQuery } from '@/features/contacts/contactsApiSlice';

const linkBase =
  'text-sm min-[768px]:text-md min-[1500px]:text-lg min-[2000px]:text-xl font-medium cursor-pointer';
const getNavClass = (isActive: boolean) => `${linkBase} ${isActive ? 'text-black' : 'text-white'}`;

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: contacts } = useGetContactsQuery({ main: 'true' });
  const contact = contacts?.[0];

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="container relative mt-3 min-[1300px]:mt-7 h-[160vw] min-[600px]:h-[42vw] min-[768px]:h-[39vw] min-[992px]:h-[33vw] bg-[url('@/shared/assets/images/header-background-mini.png')] min-[600px]:bg-[url('@/shared/assets/images/header-background.png')] bg-no-repeat bg-cover bg-top-left rounded-[25px]">
      <div className="flex items-center justify-between max-[768px]:pr-2 max-w-full min-[600px]:max-w-3/4 min-[710px]:max-w-2/3 min-[768px]:max-w-3/5 min-[1500px]:max-w-2/4 pl-4 min-[992px]:pl-8 pt-0 min-[800px]:pt-2 min-[1500px]:pt-4 min-[2000px]:pt-8">
        <Image
          src={logoImg}
          alt="logo-img"
          width={120}
          className="cursor-pointer max-[600px]:w-[140px] min-[1400px]:w-[140px]"
          onClick={() => router.push('/')}
        />

        <nav className="max-[600px]:hidden flex items-center justify-between gap-3 min-[992px]:gap-6 min-[2000px]:gap-10">
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

        <div className="absolute right-[0] min-[1450px]:right-[4vw] min-[1800px]:right-[6vw] top-0 min-[710px]:top-[4px] min-[992px]:top-[6px] min-[1450px]:top-[1vw] max-w-[30%] max-[600px]:hidden flex flex-row-reverse min-[1260px]:flex-row max-[1260px]:w-full max-[992px]:justify-start max-[1260px]:justify-center items-center gap-2 min-[1260px]:gap-6 min-[2000px]:gap-12 font-sans font-medium min-[992px]:font-bold text-md min-[2000px]:text-lg overflow-hidden">
          {contact && (
            <>
              <div className="flex items-center gap-2 min-[1800px]:gap-4">
                <Image
                  src={phoneIcon}
                  alt="phone-icon"
                  className="rounded-xl min-[1800px]:rounded-2xl w-[36px] h-[36px] min-[800px]:w-[40px] min-[800px]:h-[40px] min-[1800px]:w-[48px] min-[1800px]:h-[48px]"
                />
                <div className="leading-4 min-[1260px]:leading-6 max-[992px]:hidden">
                  {contact.phone_number_1 && (
                    <h6>
                      <a href={`tel:${contact.phone_number_1.replace(/\D/g, '')}`}>
                        {contact.phone_number_1}
                      </a>
                    </h6>
                  )}
                  {contact.phone_number_2 && (
                    <h6>
                      <a href={`tel:${contact.phone_number_2.replace(/\D/g, '')}`}>
                        {contact.phone_number_2}
                      </a>
                    </h6>
                  )}
                </div>
              </div>
              <a
                href={`https://wa.me/${contact.whatsapp_number.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="flex items-center gap-2 min-[1800px]:gap-4">
                  <Image
                    src={whatsappIcon}
                    alt="whatsapp-icon"
                    className="rounded-xl min-[1800px]:rounded-2xl w-[36px] h-[36px] min-[800px]:w-[40px] min-[800px]:h-[40px] min-[1800px]:w-[48px] min-[1800px]:h-[48px]"
                  />
                  <div className="hidden min-[1260px]:block">
                    <h6>{contact.whatsapp_number}</h6>
                  </div>
                </div>
              </a>
            </>
          )}
        </div>

        <div className="max-[600px]:block hidden z-50 max-[600px]:scale-130 absolute top-0 right-[10px]">
          <Hamburger toggled={menuOpen} toggle={setMenuOpen} size={28} color="#222" />
        </div>
      </div>

      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center gap-6 text-white p-6"
          onClick={() => setMenuOpen(false)}
        >
          <div className="flex flex-col items-center gap-6" onClick={(e) => e.stopPropagation()}>
            <Link
              href="/"
              className="text-xl font-semibold hover:text-gray-300"
              onClick={() => setMenuOpen(false)}
            >
              Главная
            </Link>
            <Link
              href="/products"
              className="text-xl font-semibold hover:text-gray-300"
              onClick={() => setMenuOpen(false)}
            >
              Продукция
            </Link>
            <Link
              href="/about"
              className="text-xl font-semibold hover:text-gray-300"
              onClick={() => setMenuOpen(false)}
            >
              О нас
            </Link>
            <Link
              href="/contacts"
              className="text-xl font-semibold hover:text-gray-300"
              onClick={() => setMenuOpen(false)}
            >
              Контакты
            </Link>

            {contact && (
              <div className="flex flex-col items-center gap-2 mt-4 text-base">
                {contact.phone_number_1 && (
                  <a
                    href={`tel:${contact.phone_number_1.replace(/\D/g, '')}`}
                    className="hover:text-gray-300"
                  >
                    {contact.phone_number_1}
                  </a>
                )}
                {contact.phone_number_2 && (
                  <a
                    href={`tel:${contact.phone_number_2.replace(/\D/g, '')}`}
                    className="hover:text-gray-300"
                  >
                    {contact.phone_number_2}
                  </a>
                )}
                <a
                  href={`https://wa.me/${contact.whatsapp_number.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-300"
                >
                  {contact.whatsapp_number}
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="w-full h-full flex flex-col items-center justify-center [@media(min-width:992px)]:justify-start [@media(max-width:992px)]:mt-0 min-[992px]:mt-20 min-[600px]:mt-30 min-[1500px]:mt-50 gap-4 min-[1000px]:gap-8 min-[2000px]:gap-12 max-w-3/4 min-[600px]:max-w-2/4 mx-auto">
        <h1 className="text-white text-center text-2xl min-[400px]:text-2xl min-[600px]:text-xl min-[768px]:text-2xl min-[992px]:text-3xl min-[1400px]:text-4xl min-[1800px]:text-5xl min-[2200px]:text-6xl">
          ПРОФЕССИОНАЛЬНОЕ КУХОННОЕ ОБОРУДОВАНИЕ
        </h1>
        <Searcher />
      </div>
    </header>
  );
};

export default Header;
