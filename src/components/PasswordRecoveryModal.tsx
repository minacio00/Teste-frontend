"use client";
import { useState } from 'react';
import { requestPasswordReset } from '@/services/requestPasswordReset';

interface PasswordRecoveryModalProps {
  onClose: () => void;
  onSubmit: (email: string, token: string) => void;
}

const PasswordRecoveryModal: React.FC<PasswordRecoveryModalProps> = ({ onClose, onSubmit }) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const validateEmail = (email: string): boolean => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setEmailError('E-mail inválido. Este endereço de e-mail não está cadastrado no sistema, verifique e tente novamente.');
    } else {
      try {
      const { token } = await requestPasswordReset(email);
      onSubmit(email, token);
    } catch (error: any) {
      alert(error.message || 'não foi possível completar o pedido para resetar a senha.');
    }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 text-black">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Recuperar senha</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800">&times;</button>
        </div>
        <p className="mb-4">Para recuperar sua senha, digite o e-mail cadastrado.</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="email">
              E-mail*
            </label>
            <input
              className={`w-full mt-2 p-2 border ${emailError ? 'border-red-500' : 'border-gray-300'} rounded-md`}
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="mail.example@gmail.com"
            />
            {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 text-white p-2 rounded-lg"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordRecoveryModal;
