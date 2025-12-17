export interface BrandsItem {
  id: string;
  name: string;
  img: string;
  desc: string | null;
  active: boolean;
}

export interface BrandRequest {
  name: string;
  desc?: string;
  image: File;
}