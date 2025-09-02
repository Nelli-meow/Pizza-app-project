import { Button, Card, Flex, Image, Text } from '@chakra-ui/react';
import React from 'react';

interface Props {
  name: string,
  price: number,
  image: string,
  onClick: () => void,
}

const OnePizza: React.FC<Props> = ({name, image, price, onClick}) => {
  return (
    <Card.Root
      maxW="sm"
      w="100%"
      h="100%"
      overflow="hidden"
      transition="transform 0.3s, box-shadow 0.3s"
      _hover={{transform: 'scale(1.01)', boxShadow: 'sm'}}
      bg="gray.200"
      borderColor="gray.300"
    >
      <Image
        src={image}
        alt={name} w="100%" objectFit="cover"
      />
      <Card.Body gap="2">
        <Card.Title
          color="black"
          fontSize={{base: 'md', sm: 'lg'}}
        >
          {name}
        </Card.Title>
        <Text
          fontSize={{base: 'lg', sm: '2xl'}}
          fontWeight="medium"
          letterSpacing="tight"
          color="black"
          mt="2"
        >
          {price} руб
        </Text>
      </Card.Body>
      <Card.Footer gap="2">
        <Flex w="100%" justify="center">
          <Button
            w={{base: '100%', sm: 'auto'}}
            bg="orange.400"
            color="white"
            border="2px solid"
            borderColor="orange.400"
            _hover={{
              bg: 'white',
              color: 'orange.400',
            }}
            borderRadius="md"
            whiteSpace="normal"
            textAlign="center"
            onClick={onClick}
          >
            Добавить в корзину
          </Button>
        </Flex>
      </Card.Footer>
    </Card.Root>
  );
};

export default OnePizza;