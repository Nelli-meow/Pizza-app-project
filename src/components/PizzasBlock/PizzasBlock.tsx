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
  HStack, IconButton,
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
  const [extrasChecked, setExtrasChecked] = useState<Record<string, boolean>>({});

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
    setExtrasCount(prevState => {
      const newCount = Math.max(0, (prevState[name] || 0) + sumExtra);
      return {
        ...prevState,
        [name]: newCount,
      };
    });

    if (sumExtra > 0) {
      setExtrasChecked(prev => ({ ...prev, [name]: true }));
    }

    if (sumExtra < 0) {
      const newCount = Math.max(0, (extrasCount[name] || 0) + sumExtra);
      if (newCount === 0) {
        setExtrasChecked(prev => ({ ...prev, [name]: false }));
      }
    }
  };

  const totalPrice = selectedPizza
    ? selectedPizza.price + selectedPizza.extras.reduce(
    (sum, extra) => sum + (extrasCount[extra.name] || 0) * extra.price, 0) : 0;

  return (
    <Container mt={20} p="10" bg="white" borderRadius="xl">
      <Text textAlign="center" fontSize="40px" color="orange.600" mb={20}>Меню</Text>

      <SimpleGrid columns={[1, 2, 3]} gap="40px">
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
              <Dialog.Content
                p={5}
                borderRadius="md"
                w={{base: '90%', sm: '500px'}}
                maxW="90%"
                maxH="90%"
                overflowY="auto"
                overflowX="hidden"
              >
                <Dialog.Header>
                  <Dialog.Title fontSize={{base: 'lg', sm: 'xl'}}>
                    {selectedPizza.name}
                  </Dialog.Title>
                </Dialog.Header>

                <Dialog.Body px={{ base: 0, sm: 5 }} >
                  <Text mt={2} mb={4} fontWeight="bold">Добавить дополнительно:</Text>
                  <VStack align="start" mt={2}>
                    {selectedPizza.extras.map(extra => {
                      const count = extrasCount[extra.name] || 0;
                      const checked = extrasChecked[extra.name] ?? false;

                      return (
                        <HStack key={extra.name} justifyContent="space-between" w="100%">
                          <Checkbox.Root
                            checked={checked}
                            onCheckedChange={(isChecked) => {
                              setExtrasChecked(prev => ({ ...prev, [extra.name]: !!isChecked }));
                              setExtrasCount(prev => ({
                                ...prev,
                                [extra.name]: isChecked ? prev[extra.name] || 1 : 0
                              }));
                            }}
                            css={{ flex: 1 }}
                          >
                            <Checkbox.HiddenInput />
                            <Checkbox.Control />
                            <Checkbox.Label fontSize={{ base: 14, sm: 15 }} ml={2} whiteSpace="normal">
                              {extra.name} - {extra.price} руб
                            </Checkbox.Label>
                          </Checkbox.Root>

                          <NumberInput.Root value={String(count)} min={0} unstyled spinOnPress={false}>
                            <HStack gap="2">
                              <NumberInput.DecrementTrigger asChild>
                                <IconButton
                                  variant="outline"
                                  size="sm"
                                  onClick={() => changeExtrasCount(extra.name, -1)}
                                >
                                  <LuMinus />
                                </IconButton>
                              </NumberInput.DecrementTrigger>

                              <NumberInput.ValueText textAlign="center" fontSize="lg" minW="3ch" />

                              <NumberInput.IncrementTrigger asChild>
                                <IconButton
                                  variant="outline"
                                  size="sm"
                                  onClick={() => changeExtrasCount(extra.name, 1)}
                                >
                                  <LuPlus />
                                </IconButton>
                              </NumberInput.IncrementTrigger>
                            </HStack>
                          </NumberInput.Root>
                        </HStack>
                      );
                    })}
                  </VStack>
                  <Text mt={5} fontSize={{ base: 18, sm: 20 }}>
                    Цена: {totalPrice} руб
                  </Text>
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