import axiosInstance from '../utils/axiosInstance';
import axios from 'axios';
import { Order } from '@/types/Order';

export const fetchOrders = async (): Promise<Order[]> => {
  try {
    const response = await axiosInstance.get<Order[]>('/Order');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error('Falha ao buscar os pedidos. Por favor, tente novamente.');
    } else {
      throw new Error('Ocorreu um erro inesperado.');
    }
  }
};

export const fetchOrderCount = async (): Promise<number> => {
  try {
    const response = await axiosInstance.get('/orders');
    const orders = response.data;
    return orders.length;
  } catch (error) {
    console.error('Failed to fetch orders', error);
    return 0;
  }
};

export const deleteOrder = async (orderId: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/Order/${orderId}`);
  } catch (error) {
    throw new Error('Erro ao deletar pedido, tente novamente.');
  }
};
