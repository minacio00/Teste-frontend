import axiosInstance from '../utils/axiosInstance';
import axios from 'axios';


interface ResetPasswordDTO {
  resetToken: string;
  newPassword: string;
}

export async function resetPassword(resetToken: string, newPassword: string): Promise<void> {
  try {
    await axiosInstance.post('/Auth/reset-password', { resetToken, newPassword });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error('Falha ao tentar resetar a senha.');
    } else {
      throw new Error('Erro inesperado.');
    }
  }
}
