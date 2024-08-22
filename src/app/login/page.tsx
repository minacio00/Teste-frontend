"use client";
import { useState } from 'react';
import Image from 'next/image';
import PasswordRecoveryModal from '@/components/PasswordRecoveryModal';
import { useRouter } from 'next/navigation';


const Login = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handlePasswordRecoverySubmit = (email: string) => {
    alert(`Um link de recuperação foi enviado para ${email}.`);
    setIsModalOpen(false);
    router.push('/reset-password');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="min-h-screen flex flex-col md:flex-row bg-orange-50">
        <div className="w-full md:w-1/2 bg-orange-50 flex items-center justify-center order-1 md:order-2 h-full md:h-auto">
          <Image
            src="/logo.png"
            alt="Company Logo"
            width={150}
            height={150}
            className="md:w-auto"
          />
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-center p-8 bg-white order-2 md:order-1 h-full md:h-auto">
          <h1 className="text-2xl font-semibold mb-6 text-center">Entrar</h1>
          <form className="w-full flex justify-center" onSubmit={handleSubmit}>
            <div className="max-w-lg w-full">
              <div className="mb-4">
                <label className="block text-gray-700" htmlFor="email">
                  E-mail*
                </label>
                <input
                  className="w-full mt-2 p-2 border border-gray-300 rounded-md text-black"
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="mail.example@gmail.com"
                />
                {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700" htmlFor="password">
                  Senha*
                </label>
                <input
                  className="w-full mt-2 p-2 border border-gray-300 rounded-md text-black"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="********"
                />
                {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
              </div>
              <div className="mb-6 text-right">
                <a
                  href="#"
                  className="text-sm text-blue-500"
                  onClick={() => setIsModalOpen(true)}
                >
                  Esqueci minha senha
                </a>
              </div>
              <button
                type="submit"
                className="w-full bg-orange-500 text-white p-2 rounded-lg"
              >
                Entrar
              </button>
            </div>
          </form>
        </div>
      </div>

      {isModalOpen && (
        <PasswordRecoveryModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={handlePasswordRecoverySubmit}
        />
      )}
    </>
  );
};

export default Login;
