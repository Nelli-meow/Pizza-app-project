import { Button, Card, Image, Text } from '@chakra-ui/react';
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
      overflow="hidden"
      transition="transform 0.3s, box-shadow 0.3s"
      _hover={{transform: 'scale(1.01)', boxShadow: 'sm'}}
      bg="gray.200"
      borderColor="gray.300"
    >
      <Image
        src={image}
        alt="Green double couch with wooden legs"
      />
      <Card.Body gap="2">
        <Card.Title color="black">{name}</Card.Title>
        <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" color="black" mt="2">
          {price} руб
        </Text>
      </Card.Body>
      <Card.Footer gap="2">
        <Button
          bg="orange.400"
          color="white"
          border="2px solid"
          borderColor="orange.400"
          _hover={{
            bg: 'white',
            color: 'orange.400',
          }}
          borderRadius="md"
          onClick={onClick}
        >
          Добавить в корзину
        </Button>
      </Card.Footer>
    </Card.Root>
  );
};

export default OnePizza;