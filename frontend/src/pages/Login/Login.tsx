import { useState } from 'react'
import { z } from 'zod'
import { api } from '../../handlers/user/userService'
import { useNavigate, Link } from 'react-router-dom'
import { Text } from '../../components/Text/Text'
import { Button } from '../../components/Button/Button'
import { InputText } from '../../components/InputText/InputText'

interface Login {
  message: string
  token: string
}

const loginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'Senha inválida'),
})

export const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'success' | 'error' | null>(null)
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({})
  const navigate = useNavigate()

  const clearStatus = () => {
    setTimeout(() => {
      setStatus(null)
      setMessage('')
    }, 3000)
  }

  const handleFieldChange = (field: string, value: string, setter: React.Dispatch<React.SetStateAction<string>>) => {
    setter(value)
    if (fieldErrors[field]) {
      setFieldErrors((prev) => {
        const updated = { ...prev }
        delete updated[field]
        return updated
      })
    }
  }

  const fetchLogin = async (loginData: { email: string; password: string }) => {
    try {
      const response = await api.post<Login>('/auth/login', loginData)

      setStatus('success')
      setMessage('Login realizado com sucesso!')
      setFieldErrors({})
      setEmail('')
      setPassword('')
      clearStatus()

      setTimeout(() => {
        navigate('/dashboard')
      }, 3000)
    } catch (error: any) {
      setStatus('error')
      setMessage(error.response?.data?.message || 'Erro inesperado.')
      setFieldErrors(error.response?.data?.errors || {})
      clearStatus()
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const result = loginSchema.safeParse({ email, password })

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

    await fetchLogin({ email, password })
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[var(--color-bg-main)] px-6">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full max-w-sm bg-[var(--color-bg-card)] p-6 rounded-xl shadow-lg"
      >
        <Text className="text-3xl font-bold pb-4 text-center text-[var(--color-text-base)]">
          Faça <span className="text-[var(--color-accent-cyan)] font-bold">login</span> na sua conta
        </Text>

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
          type="password"
          onChange={(value) => handleFieldChange('password', value, setPassword)}
          error={!!fieldErrors.password}
          errorMessage={fieldErrors.password}
        />

        <Button type="submit">Entrar</Button>

        <Text className="text-sm text-center text-[var(--color-text-secondary)]">
          Ainda não tem uma conta?{' '}
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
            ${status === 'success' ? 'bg-green-500' : 'bg-red-500'}
          `}
        >
          {message}
        </div>
      )}
    </div>
  )
}