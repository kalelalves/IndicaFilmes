import { useState } from "react";
import { api } from "../../handlers/user/userService";
import { useNavigate, Link } from "react-router-dom";
import { Text } from "../../components/Text/Text";
import { Button } from "../../components/Button/Button";
import { InputText } from "../../components/InputText/InputText";

interface Login {
  message: string;
  token: string;
}

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"success" | "error" | null>(null);
  const navigate = useNavigate();

  const fetchLogin = async (loginData: { email: string; password: string }) => {
    try {
      const response = await api.post<Login>("/auth/login", loginData);

      setStatus("success");
      setMessage("Login realizado com sucesso!");

      setEmail("");
      setPassword("");

      setTimeout(() => {
        setStatus(null);
        setMessage("");
        navigate("/dashboard");
      }, 3000);
    } catch (error: any) {
      setStatus("error");
      setMessage(error.response?.data?.message);

      setTimeout(() => {
        setStatus(null);
        setMessage("");
      }, 3000);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetchLogin({ email, password });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[var(--color-bg-main)] px-6">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full max-w-sm bg-[var(--color-bg-card)] p-6 rounded-xl shadow-lg"
      >
        <Text className="text-xl font-semibold text-center text-[var(--color-text-base)]">
          Faça login na sua conta
        </Text>

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

        <Button type="submit">Entrar</Button>

        <Text className="text-sm text-center text-[var(--color-text-secondary)]">
          Ainda não tem uma conta?{" "}
          <Link
            to="/register"
            className="text-[var(--color-accent-cyan)] hover:underline"
          >
            Inscreva-se
          </Link>
        </Text>
      </form>

      {status && (
        <div
          className={`
            fixed top-20 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-md
            text-white text-sm font-medium z-50 transition-all duration-300
            ${status === "success" ? "bg-green-500" : "bg-red-500"}
          `}
        >
          {message}
        </div>
      )}
    </div>
  );
};