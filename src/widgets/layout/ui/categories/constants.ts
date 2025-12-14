import { CategoriesItem } from '@/features/categories/types';
import bg1 from '@/shared/assets/images/equipment-bg-01.png';
import bg2 from '@/shared/assets/images/equipment-bg-02.png';
import bg3 from '@/shared/assets/images/equipment-bg-03.png';
import bg4 from '@/shared/assets/images/equipment-bg-04.png';

export const categoriesMock: CategoriesItem[] = [
  {
    id: 1,
    name: 'Тепловое оборудование',
    parent_id: null,
    queue: 0,
    active: 1,
    image: bg1.src,
    children: [
      { id: 5, name: 'Пароконвектоматы / конвекционные печи', parent_id: 1, queue: 0, active: 1, children: [] },
      {
        id: 6,
        name: 'Плиты',
        parent_id: 1,
        queue: 1,
        active: 1,
        children: [
          { id: 11, name: 'Газовые плиты', parent_id: 6, queue: 0, active: 1, children: [] },
          { id: 12, name: 'Электрические плиты', parent_id: 6, queue: 1, active: 1, children: [] },
          { id: 13, name: 'Индукционные плиты', parent_id: 6, queue: 2, active: 1, children: [] }
        ]
      },
      { id: 7, name: 'Гриль и жарочные поверхности', parent_id: 1, queue: 2, active: 1, children: [] },
      { id: 8, name: 'Фритюрницы', parent_id: 1, queue: 3, active: 1, children: [] },
      { id: 9, name: 'Пицца-печи', parent_id: 1, queue: 4, active: 1, children: [] },
      { id: 10, name: 'Саламандеры (жарочные аппараты)', parent_id: 1, queue: 5, active: 1, children: [] }
    ]
  },
  {
    id: 2,
    name: 'Охлаждение и хранение',
    parent_id: null,
    queue: 1,
    active: 1,
    image: bg2.src,
    children: [
      { id: 14, name: 'Холодильные шкафы', parent_id: 2, queue: 0, active: 1, children: [] },
      { id: 15, name: 'Морозильные шкафы / лари', parent_id: 2, queue: 1, active: 1, children: [] },
      { id: 16, name: 'Холодильные столы (рабочие)', parent_id: 2, queue: 2, active: 1, children: [] },
      { id: 17, name: 'Холодильные витрины', parent_id: 2, queue: 3, active: 1, children: [] },
      { id: 18, name: 'Льдогенераторы', parent_id: 2, queue: 4, active: 1, children: [] }
    ]
  },
  {
    id: 3,
    name: 'Нейтральное и барное оборудование',
    parent_id: null,
    queue: 2,
    active: 1,
    image: bg3.src,
    children: [
      {
        id: 22,
        name: 'Барное оборудование (кофемашины, диспенсеры, соковыжималки)',
        parent_id: 3,
        queue: 0,
        active: 1,
        children: []
      },
      { id: 20, name: 'Стеллажи, полки, тележки', parent_id: 3, queue: 1, active: 1, children: [] },
      { id: 19, name: 'Рабочие столы из нержавейки', parent_id: 3, queue: 2, active: 1, children: [] },
      { id: 21, name: 'Мойки / раковины', parent_id: 3, queue: 3, active: 1, children: [] },
      { id: 23, name: 'Гастроёмкости (GN) и аксессуары', parent_id: 3, queue: 5, active: 1, children: [] }
    ]
  },
  {
    id: 4,
    name: 'Подготовка продуктов (Электромеханика / Food Prep)',
    parent_id: null,
    queue: 3,
    active: 1,
    image: bg4.src,
    children: [
      { id: 24, name: 'Планетарные миксеры / тестомесы', parent_id: 4, queue: 0, active: 1, children: [] },
      { id: 25, name: 'Мясорубки', parent_id: 4, queue: 1, active: 1, children: [] },
      { id: 26, name: 'Профессиональные блендеры', parent_id: 4, queue: 2, active: 1, children: [] },
      { id: 27, name: 'Овощерезки / слайсеры / чопперы', parent_id: 4, queue: 3, active: 1, children: [] },
      { id: 28, name: 'Кухонные комбайны', parent_id: 4, queue: 4, active: 1, children: [] },
      { id: 29, name: 'Барные миксеры и шейкеры', parent_id: 4, queue: 5, active: 1, children: [] }
    ]
  }
];