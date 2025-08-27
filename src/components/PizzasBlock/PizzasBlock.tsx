import { Container, SimpleGrid, Text } from '@chakra-ui/react';
import OnePizza from '../OnePizza/OnePizza.tsx';
import pizzaImg from '../../assets/domashnyaya-pitstsa_11.jpg';
import { useState } from 'react';

const pizzasArr = [
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
  },
  {
    name: 'С морепродуктами',
    price: 600,
    image: pizzaImg,
    extras: [
      {name: 'креветки', price: 80},
      {name: 'кальмары', price: 70},
      {name: 'мидии', price: 60},
      {name: 'лимон', price: 10}
    ]
  }
];


const PizzasBlock = () => {
  const [pizzas, setPizzas] = useState(pizzasArr);

  return (
    <Container mt={20} p="10" bg="white" borderRadius="xl">
      <Text textAlign="center" fontSize="40px" color="orange.600" mb={20}>Menu</Text>

      <SimpleGrid columns={[2, null, 3]} gap="40px">
        {pizzas.map(pizza => (
          <OnePizza
            key={pizza.name}
            name={pizza.name}
            price={pizza.price}
            image={pizza.image}
          />
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default PizzasBlock;