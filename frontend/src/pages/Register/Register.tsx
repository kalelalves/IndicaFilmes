import { useState } from 'react'
import { z } from 'zod'
import { api } from '../../handlers/user/userService'
import { Text } from '../../components/Text/Text'
import { Button } from '../../components/Button/Button'
import { InputText } from '../../components/InputText/InputText'

interface Register {
  name: string
  email: string
  password: string
}

const registerSchema = z
  .object({
    name: z.string().min(1, 'Nome obrigatório'),
    email: z.string().email('E-mail inválido'),
    password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
    confirmPassword: z.string().min(6, 'Confirmação de senha obrigatória'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  })

export function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [status, setStatus] = useState<'success' | 'error' | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({})

  const clearStatus = () => {
    setTimeout(() => {
      setStatus(null)
      setMessage(null)
    }, 3000)
  }

  const handleFieldChange = (
    field: string,
    value: string,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setter(value)
    if (fieldErrors[field]) {
      setFieldErrors((prev) => {
        const updated = { ...prev }
        delete updated[field]
        return updated
      })
    }
  }

  const fetchRegister = async (registerData: Register) => {
    const response = await api.post<Register>('/auth/register', registerData)
    return response.data
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const result = registerSchema.safeParse({
      name,
      email,
      password,
      confirmPassword,
    })

    if (!result.success) {
      const errors: { [key: string]: string } = {}
      result.error.errors.forEach((err) => {
        const field = err.path[0] as string
        errors[field] = err.message
      })

      setFieldErrors(errors)
      setStatus('error')
      setMessage('Corrija os campos destacados.')
      clearStatus()
      return
    }

    try {
      const response = await fetchRegister({ name, email, password })
      setStatus('success')
      setMessage(
        `Cadastro realizado com sucesso! Bem-vindo, ${response.name} (${response.email})`
      )
      setName('')
      setEmail('')
      setPassword('')
      setConfirmPassword('')
      setFieldErrors({})
      clearStatus()
    } catch (error: any) {
      setStatus('error')
      setMessage(error.response?.data?.message || 'Erro ao registrar.')
      clearStatus()
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
          onChange={(value) => handleFieldChange('name', value, setName)}
          error={!!fieldErrors.name}
          errorMessage={fieldErrors.name}
        />
        <InputText
          label="Email"
          placeholder="Digite seu email"
          value={email}
          onChange={(value) => handleFieldChange('email', value, setEmail)}
          error={!!fieldErrors.email}
          errorMessage={fieldErrors.email}
        />
        <InputText
          label="Senha"
          placeholder="Digite sua senha"
          value={password}
          onChange={(value) => handleFieldChange('password', value, setPassword)}
          type="password"
          error={!!fieldErrors.password}
          errorMessage={fieldErrors.password}
        />

        <InputText
          label="Confirme sua senha"
          placeholder="Digite sua senha novamente"
          value={confirmPassword}
          onChange={(value) =>
            handleFieldChange('confirmPassword', value, setConfirmPassword)
          }
          type="password"
          error={!!fieldErrors.confirmPassword}
          errorMessage={fieldErrors.confirmPassword}
        />

        <Button>Registrar</Button>
      </form>

      {status && message && (
        <div
          className={`
          fixed top-20 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-md
          text-sm font-medium z-50 transition-all duration-300
          ${status === 'success' ? 'bg-green-500 text-black' : 'bg-red-500 text-white'}
        `}
        >
          {message}
        </div>
      )}
    </div>
  )
}