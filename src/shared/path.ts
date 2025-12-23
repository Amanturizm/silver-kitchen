import { buildQueryString } from '@/shared/constants';
import { ItemsFilter } from '@/features/items/types';

const baseUrl = (endpoint: string) => `api/${endpoint}`;

export class Path {
  static Auth = class {
    static login = baseUrl('auth/login');
    static logout = baseUrl('auth/logout');
    static me = baseUrl('auth/me');
  };

  static Brands = class {
    static fetchAll = (active?: number) => baseUrl('brands?active=' + (active || ''));
    static create = baseUrl('brands');
    static get = (id: string) => baseUrl(`brands/${id}`);
    static delete = (id: string) => baseUrl(`brands/${id}`);
    static update = (id: string) => baseUrl(`brands/${id}`);
  };

  static Categories = class {
    static search = (params: { parentId?: number; active: string } | null) =>
      baseUrl(`categories/search?${params ? buildQueryString(params) : ''}`);
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
    static fetchAll = (main?: string) => baseUrl('contacts?main=' + (main || ''));
    static create = baseUrl('contacts');
    static get = (id: string) => baseUrl(`contacts/${id}`);
    static delete = (id: string) => baseUrl(`contacts/${id}`);
    static update = (id: string) => baseUrl(`contacts/${id}`);
  };

  static Main = class {
    static globalSearch = (searchText: string) => baseUrl(`search?searchText=${searchText}`);
  };
}
