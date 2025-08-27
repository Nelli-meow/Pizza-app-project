import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { Provider } from './components/ui/provider.tsx';
import { ToastContainer } from 'react-toastify';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastContainer />
    <Provider>
      <App />
    </Provider>
  </StrictMode>,
);
