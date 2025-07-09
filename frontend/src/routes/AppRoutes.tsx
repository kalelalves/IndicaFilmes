import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { Header } from '../components/Header/Header'
import { Login } from '../pages/Login/Login'
import { Register } from '../pages/Register/Register'
import { Dashboard } from '../pages/Dashboard/Dashboard'
import { useAuth } from '../context/AuthContext'

export const AppRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  const hideHeaderRoutes: string[] = []
  const shouldShowHeader = !hideHeaderRoutes.includes(location.pathname)

  return (
    <>
      {shouldShowHeader && <Header />}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/*Rota protegida */}
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <Dashboard />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Fallback para qualquer rota não encontrada */}
        <Route
          path="*"
          element={<Navigate to={isAuthenticated ? '/dashboard' : '/login'} replace />}
        />
      </Routes>
    </>
  )
}