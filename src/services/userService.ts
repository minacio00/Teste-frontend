import axiosInstance from '../utils/axiosInstance';
import { User } from '@/types/User';

export async function getUserById(userId: number): Promise<User> {
  try {
    const response = await axiosInstance.get<User>(`/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    throw error;
  }
}
