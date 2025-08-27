import PizzasBlock from '../../components/PizzasBlock/PizzasBlock.tsx';
import Header from '../../components/Header/Header.tsx';
import { Box } from '@chakra-ui/react';


const MainPage = () => {
  return (
    <Box bgColor="gray.100">
      <Header/>
      <PizzasBlock/>
    </Box>
  );
};

export default MainPage;