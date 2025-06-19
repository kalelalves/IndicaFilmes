import React, { useState } from 'react';
import { InputText } from '../InputText/InputText';
import { Button } from '../Button/Button';
import { api } from '../../handlers/user/userService';
import styles from './Register.module.css';

interface Register {
  name: string;
  email: string;
  password: string
}

export function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  const fetchRegister = async (registerData: { name: string; email: string; password: string }) => {
    const response = await api.post<Register>('/register', registerData);
    return response.data;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetchRegister({ name, email, password });
      setMessage(`Cadastro realizado com sucesso! Bem-vindo, ${response.name} (${response.email})`);
      setName('');
      setEmail('');
      setPassword('');
    } catch (error: any) {
      setMessage(
        error.response?.data?.message || 'Erro ao cadastrar. Tente novamente.'
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>Cadastro</h2>
      <InputText
        label='Nome'
        placeholder='Digite seu nome'
        value={name}
        onChange={setName}
      />
      <InputText
        label='Email'
        placeholder='Digite seu email'
        value={email}
        onChange={setEmail}
      />
      <InputText
        label='Senha'
        placeholder='Digite sua senha'
        value={password}
        onChange={setPassword}
      />
      <Button>Registrar</Button>
      {message && <p>{message}</p>}
    </form>
  );
}