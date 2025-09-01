import type { Client } from '../types';

const CLIENT_STORAGE_KEY = 'pizzaApp_client';

export const getClientFromStorage = (): Client => {
  try {
    const stored = localStorage.getItem(CLIENT_STORAGE_KEY);
    if (stored) {
      const client = JSON.parse(stored);
      if (client.name && client.phone && client.address) {
        return client;
      }
    }
  } catch (error) {
    console.error('Ошибка при чтении данных клиента из localStorage:', error);
  }
  
  return {
    name: '',
    phone: '+7',
    address: '',
    comment: ''
  };
};

export const saveClientToStorage = (client: Client): void => {
  try {
    localStorage.setItem(CLIENT_STORAGE_KEY, JSON.stringify(client));
  } catch (error) {
    console.error('Ошибка при сохранении данных клиента в localStorage:', error);
  }
};

export const clearClientFromStorage = (): void => {
  try {
    localStorage.removeItem(CLIENT_STORAGE_KEY);
  } catch (error) {
    console.error('Ошибка при очистке данных клиента из localStorage:', error);
  }
};