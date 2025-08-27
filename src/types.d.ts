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