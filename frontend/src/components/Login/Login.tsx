import { useState } from 'react';
import { api } from '../../handlers/user/userService';
import { useNavigate } from 'react-router-dom';
import { InputText } from '../InputText/InputText';
import { Button } from '../Button/Button';
import { Text } from '../Text/Text';
import { Link } from 'react-router-dom';

interface Login {
  message: string;
  token: string;
}

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(false);
  const navigate = useNavigate();

  const fetchLogin = async (loginData: { email: string; password: string }) => {
    try {
      const response = await api.post<Login>(`/auth/login`, loginData);

      setStatus(true);
      setMessage("Login realizado com sucesso!");
      setMessage("Carregando...");

      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (error: any) {
      setStatus(true);
      setMessage(
        error.response?.data?.message
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetchLogin({ email, password });
    setEmail('');
    setPassword('');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen p-4">
      <Text as="h1" variant="body-md-bold">
        Faça login na sua conta
      </Text>

      <form onSubmit={handleSubmit}>        
        <InputText
          label="Email"
          placeholder="Digite seu email"
          value={email}
          onChange={setEmail}
        />
        <InputText
          label="Senha"
          placeholder="Digite sua senha"
          value={password}
          onChange={setPassword}
          type="password"
        />
        <Button>Entrar</Button>
      </form>

      <Text as="p" variant="body-sm-bold">
        Ainda não tem uma conta?{" "}
        <Link to="/register" className="text-violet-300 hover:underline">
          Inscreva-se
        </Link>
      </Text>

      {status && (
        <p
          className={`mt-2 ${status ? "text-green-400" : "text-red-400"}`}
        >
          {message}
        </p>
      )}
    </div>
  );
};