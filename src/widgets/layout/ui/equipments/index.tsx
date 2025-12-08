import React from 'react';
import bg1 from '@/shared/assets/images/equipment-bg-01.png';
import bg2 from '@/shared/assets/images/equipment-bg-02.png';
import bg3 from '@/shared/assets/images/equipment-bg-03.png';
import bg4 from '@/shared/assets/images/equipment-bg-04.png';

const equipments = [
  { title: 'Кухонное оборудование', bgUrl: bg1 },
  { title: 'Хлебопекарное оборудование', bgUrl: bg2 },
  { title: 'Холодильное оборудование', bgUrl: bg3 },
  { title: 'Вспомогательное оборудование', bgUrl: bg4 },
];

const Equipments = () => {
  return (
    <div className="mt-8 flex flex-wrap gap-8 w-[calc(100vw-80px)]">
      {equipments.map((equipment, i) => (
        <div
          key={equipment.title + i}
          style={{ backgroundImage: `url(${equipment.bgUrl.src})` }}
          className="relative min-w-[220px] xl:w-[500px] bg-no-repeat bg-cover bg-top-left rounded-[20px] h-48 px-6 py-6 pt-8 text-white overflow-hidden"
        >
          <div className="absolute inset-0 bg-[#838B99]/85"/>

          <div className="relative z-10 flex flex-col justify-between h-full">
            <h1 className="text-2xl">{equipment.title}</h1>

            <button className="rounded-[12px] w-full border border-white py-1.5 text-md mt-4 cursor-pointer">
              Подробнее
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Equipments;
