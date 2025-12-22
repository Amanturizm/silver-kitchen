import { ItemsFilter } from '@/features/items/types';
import { buildQueryString } from '@/shared/constants';

const baseUrl = (endpoint: string) => `api/${endpoint}`;

export class Path {
  static Auth = class {
    static login = baseUrl('auth/login');
    static logout = baseUrl('auth/logout');
    static me = baseUrl('auth/me');
  };

  static Brands = class {
    static fetchAll = baseUrl('brands');
    static create = baseUrl('brands');
    static get = (id: string) => baseUrl(`brands/${id}`);
    static delete = (id: string) => baseUrl(`brands/${id}`);
    static update = (id: string) => baseUrl(`brands/${id}`);
  };

  static Categories = class {
    static search = (parentId: number | null) => baseUrl(`categories/search?parentId=${parentId}`);
    static create = baseUrl('categories');
    static get = (id: string) => baseUrl(`categories/${id}`);
    static delete = (id: string) => baseUrl(`categories/${id}`);
    static update = (id: string) => baseUrl(`categories/${id}`);
  };

  static Items = class {
    static search = (filter: ItemsFilter) => baseUrl(`items/search?${buildQueryString(filter)}`);
    static create = baseUrl('items');
    static get = (id: string) => baseUrl(`items/${id}`);
    static delete = (id: string) => baseUrl(`items/${id}`);
    static update = (id: string) => baseUrl(`items/${id}`);
    static deleteImage = (id: string) => baseUrl(`items/deleteImage/${id}`);
  };

  static Contacts = class {
    static fetchAll = baseUrl(`contacts`);
    static create = baseUrl('contacts');
    static get = (id: string) => baseUrl(`contacts/${id}`);
    static delete = (id: string) => baseUrl(`contacts/${id}`);
    static update = (id: string) => baseUrl(`contacts/${id}`);
  };

  static Main = class {
    static globalSearch = (searchText: string) => baseUrl(`search?searchText=${searchText}`);
  };
}
