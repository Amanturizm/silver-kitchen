'use client';
import React from 'react';
import { NavLink } from 'react-router-dom';
import Image from 'next/image';
import logoImg from '@/shared/assets/images/logo.png';
import phoneIcon from '@/shared/assets/icons/phone.svg';
import whatsappIcon from '@/shared/assets/icons/whatsapp.svg';

const linkBase = 'text-xl font-medium';
const getNavClass = (isActive: boolean) =>
  `${linkBase} ${isActive ? 'text-black' : 'text-white'}`;

const Header = () => {
  return (
    <header
      className="relative mt-7 w-[calc(100vw-80px)] h-[33vw] bg-[url('@/shared/assets/images/header-background.jpg')] bg-no-repeat bg-cover bg-top-left rounded-[25px]"
    >
      <div className="flex items-center justify-between max-w-2/4 h-[80px] pl-8 pt-8">
        <Image src={logoImg} alt="logo-img" height={80}/>

        <nav className="flex items-center justify-between gap-10">
          <NavLink
            to="/"
            className={({ isActive }) => getNavClass(isActive)}
          >
            Главная
          </NavLink>

          <NavLink
            to="/products"
            className={({ isActive }) => getNavClass(isActive)}
          >
            Продукция
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) => getNavClass(isActive)}
          >
            О нас
          </NavLink>

          <NavLink
            to="/contacts"
            className={({ isActive }) => getNavClass(isActive)}
          >
            Контакты
          </NavLink>
        </nav>

        <div className="absolute right-40 top-6 flex items-center gap-12 font-sans font-bold text-lg">
          <div className="flex items-center gap-4">
            <Image src={phoneIcon} alt="phone-icon" className="rounded-2xl"/>
            <div>
              <h6>+996 707 707 707</h6>
              <h6>+996 707 707 707</h6>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Image src={whatsappIcon} alt="phone-icon" className="rounded-2xl"/>
            <div>
              <h6>+996 707 707 707</h6>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-full flex flex-col items-center justify-center max-w-2/4 mx-auto">
        <h1 className="text-white text-center text-6xl">ПРОФЕССИОНАЛЬНОЕ КУХОННОЕ ОБОРУДОВАНИЕ</h1>

        <div>
          <input type="text" name="" />
          <button className="bg-red-600  ">Найти</button>
        </div>
      </div>
    </header>
  );
};

export default Header;