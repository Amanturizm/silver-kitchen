export interface Contact {
  id: number;
  city: string;
  phone_number_1: string;
  phone_number_2: string;
  whatsapp_number: string;
  instagram_link: string;
  lalafo_link: string;
  email: string;
  address_text: string;
  street: string;
  house_number: string;
  lat: string;
  lng: string;
  active: number;
  main: number;
}

export interface ContactRequest {
  phoneNumber1: string;
  phoneNumber2?: string;
  whatsappNumber: string;
  instagramLink?: string;
  lalafoLink?: string;
  email?: string;
  addressText?: string;
  city: string;
  street?: string;
  houseNumber?: string;
  lat?: string;
  lng?: string;
  address?: {
    addressText: string;
    lat: string;
    lng: string;
  } | null;
  active?: string;
  main?: 1 | 0
}
