import React, { useState } from "react";
import { api } from "../../handlers/user/userService";
import { Text } from "../Text/Text";
import { Button } from "../Button/Button";
import styles from "./Register.module.css";
import { InputText } from "../InputText/InputText";

interface Register {
  name: string;
  email: string;
  password: string;
}

export function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const fetchRegister = async (registerData: {
    name: string;
    email: string;
    password: string;
  }) => {
    const response = await api.post<Register>("/register", registerData);
    return response.data;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetchRegister({ name, email, password });
      setStatus(true);
      setMessage(
        `Cadastro realizado com sucesso! Bem-vindo, ${response.name} (${response.email})`
      );
      setName("");
      setEmail("");
      setPassword("");
    } catch (error: any) {
      setStatus(true);
      setMessage(
        error.response?.data?.message
      );
    }
  };

  return (
    <div className={styles.register}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Text>Registre-se</Text>

        <InputText
          label="Nome"
          placeholder="Digite seu nome"
          value={name}
          onChange={setName}
        />
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

        <Button>Registrar</Button>

        {status && (
        <p
          className={`mt-2 ${status ? "text-green-400" : "text-red-400"}`}
        >
          {message}
        </p>
      )}
      </form>
    </div>
  );
}
