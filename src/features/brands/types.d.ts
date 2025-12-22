export interface BrandsItem {
  id: string;
  name: string;
  img: string;
  description: string | null;
  active: boolean;
}

export interface BrandRequest {
  id?: string;
  name: string;
  description?: string;
  image: File;
}
