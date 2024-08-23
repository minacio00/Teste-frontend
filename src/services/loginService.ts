import axiosInstance from '../utils/axiosInstance';
import axios from 'axios';

interface LoginResponse {
  accessToken: string;
}

export async function loginUser(email: string, password: string): Promise<LoginResponse> {
  try {
    const response = await axiosInstance.post<LoginResponse>('/Auth/login', { email, password });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.status === 401) {
        throw new Error('Credenciais inválidas');
      } else {
        throw new Error('Ocorreu um erro ao fazer login');
      }
    } else {
      throw new Error('Ocorreu um erro inesperado');
    }
  }
}
