import { Box, Container, Flex, Heading, Button, Spacer } from '@chakra-ui/react';
import { FaShoppingCart } from 'react-icons/fa';

const Header = () => {
  return (
    <Box
      bgColor="orange.200"
      color="white"
      p="5"
      borderBottom="2px solid"
      borderColor="orange.400"
    >
      <Container maxW="container.xl">
        <Flex alignItems="center">
          <Heading fontFamily="'Figtree', sans-serif" color="black" fontSize="xl">
            PizzaTime 🍕
          </Heading>

          <Spacer/>

          <Flex gap="4">
            <Button bg="orange.500" color="white" _hover={{bg: 'orange.600'}}>
              Корзина
              <FaShoppingCart/>
            </Button>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
