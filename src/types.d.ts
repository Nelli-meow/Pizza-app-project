export interface Extra {
  name: string;
  price: number;
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
}

export interface Client {
  name: string;
  phone: string;
  address: string;
  comment?: string;
}