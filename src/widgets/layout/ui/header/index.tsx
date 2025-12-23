'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import logoImg from '@/shared/assets/images/logo.png';
import phoneIcon from '@/shared/assets/icons/phone.svg';
import whatsappIcon from '@/shared/assets/icons/whatsapp.svg';
import Searcher from '@/widgets/ui/Searcher';
import { useGetContactsQuery } from '@/features/contacts/contactsApiSlice';

const linkBase = 'text-lg min-[2000px]:text-xl font-medium';
const getNavClass = (isActive: boolean) => `${linkBase} ${isActive ? 'text-black' : 'text-white'}`;

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: contacts } = useGetContactsQuery({ main: 'true' });

  const contact = contacts?.[0];

  return (
    <header className="container relative mt-7 h-[33vw] bg-[url('@/shared/assets/images/header-background.png')] bg-no-repeat bg-cover bg-top-left rounded-[25px]">
      <div className="flex items-center justify-between max-w-3/5 min-[1500px]:max-w-2/4 pl-8 pt-2 min-[1500px]:pt-4 min-[2000px]:pt-8">
        <Image
          src={logoImg}
          alt="logo-img"
          height={80}
          className="cursor-pointer"
          onClick={() => router.push('/')}
        />

        <nav className="flex items-center justify-between gap-6 min-[2000px]:gap-10">
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

        <div className="absolute right-[0] min-[1450px]:right-[4vw] min-[1800px]:right-[6vw] top-[6px] min-[1450px]:top-[1vw] flex items-center gap-6 min-[2000px]:gap-12 font-sans font-bold text-md min-[2000px]:text-lg">
          {contact && (
            <>
              <div className="flex items-center gap-2 min-[1800px]:gap-4">
                <Image
                  src={phoneIcon}
                  alt="phone-icon"
                  className="rounded-xl min-[1800px]:rounded-2xl w-[40px] h-[40px] min-[1800px]:w-[48px] min-[1800px]:h-[48px]"
                />
                <div>
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
                    className="rounded-xl min-[1800px]:rounded-2xl w-[40px] h-[40px] min-[1800px]:w-[48px] min-[1800px]:h-[48px]"
                  />
                  <div>
                    <h6>{contact.whatsapp_number}</h6>
                  </div>
                </div>
              </a>
            </>
          )}
        </div>
      </div>

      <div className="w-full h-full flex flex-col items-center mt-24 min-[1400px]:mt-32 min-[1800px]:mt-44 max-w-2/4 mx-auto">
        <h1 className="text-white text-center text-4xl min-[1800px]:text-5xl min-[2200px]:text-6xl">
          ПРОФЕССИОНАЛЬНОЕ КУХОННОЕ ОБОРУДОВАНИЕ
        </h1>

        <Searcher />
      </div>
    </header>
  );
};

export default Header;
