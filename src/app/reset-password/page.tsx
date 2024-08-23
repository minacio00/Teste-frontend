"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { validatePassword } from '@/utils/validators';
import { resetPassword } from '@/services/resetPassword';


const PasswordReset = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const router = useRouter();

  

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();

    const passwordValidationError = validatePassword(password);
    const passwordsMatch = password === confirmPassword;

    if (passwordValidationError) {
      setPasswordError(passwordValidationError);
    } else {
      setPasswordError('');
    }

    if (!passwordsMatch) {
      setConfirmPasswordError('As senhas não coincidem.');
    } else {
      setConfirmPasswordError('');
    }

    if (!passwordValidationError && passwordsMatch) {
      try {
        const token = localStorage.getItem('resetToken');
        if (!token) {
          alert('Token de redefinição não encontrado.');
          return;
        }

        await resetPassword(token, password);

        alert('Senha alterada com sucesso!');
        localStorage.removeItem('resetToken');
        router.push('/login');
      } catch (error: any) {
        alert(error.message || 'Falha ao redefinir a senha. Por favor, tente novamente.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-black">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="text-center mb-8">
          <img src="/logo.png" alt="Trajeton Logo" className="mx-auto mb-4" />
          <h2 className="text-xl font-semibold">Redefinir senha</h2>
          <p className="text-gray-600">Redefina sua senha com no mínimo 6 caracteres</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="password">
              Senha*
            </label>
            <input
              className={`w-full mt-2 p-2 border ${passwordError ? 'border-red-500' : 'border-gray-300'} rounded-md`}
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite uma senha"
            />
            {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="confirm-password">
              Confirme sua senha*
            </label>
            <input
              className={`w-full mt-2 p-2 border ${confirmPasswordError ? 'border-red-500' : 'border-gray-300'} rounded-md`}
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Repita sua senha"
            />
            {confirmPasswordError && <p className="text-red-500 text-sm mt-1">{confirmPasswordError}</p>}
          </div>
          <div className="mb-6 text-sm text-gray-600">
            <p>Crie uma senha segura:</p>
            <ul className="list-disc list-inside">
              <li>Use letras maiúsculas e minúsculas, símbolos e números;</li>
              <li>Não use informações pessoais como datas de aniversário;</li>
              <li>Não use uma senha igual à anterior.</li>
            </ul>
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 text-white p-2 rounded-lg"
          >
            Redefinir senha
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordReset;
