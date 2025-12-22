import React from 'react';
import Image from 'next/image';
import icon1 from '@/shared/assets/icons/advantage-01.svg';
import icon2 from '@/shared/assets/icons/advantage-02.svg';
import icon3 from '@/shared/assets/icons/advantage-03.svg';
import icon4 from '@/shared/assets/icons/advantage-04.svg';
import icon5 from '@/shared/assets/icons/advantage-05.svg';
import icon6 from '@/shared/assets/icons/advantage-06.svg';

const advantages = [
  { icon: icon1, text: 'Оптимальное соотношение цены и качества' },
  { icon: icon2, text: 'Доступная стоимость оборудования' },
  { icon: icon3, text: 'Конкурентные цены на весь ассортимент' },
  { icon: icon4, text: 'Гибкая ценовая политика' },
  { icon: icon5, text: 'Лучшие условия для партнеров и постоянных клиентов' },
  { icon: icon6, text: 'Экономия без потери качества' },
];

const Advantages = () => {
  return (
    <div className="container px-8 pb-32 mt-20">
      <h1 className="uppercase text-2xl font-medium mb-8">Наши преимущества</h1>

      <div className="grid grid-cols-3">
        {advantages.map((item, idx) => (
          <div
            key={idx}
            className={`
              flex items-center gap-6 py-4 px-4
              ${idx % 3 !== 2 ? 'border-r border-gray-300' : ''} 
              ${idx < 3 ? 'border-b border-gray-300' : ''}
            `}
          >
            <div
              className="min-w-[66px] min-h-[66px] flex items-center justify-center rounded-full"
              style={{
                background:
                  'linear-gradient(255.52deg, rgba(80, 86, 98, 0.86) 2.38%, rgba(183, 188, 200, 0.86) 63.37%, rgba(80, 86, 98, 0.86) 99.22%)',
              }}
            >
              <Image src={item.icon} alt={`icon-${idx}`} width={24} height={24} />
            </div>

            <p className="text-xl font-medium text-[#090909]">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Advantages;
