import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  CloseButton,
  Steps,
  ButtonGroup,
  Input,
  VStack,
  Textarea,
} from '@chakra-ui/react';
import type { Client, Extra, IPizza } from '../../types';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface StepperProps {
  isOpen: boolean;
  onClose: () => void;
}

const initialState: Client = {
  name: '',
  phone: '',
  address: '',
  comment: ''
};

const Stepper: React.FC<StepperProps> = ({isOpen, onClose}) => {
  const cart: IPizza[] = JSON.parse(localStorage.getItem('cart') || '[]');
  const total = cart.reduce((sum: number, item: IPizza) => sum + item.totalPrice, 0);
  const [client, setClient] = useState<Client>({...initialState});

  const savedStep = Number(sessionStorage.getItem('currentStep')) || 0;
  const [step, setStep] = useState(savedStep);

  useEffect(() => {
    sessionStorage.setItem('currentStep', step.toString());
  }, [step]);

  if (!isOpen) return null;

  const steps = [
    {title: 'Шаг 1', description: 'Просмотр заказа'},
    {title: 'Шаг 2', description: 'Ввод данных клиента'},
    {title: 'Шаг 3', description: 'Подтверждение заказа'},
  ];

  const inputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target;
    if (name === 'phone') {
      const digits = value.replace(/\D/g, '').substring(0, 11);
      let formatted = '+7';
      if (digits.length > 1) formatted += ` (${digits.substring(1,4)}`;
      if (digits.length >= 4) formatted += `) ${digits.substring(4,7)}`;
      if (digits.length >= 7) formatted += `-${digits.substring(7,9)}`;
      if (digits.length >= 9) formatted += `-${digits.substring(9,11)}`;
      setClient(prev => ({ ...prev, phone: formatted }));
    } else {
      setClient(prev => ({ ...prev, [name]: value }));
    }
  };

  const nextStep = () => {
    if (step === 1) {
      if (!client.name || !client.phone || !client.address) {
        toast.error('Пожалуйста, заполните все обязательные поля!');
        return;
      }
    }

    if (step < steps.length - 1) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  const confirmOrder = () => {
    try {
      const order = {
        client,
        cart,
        total,
      };

      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      orders.push(order);
      localStorage.setItem('orders', JSON.stringify(orders));

      localStorage.removeItem('cart');
      window.dispatchEvent(new Event('cartUpdated'));

      setStep(0);
      sessionStorage.removeItem('currentStep');
      setClient({...initialState});

      toast.success('Заказ успешно оформлен!');
      onClose();
    } catch (error) {
      console.error(error);
      toast.error('Ошибка при оформлении заказа!');
    }
  };

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
        <Flex justify="flex-end" align="center" mb={4}>
          <CloseButton onClick={onClose} color="black" bgColor="white"/>
        </Flex>

        {cart.length === 0 ? (
          <Text color="black">Корзина пуста</Text>
        ) : (
          <>
            <Steps.Root step={step} count={steps.length}>
              <Steps.List mb={4}>
                {steps.map((s, index) => (
                  <Steps.Item key={index} index={index} title={s.title}>
                    <Steps.Indicator bgColor="orange.300" color="white" borderColor="orange.500"/>
                    <Steps.Title color="black">{s.title}</Steps.Title>
                    <Steps.Separator/>
                  </Steps.Item>
                ))}
              </Steps.List>

              <Steps.Content index={0}>
                <Heading size="md" color="gray.400" mb={3}>Ваша корзина</Heading>
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
                      <Heading size="sm" color="black" mb={1}>{item.name}</Heading>
                      {item.extras && item.extras.length > 0 && (
                        <Text fontSize="sm" color="gray.500">
                          Дополнительно: {item.extras.map((extra: Extra) => extra.name).join(', ')}
                        </Text>
                      )}
                    </Box>
                    <Box>
                      <CloseButton
                        size="sm"
                        color="black"
                        bgColor="white"
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
                  <Text fontWeight="bold" fontSize="lg" color="gray.500">
                    Итоговая сумма: {total} руб
                  </Text>
                </Box>
              </Steps.Content>

              <Steps.Content index={1}>
                <Heading size="md" color="gray.400" mb={3}>Введите ваши данные</Heading>
                <VStack align="stretch" color="black">
                  <Input placeholder="Имя*" name="name" value={client.name} onChange={inputChange}/>
                  <Input placeholder="Телефон*" name="phone" value={client.phone} onChange={inputChange}/>
                  <Input placeholder="Адрес доставки*" name="address" value={client.address} onChange={inputChange}/>
                  <Textarea placeholder="Комментарий..." name="comment" value={client.comment} onChange={inputChange}/>
                </VStack>
              </Steps.Content>

              <Steps.Content index={2}>
                <Heading size="md" color="gray.400" mb={3}>Подтверждение заказа</Heading>

                <Heading size="sm" color="gray.500" mb={2}>Состав заказа:</Heading>
                {cart.map((item: IPizza, idx: number) => (
                  <Box key={idx} mb={2} p={2} borderWidth="1px" borderRadius="md" bg="gray.50" color="black">
                    <Text fontWeight="bold">{item.name}</Text>
                    {item.extras && item.extras.length > 0 && (
                      <Text fontSize="sm" color="gray.600">
                        Дополнительно: {item.extras.map((extra: Extra) => extra.name).join(', ')}
                      </Text>
                    )}
                    <Text fontSize="sm" color="gray.600">Цена: {item.totalPrice} руб</Text>
                  </Box>
                ))}

                <Box mt={3} p={2} borderTopWidth="1px">
                  <Text fontWeight="bold" color="black">Итоговая сумма: {total} руб</Text>
                </Box>

                <Heading size="sm" color="gray.500" mt={4} mb={2}>Данные клиента:</Heading>
                <Box p={2} borderWidth="1px" borderRadius="md" bg="gray.50" color="black">
                  <Text>Имя: {client.name}</Text>
                  <Text>Телефон: {client.phone}</Text>
                  <Text>Адрес: {client.address}</Text>
                  {client.comment && <Text>Комментарий: {client.comment}</Text>}
                </Box>
              </Steps.Content>

              {step === 2 ? (
                <ButtonGroup size="sm" variant="outline" justifyContent="space-between" mt={4}>
                  <Button
                    bg="orange.400"
                    color="white"
                    border="2px solid"
                    borderColor="orange.400"
                    _hover={{ bg: 'white', color: 'orange.400' }}
                    borderRadius="md"
                    onClick={prevStep}
                  >
                    Назад
                  </Button>

                  <Button
                    bg="green.400"
                    color="white"
                    _hover={{ bg: 'green.500' }}
                    borderRadius="md"
                    onClick={confirmOrder}
                  >
                    Подтвердить заказ
                  </Button>
                </ButtonGroup>
              ) : (
                <ButtonGroup size="sm" variant="outline" justifyContent="space-between" mt={4}>
                  <Button
                    bg="orange.400"
                    color="white"
                    border="2px solid"
                    borderColor="orange.400"
                    _hover={{ bg: 'white', color: 'orange.400' }}
                    borderRadius="md"
                    onClick={prevStep}
                    disabled={step === 0}
                  >
                    Назад
                  </Button>

                  <Button
                    bg="orange.400"
                    color="white"
                    border="2px solid"
                    borderColor="orange.400"
                    _hover={{ bg: 'white', color: 'orange.400' }}
                    borderRadius="md"
                    onClick={nextStep}
                  >
                    Дальше
                  </Button>
                </ButtonGroup>
              )}
            </Steps.Root>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Stepper;
