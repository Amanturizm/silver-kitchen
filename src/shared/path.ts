import { ItemsFilter } from '@/features/items/types';
import { buildQueryString } from '@/shared/constants';

const baseUrl = (endpoint: string) => `api/${endpoint}`;

export class Path {
  static Main = class {
    static globalSearch = (searchText: string) => baseUrl(`search?searchText=${searchText}`);
  };

  static Brands = class {
    static fetchAll = baseUrl('brands');
    static create = baseUrl('brands');
  };

  static Categories = class {
    static search = (parentId: number | null) => baseUrl(`categories/search?parentId=${parentId}`);
  };

  static Items = class {
    static search = (filter: ItemsFilter) => baseUrl(`items/search?${buildQueryString(filter)}`);
  };

  static Auth = class {
    static login = baseUrl('auth/login');
    static logout = baseUrl('auth/logout');
    static me = baseUrl('auth/me');
  };
}