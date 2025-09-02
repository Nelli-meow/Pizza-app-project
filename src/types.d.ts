export interface Extra {
  name: string;
  price: number;
  count?: number;
}

export interface Pizza {
  name: string;
  price: number;
  image: string;
  extras: Extra[];
}

export interface IPizza {
  name: string;
  price: number;
  image: string;
  extras: Extra[];
  totalPrice: number;
  basePrice:? number;
}

export interface Client {
  name: string;
  phone: string;
  address: string;
  comment?: string;
}