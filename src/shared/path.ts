const baseUrl = (endpoint: string) => `api/${endpoint}`;

export class Path {
  static Brands = class {
    static fetchAll = baseUrl('brands');
  };

  static Categories = class {
    static search = (parentId: number | null) => baseUrl(`categories/search?parentId=${parentId}`);
  };
}