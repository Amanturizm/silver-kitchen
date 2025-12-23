'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useGetContactsQuery } from '@/features/contacts/contactsApiSlice';
import Image from 'next/image';
import chevronIcon from '@/shared/assets/icons/chevron.svg';
import phoneIcon from '@/shared/assets/icons/phone.svg';
import whatsappIcon from '@/shared/assets/icons/whatsapp.svg';
import geoIcon from '@/shared/assets/icons/geo.png';
import { Contact } from '@/features/contacts/types';
import instagramIcon from '@/shared/assets/icons/instagram.png';

const MapViewer = dynamic(() => import('@/widgets/ui/MapViewer').then((mod) => mod.MapViewer), {
  ssr: false,
});

const ContactsPage = () => {
  const { data: contacts } = useGetContactsQuery({ main: 'false' });
  const [currentContact, setCurrentContact] = useState<Contact | null>(null);

  useEffect(() => {
    if (contacts?.[0]) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCurrentContact(contacts[0]);
    }
  }, [contacts]);

  return (
    <div className={`py-12`}>
      <h1 className="uppercase text-2xl font-medium px-8">Наши филиалы</h1>

      <div className="flex gap-12 justify-between px-8 mt-12">
        <div className="py-4 h-min bg-[#215573] rounded-[12px] shadow-lg text-white">
          {contacts?.map((contact) => (
            <div
              key={contact.id}
              onClick={() => setCurrentContact(contact)}
              className={`
                px-4 py-1.5 cursor-pointer min-w-[400px]
                flex justify-between items-center rounded-[4px] mb-0.5
                ${currentContact?.city === contact.city ? 'bg-[#347EA8]' : 'bg-[#2e5f7b]'}
                hover:bg-[#347EA8]
              `}
            >
              <span>{contact.city}</span>

              <Image src={chevronIcon} alt="" width={20} height={20} />
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4 text-lg font-sans font-medium">
          {currentContact && (
            <>
              <div className="flex items-center gap-4">
                <Image
                  src={phoneIcon}
                  alt="phone-icon"
                  className="rounded-2xl"
                  width={45}
                  height={45}
                />
                <div>
                  {currentContact.phone_number_1 && (
                    <h6>
                      <a href={`tel:${currentContact.phone_number_1.replace(/\D/g, '')}`}>
                        {currentContact.phone_number_1}
                      </a>
                    </h6>
                  )}
                  {currentContact.phone_number_2 && (
                    <h6>
                      <a href={`tel:${currentContact.phone_number_2.replace(/\D/g, '')}`}>
                        {currentContact.phone_number_2}
                      </a>
                    </h6>
                  )}
                </div>
              </div>

              <a
                href={`https://wa.me/${currentContact.whatsapp_number.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="flex items-center gap-4">
                  <Image
                    src={whatsappIcon}
                    alt="whatsapp-icon"
                    className="rounded-2xl"
                    width={45}
                    height={45}
                  />
                  <div>
                    <h6>{currentContact.whatsapp_number}</h6>
                  </div>
                </div>
              </a>

              {currentContact.instagram_link && (
                <a href={currentContact.instagram_link} target="_blank" rel="noopener noreferrer">
                  <div className="flex items-center gap-4">
                    <Image
                      src={instagramIcon}
                      alt="instagram-icon"
                      className="rounded-2xl cursor-pointer"
                      width={45}
                      height={45}
                    />

                    <div>
                      <h6>
                        {
                          currentContact.instagram_link
                            .split('/')
                            .filter(Boolean)
                            .pop()
                            ?.split('?')[0]
                        }
                      </h6>
                    </div>
                  </div>
                </a>
              )}

              {currentContact.lat && currentContact.lng && (
                <div className="flex items-center gap-4">
                  <Image
                    src={geoIcon}
                    alt="geo-icon"
                    className="rounded-2xl"
                    width={45}
                    height={45}
                  />

                  <h6>Адрес:</h6>
                </div>
              )}
            </>
          )}
        </div>

        {/*{currentContact?.lat && currentContact?.lng && (*/}
        <div className="flex-1 border rounded-xl overflow-hidden">
          <MapViewer
            latitude={'42.87498588557094'}
            longitude={'74.52659904956819'}
            address={
              '395, проспект Дэн Сяопина, Газ городок, Первомайский район, город Бишкек, 720027, Киргизия 002'
            }
            height={600}
          />
        </div>
        {/*)}*/}
      </div>
    </div>
  );
};

export default ContactsPage;
