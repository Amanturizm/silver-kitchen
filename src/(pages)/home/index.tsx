'use client';

import React from 'react';
import Image from 'next/image';
import aboutBgImg from '@/shared/assets/images/about-bg.png';

const HomePage = () => {
  return (
    <div className={`py-12`}>
      <h1 className="uppercase text-2xl font-medium px-8">О магазине</h1>

      <div className="relative">
        <Image
          src={aboutBgImg.src}
          alt="about-bg-img"
          width={700}
          height={400}
          className="mx-auto"
        />
        <p className="absolute top-1/2 text-center text-2xl px-24">
          Silver Kitchen KG — поставщик профессионального кухонного оборудования для ресторанов,
          кафе, пекарен и предприятий общественного питания в Кыргызстане. Мы предлагаем широкий
          ассортимент техники: плиты, печи, холодильное и тепловое оборудование, вытяжки, мебель из
          нержавеющей стали. Наша команда помогает подобрать оптимальные решения под задачи бизнеса,
          обеспечивает доставку, установку и сервисное обслуживание.
        </p>
      </div>
    </div>
  );
};

export default HomePage;
