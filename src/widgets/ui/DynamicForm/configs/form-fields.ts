import { FieldDef, FieldType } from './types';
import { createFormConfig } from './form-config';

type BuildType = [string?, string?, boolean?, (FieldType | null | undefined)?, number?, boolean?][];

const buildField = (fields: BuildType): FieldDef[] => {
  return fields.map((field) => {
    const [name, label, required = false, type = 'text', span = 12, isDynamicChain = false] = field;

    return {
      name: name || '',
      label: label || '',
      required,
      type: type || 'text',
      span,
      isDynamicChain,
    };
  });
};

const formFields: Record<string, FieldDef[]> = {
  brands: buildField([
    ['name', 'Название', true],
    ['description', 'Описание', false, 'textarea'],
    ['image', 'Фото', true, 'file'],
  ]),
  categories: buildField([
    ['name', 'Название', true],
    ['parentId', 'Категория', false, 'select', 12, true],
    ['queue', 'Очередь', false, 'number'],
    ['image', 'Фото', false, 'file'],
  ]),
  items: buildField([
    ['name', 'Название', true],
    ['price', 'Цена', true, 'number'],
    ['shortDesc', 'Краткое описание', false],
    ['desc', 'Описание', true, 'textEditor'],
    ['categoryId', 'Категория', false, 'select', 12, true],
    ['brandId', 'Бренд', false, 'select'],
    ['images', 'Фото', true, 'files'],
  ]),
  contacts: buildField([
    ['phoneNumber1', 'Телефонный номер 1', true],
    ['phoneNumber2', 'Телефонный номер 2', false],
    ['whatsappNumber', 'WhatsApp номер', true],
    ['instagramLink', 'Ссылка на инстаграм', false],
    ['lalafoLink', 'Ссылка на Lalafo', false],
    ['email', 'Почта', false],
    ['city', 'Город', true],
    ['street', 'Улица', false],
    ['houseNumber', 'Номер дома', false],
    ['address', 'Адрес', false, 'map'],
  ]),
};

export const FORM_PROPS = Object.entries(formFields).map(([type, fields]) =>
  createFormConfig(type, fields),
);
