import React from 'react';
import Image from 'next/image';
import logoFooterImg from '@/shared/assets/images/logo-footer.png';
import phoneIcon from '@/shared/assets/icons/phone.svg';
import whatsappIcon from '@/shared/assets/icons/whatsapp.svg';

const Footer = () => {
  return (
    <footer className="px-16 bg-[#215573] text-[#DEDEDE] py-20 flex gap-10 justify-between flex-wrap">
      <div>
        <Image src={logoFooterImg.src} alt="logo-img" width={200} height={40}/>

        <div className="mt-6">
          <p className="text-xl font-light">
            Для получении консультации вы можете оставить свои контакты
          </p>

          <div className="mt-6 flex items-center gap-4">
            <input
              type="text"
              className="w-[400px] h-[66px] rounded-[20px] px-5 shadow bg-white outline-none text-lg text-gray-700 placeholder:text-gray-400"
            />
            <button
              className="h-[66px] px-7 bg-red-600 text-white text-lg font-medium rounded-[20px] hover:bg-red-700 transition">
              Отправить
            </button>
          </div>
        </div>
      </div>

      <ul className="text-xl flex flex-col gap-2">
        <li>Главная</li>
        <li>Продукция</li>
        <li>О нас</li>
        <li>Контакты</li>
      </ul>

      <ul className="text-xl flex flex-col gap-2">
        <li>silver@gmail.com</li>
        <li>Адрес магазина</li>
      </ul>

      <div className="flex flex-col gap-10 text-lg font-sans font-medium">
        <div className="flex items-center gap-4">
          <Image src={phoneIcon} alt="phone-icon" className="rounded-2xl"/>
          <div>
            <h6>+996 707 707 707</h6>
            <h6>+996 707 707 707</h6>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Image src={whatsappIcon} alt="whatsapp-icon" className="rounded-2xl"/>
          <div>
            <h6>+996 707 707 707</h6>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;