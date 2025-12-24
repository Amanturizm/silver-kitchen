import React from 'react';
import Image from 'next/image';
import logoFooterImg from '@/shared/assets/images/logo-footer.png';
import phoneIcon from '@/shared/assets/icons/phone.svg';
import whatsappIcon from '@/shared/assets/icons/whatsapp.svg';
import instagramIcon from '@/shared/assets/icons/instagram.png';
import lalafoIcon from '@/shared/assets/icons/lalafo.png';
import { useGetContactsQuery } from '@/features/contacts/contactsApiSlice';
import { useRouter } from 'next/navigation';
import { scrollToMain } from '@/shared/constants';

const Footer = () => {
  const router = useRouter();
  const { data: contacts } = useGetContactsQuery({ main: 'true' });

  const contact = contacts?.[0];

  const replaceRoute = (route: string) => {
    router.replace(route, { scroll: false });
    scrollToMain();
  };

  return (
    <footer className="px-16 bg-[#215573] text-[#DEDEDE] py-20 flex gap-10 justify-between flex-wrap">
      <div>
        <Image
          src={logoFooterImg}
          alt="logo-img"
          width={200}
          height={40}
          className="w-auto"
          loading="eager"
        />

        <div className="mt-6">
          <p className="text-xl font-light">
            Для получении консультации вы можете оставить свои контакты
          </p>

          <div className="mt-6 flex items-center gap-4">
            <input
              type="text"
              name="contact"
              className="w-[400px] h-[66px] rounded-[20px] px-5 shadow bg-white outline-none text-lg text-gray-700 placeholder:text-gray-400"
            />
            <button className="h-[66px] px-7 bg-red-600 text-white text-lg font-medium rounded-[20px] hover:bg-red-700 transition">
              Отправить
            </button>
          </div>
        </div>
      </div>

      <ul className="text-xl flex flex-col gap-2">
        <li className="cursor-pointer" onClick={() => replaceRoute('/')}>
          Главная
        </li>
        <li className="cursor-pointer" onClick={() => replaceRoute('/products')}>
          Продукция
        </li>
        <li className="cursor-pointer" onClick={() => replaceRoute('/about')}>
          О нас
        </li>
        <li className="cursor-pointer" onClick={() => replaceRoute('/contacts')}>
          Контакты
        </li>
      </ul>

      <ul className="text-xl flex flex-col gap-2">
        <li>{contact?.email}</li>
        <li>Адрес магазина:</li>
        <li>{contact?.address_text}</li>
        <li className="flex items-center gap-4 mt-2">
          <a href={contact?.instagram_link} target="_blank" rel="noopener noreferrer">
            <Image
              src={instagramIcon}
              alt="instagram-icon"
              className="rounded-[6px] cursor-pointer"
              width={34}
              height={34}
            />
          </a>

          <a href={contact?.lalafo_link} target="_blank" rel="noopener noreferrer">
            <Image
              src={lalafoIcon}
              alt="lalafo-icon"
              className="rounded-[6px] cursor-pointer"
              width={34}
              height={34}
              unoptimized
            />
          </a>
        </li>
      </ul>

      <div className="flex flex-col gap-10 text-lg font-sans font-medium">
        {contact && (
          <>
            <div className="flex items-center gap-4">
              <Image src={phoneIcon} alt="phone-icon" className="rounded-2xl" />
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
              <div className="flex items-center gap-4">
                <Image src={whatsappIcon} alt="whatsapp-icon" className="rounded-2xl" />
                <div>
                  <h6>{contact.whatsapp_number}</h6>
                </div>
              </div>
            </a>
          </>
        )}
      </div>
    </footer>
  );
};

export default Footer;
