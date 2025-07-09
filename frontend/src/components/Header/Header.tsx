import { useAuth } from '../../context/AuthContext'
import { Menu } from './Menu'
import { UserActions } from './UserActions'

export const Header = () => {
  const { isAuthenticated } = useAuth()

  return (
    <header className="w-full px-8 py-4 flex justify-between items-center bg-[var(--color-bg-primary)/90] text-[var(--color-text-base)] backdrop-blur-md border-b border-[var(--color-bg-primary)]">
      <Menu isAuthenticated={isAuthenticated} />
      <UserActions isAuthenticated={isAuthenticated} />
    </header>
  )
}
