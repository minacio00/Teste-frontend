import axiosInstance from '../utils/axiosInstance';
import axios from 'axios';

interface ForgotPasswordResponse {
    message: string;
    token: string;
}

export async function requestPasswordReset(email: string): Promise<ForgotPasswordResponse> {
    try {
      const response = await axiosInstance.post<ForgotPasswordResponse>('/Auth/forgot-password', { email });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error('Falha ao solicitar a redefinição de senha. Por favor, tente novamente.');
      } else {
        throw new Error('Ocorreu um erro inesperado.');
      }
    }
  }
