import { useState } from 'react';
import { Button } from '../Button/Button';
import styles from './Login.module.css';
import { api } from '../../handlers/user/userService';
import { useNavigate } from 'react-router-dom';
import { InputText } from '../InputText/InputText';

interface Login {
  message: string;
  token: string;
}

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const fetchLogin = async (loginData: { email: string; password: string }) => {
    try {
      const response = await api.post<Login>(`/login`, loginData);
      setMessage("Login realizado com sucesso!");
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (error: any) {
      setMessage(
        error.response?.data?.message || "Erro ao fazer login. Tente novamente."
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
    <div className={styles.login}>
      <h1>Faça login na sua conta</h1>
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
        />
        <Button>Entrar</Button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};