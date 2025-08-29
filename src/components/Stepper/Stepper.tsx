import { Box, Button, Flex, Heading, Text, CloseButton } from '@chakra-ui/react';
import type { Extra, IPizza } from '../../types';
import React from 'react';

interface StepperProps {
  isOpen: boolean;
  onClose: () => void;
}

const Stepper: React.FC<StepperProps> = ({isOpen, onClose}) => {
  const cart: IPizza[] = JSON.parse(localStorage.getItem('cart') || '[]');
  const total = cart.reduce((sum: number, item: IPizza) => sum + item.totalPrice, 0);

  if (!isOpen) return null;

  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      width="100vw"
      height="100vh"
      bg="blackAlpha.600"
      display="flex"
      justifyContent="center"
      alignItems="center"
      zIndex={999}
    >
      <Box
        bg="white"
        p={5}
        borderRadius="md"
        minWidth="400px"
        maxWidth="90%"
        maxHeight="90%"
        overflowY="auto"
      >
        <Flex justify="space-between" align="center" mb={4}>
          <Heading size="md">Ваша корзина</Heading>
          <CloseButton onClick={onClose} color="black" bgColor="white"/>
        </Flex>

        {cart.length === 0 ? (
          <Text>Корзина пуста</Text>
        ) : (
          <>
            {cart.map((item: IPizza, idx: number) => (
              <Flex
                key={idx}
                mb={3}
                p={3}
                borderWidth="1px"
                borderRadius="md"
                bg="gray.50"
                align="start"
                justify="space-between"
              >
                <Box>
                  <Heading size="sm" color="black" mb={1}>
                    {item.name}
                  </Heading>
                  {item.extras && item.extras.length > 0 && (
                    <Text fontSize="sm" color="gray.500">
                      Дополнительно:{' '}
                      {item.extras.map((extra: Extra) => extra.name).join(', ')}
                    </Text>
                  )}
                </Box>
                <Box>
                  <CloseButton
                    color="black"
                    bgColor="white"
                    size="sm"
                    top="15px"
                    onClick={() => {
                      const updatedCart = cart.filter((_, i) => i !== idx);
                      localStorage.setItem('cart', JSON.stringify(updatedCart));
                      window.dispatchEvent(new Event('cartUpdated'));
                    }}
                  />
                </Box>
              </Flex>
            ))}

            <Box mt={4} p={3} borderTopWidth="1px">
              <Text fontWeight="bold" fontSize="lg">
                Итоговая сумма: {total} руб
              </Text>
            </Box>

            <Button bg="orange.400"
                    color="white"
                    border="2px solid"
                    borderColor="orange.400"
                    _hover={{
                      bg: 'white',
                      color: 'orange.400',
                    }}
                    borderRadius="md"
                    mt={4} width="100%">
              Дальше
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Stepper;
