
export const validateEmail = (email: string): string => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return 'E-mail inválido. Insira um endereço de e-mail no formato correto.';
    }
    return '';
  };
  
  export const validatePassword = (password: string): string => {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=]).{8,32}$/;
    if (!passwordPattern.test(password)) {
      return 'Senha inválida. Verifique se a senha tem pelo menos 8 caracteres, com letras maiúsculas, minúsculas, números e caracteres especiais.';
    }
    return '';
  };
  