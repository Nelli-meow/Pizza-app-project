import { Box, Container, Flex, Heading, Button, Spacer } from '@chakra-ui/react';
import { FaShoppingCart } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import Stepper from '../Stepper/Stepper.tsx';



const Header = () => {
  const [cartCount, setCartCount] = useState(0);
  const [isStepperOpen, setIsStepperOpen] = useState(false);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      setCartCount(cart.length);
    };

    updateCartCount();
    window.addEventListener('cartUpdated', updateCartCount);

    return () => window.removeEventListener('cartUpdated', updateCartCount);
  }, []);

  return (
    <Box bgColor="orange.200" color="white" p="5" borderBottom="2px solid" borderColor="orange.400">
      <Container maxW="container.xl">
        <Flex alignItems="center">
          <Heading fontFamily="'Figtree', sans-serif" color="black" fontSize="xl">
            PizzaTime 🍕
          </Heading>

          <Spacer />

          <Flex gap="4" alignItems="center" position="relative">
            <Button
              position="relative"
              bg="orange.500"
              color="white"
              onClick={() => setIsStepperOpen(true)}
            >
              Корзина <FaShoppingCart />
              {cartCount > 0 && (
                <Box
                  position="absolute"
                  top="-1"
                  right="-1"
                  bg="green.600"
                  color="white"
                  borderRadius="full"
                  width="20px"
                  height="20px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  fontSize="0.8em"
                  fontWeight="bold"
                >
                  {cartCount}
                </Box>
              )}
            </Button>

            <Stepper isOpen={isStepperOpen} onClose={() => setIsStepperOpen(false)} />
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
