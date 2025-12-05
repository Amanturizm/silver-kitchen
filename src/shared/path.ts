const baseUrl = (endpoint: string) => `api/${endpoint}`;

export class Path {
  static Brands = class {
    static fetchAll = baseUrl('brands');
  };
}