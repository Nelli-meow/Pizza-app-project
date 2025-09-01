import {
  Button,
  CloseButton,
  Container,
  Dialog,
  Portal,
  SimpleGrid,
  Text,
  Checkbox,
  VStack,
  NumberInput,
  HStack, IconButton
} from '@chakra-ui/react';
import OnePizza from '../OnePizza/OnePizza.tsx';
import { useState } from 'react';
import type { Pizza } from '../../types';
import { LuMinus, LuPlus } from 'react-icons/lu';
import { toast } from 'react-toastify';
import { pizzasArr } from '../../dictionary';

const PizzasBlock = () => {
  const [pizzas] = useState<Pizza[]>(pizzasArr);
  const [selectedPizza, setSelectedPizza] = useState<Pizza | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [extrasCount, setExtrasCount] = useState<Record<string, number>>({});

  const handleAddToCart = (pizza: Pizza) => {
    setSelectedPizza(pizza);
    setIsOpen(true);
  };

  const handleAddToCartClick = () => {
    if (!selectedPizza) return;

    const pizzaWithExtras = {
      name: selectedPizza.name,
      basePrice: selectedPizza.price,
      extras: selectedPizza.extras
        .filter(extra => (extrasCount[extra.name] || 0) > 0)
        .map(extra => ({
          name: extra.name,
          price: extra.price,
          count: extrasCount[extra.name],
        })),
      totalPrice: totalPrice
    };

    let cart;
    try {
      const stored = localStorage.getItem('cart');
      cart = stored ? JSON.parse(stored) : [];
      if (!Array.isArray(cart)) {
        cart = [];
      }
    } catch (err) {
      console.log(err);
    }

    cart.push(pizzaWithExtras);

    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cartUpdated'));

    toast.success('Пицца добавлена в корзину!');

    handleClose();
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedPizza(null);
    setExtrasCount({});
  };

  const changeExtrasCount = (name: string, sumExtra: number) => {
    setExtrasCount(prevState => ({
      ...prevState,
      [name]: Math.max(0, (prevState[name] || 0) + sumExtra),
    }));
  };

  const totalPrice = selectedPizza
    ? selectedPizza.price + selectedPizza.extras.reduce(
    (sum, extra) => sum + (extrasCount[extra.name] || 0) * extra.price, 0) : 0;

  return (
    <Container mt={20} p="10" bg="white" borderRadius="xl">
      <Text textAlign="center" fontSize="40px" color="orange.600" mb={20}>Меню</Text>

      <SimpleGrid columns={[2, null, 3]} gap="40px">
        {pizzas.map(pizza => (
          <OnePizza
            key={pizza.name}
            name={pizza.name}
            price={pizza.price}
            image={pizza.image}
            onClick={() => handleAddToCart(pizza)}
          />
        ))}
      </SimpleGrid>

      {isOpen && selectedPizza && (
        <Dialog.Root open={isOpen} onOpenChange={handleClose}>
          <Portal>
            <Dialog.Backdrop/>
            <Dialog.Positioner>
              <Dialog.Content>
                <Dialog.Header>
                  <Dialog.Title>{selectedPizza.name}</Dialog.Title>
                </Dialog.Header>

                <Dialog.Body>
                  <Text mt={2} mb={4} fontWeight="bold">Добавить дополнительно:</Text>
                  <VStack align="start" mt={2}>
                    {selectedPizza.extras.map(extra => (
                      <Checkbox.Root
                        key={extra.name}
                        css={{width: '100%'}}
                        >
                        <Checkbox.HiddenInput/>
                        <Checkbox.Control/>
                        <HStack justifyContent="space-between" alignItems="center" width="100%">
                          <Checkbox.Label fontSize={15}>
                            {extra.name} - {extra.price} руб
                          </Checkbox.Label>

                          <NumberInput.Root defaultValue="0" min={0} unstyled spinOnPress={false}>
                            <HStack gap="2">
                              <NumberInput.DecrementTrigger asChild>
                                <IconButton variant="outline" size="sm"
                                            onClick={() => changeExtrasCount(extra.name, -1)}>
                                  <LuMinus/>
                                </IconButton>
                              </NumberInput.DecrementTrigger>
                              <NumberInput.ValueText textAlign="center" fontSize="lg" minW="3ch"/>
                              <NumberInput.IncrementTrigger asChild>
                                <IconButton variant="outline" size="sm"
                                            onClick={() => changeExtrasCount(extra.name, 1)}>
                                  <LuPlus/>
                                </IconButton>
                              </NumberInput.IncrementTrigger>
                            </HStack>
                          </NumberInput.Root>
                        </HStack>
                      </Checkbox.Root>
                    ))}
                  </VStack>
                  <Text mt="5" fontSize={20}> Цена: {totalPrice} руб</Text>
                </Dialog.Body>

                <Dialog.Footer>
                  <Dialog.ActionTrigger asChild>
                    <Button variant="outline" onClick={handleClose}>
                      Отмена
                    </Button>
                  </Dialog.ActionTrigger>
                  <Button colorScheme="orange" onClick={handleAddToCartClick}>В корзину</Button>
                </Dialog.Footer>

                <Dialog.CloseTrigger asChild>
                  <CloseButton size="sm"/>
                </Dialog.CloseTrigger>
              </Dialog.Content>
            </Dialog.Positioner>
          </Portal>
        </Dialog.Root>
      )}
    </Container>
  );
};

export default PizzasBlock;