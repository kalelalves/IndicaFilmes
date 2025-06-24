import { useState } from 'react'
import { api } from '../../handlers/user/userService'
import { Text } from '../../components/Text/Text'
import { Button } from '../../components/Button/Button'
import { InputText } from '../../components/InputText/InputText'

interface Register {
  name: string
  email: string
  password: string
}

export function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState<'success' | 'error' | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  const fetchRegister = async (registerData: Register) => {
    const response = await api.post<Register>('/auth/register', registerData)
    return response.data
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetchRegister({ name, email, password })
      setStatus('success')
      setMessage(
        `Cadastro realizado com sucesso! Bem-vindo, ${response.name} (${response.email})`
      )
      setName('')
      setEmail('')
      setPassword('')

      setTimeout(() => {
        setStatus(null)
        setMessage(null)
      }, 3000)
    } catch (error: any) {
      setStatus('error')
      setMessage(error.response?.data?.message)

      setTimeout(() => {
        setStatus(null)
        setMessage(null)
      }, 3000)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[var(--color-bg-main)] p-6">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full max-w-md bg-[var(--color-bg-card)] p-6 rounded-xl shadow-lg"
      >
        <Text className="text-3xl font-bold pb-4 text-center text-[var(--color-text-base)]">
          Registre-se
        </Text>

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
          type="password"
        />

        <Button>Registrar</Button>
      </form>

      {status && message && (
        <div
          className={`
      fixed top-20 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-md
      text-white text-sm font-medium z-50 transition-all duration-300
      ${status === 'success' ? 'bg-green-500' : 'bg-red-500'}
    `}
        >
          {message}
        </div>
      )}
    </div>
  )
}
