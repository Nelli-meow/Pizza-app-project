import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { ToastContainer } from 'react-toastify';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastContainer/>
    <ChakraProvider value={defaultSystem}>
      <App/>
    </ChakraProvider>
  </StrictMode>,
);
