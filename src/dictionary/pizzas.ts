import pizzaImg from '../assets/img/domashnyaya-pitstsa_11.jpg';

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

export const pizzasArr: Pizza[] = [
  {
    name: 'Пепперони',
    price: 500,
    image: pizzaImg,
    extras: [
      {name: 'сыр моцарелла', price: 50},
      {name: 'острый соус', price: 30},
      {name: 'оливки', price: 40},
      {name: 'доп. пепперони', price: 70}
    ]
  },
  {
    name: 'Маргарита',
    price: 400,
    image: pizzaImg,
    extras: [
      {name: 'базилик', price: 20},
      {name: 'помидоры черри', price: 40},
      {name: 'доп. сыр', price: 50},
      {name: 'песто', price: 30}
    ]
  },
  {
    name: 'Четыре сыра',
    price: 550,
    image: pizzaImg,
    extras: [
      {name: 'горгонзола', price: 60},
      {name: 'чеддер', price: 50},
      {name: 'сливочный соус', price: 30},
      {name: 'грибы', price: 40}
    ]
  },
  {
    name: 'Гавайская',
    price: 480,
    image: pizzaImg,
    extras: [
      {name: 'доп. ананас', price: 30},
      {name: 'ветчина', price: 50},
      {name: 'острый соус', price: 30},
      {name: 'моцарелла', price: 50}
    ]
  },
  {
    name: 'Барбекю',
    price: 530,
    image: pizzaImg,
    extras: [
      {name: 'курица', price: 50},
      {name: 'бекон', price: 50},
      {name: 'лук', price: 20},
      {name: 'соус барбекю', price: 30}
    ]
  },
  {
    name: 'Вегетарианская',
    price: 450,
    image: pizzaImg,
    extras: [
      {name: 'баклажаны', price: 40},
      {name: 'цукини', price: 40},
      {name: 'перец болгарский', price: 30},
      {name: 'брокколи', price: 30}
    ]
  },
  {
    name: 'Мясная',
    price: 560,
    image: pizzaImg,
    extras: [
      {name: 'салями', price: 50},
      {name: 'бекон', price: 50},
      {name: 'курица', price: 50},
      {name: 'говядина', price: 70}
    ]
  },
  {
    name: 'Дьябло',
    price: 520,
    image: pizzaImg,
    extras: [
      {name: 'халапеньо', price: 30},
      {name: 'острый соус', price: 30},
      {name: 'доп. пепперони', price: 70},
      {name: 'лук красный', price: 20}
    ]
  },
  {
    name: 'С грибами',
    price: 470,
    image: pizzaImg,
    extras: [
      {name: 'белые грибы', price: 50},
      {name: 'трюфельное масло', price: 60},
      {name: 'шампиньоны', price: 40},
      {name: 'лук', price: 20}
    ]
  }
];
