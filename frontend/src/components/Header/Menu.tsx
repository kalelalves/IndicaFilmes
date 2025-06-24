import { Link } from 'react-router-dom'

interface MenuItem {
  label: string
  path: string
  private: boolean
}

const menuItems: MenuItem[] = [
  { label: 'Início', path: '/', private: true },
  { label: 'Séries', path: '/series', private: true },
  { label: 'Filmes', path: '/filmes', private: true },
  { label: 'Bombando', path: '/bombando', private: true },
  { label: 'Minha lista', path: '/minha-lista', private: true }
]

export const Menu: React.FC<{ isAuthenticated: boolean }> = ({
  isAuthenticated
}) => {
  return (
    <div className="flex items-center gap-6">
      <Link to="/" className="text-2xl font-bold text-[var(--color-text-base)]">
        Logo
      </Link>

      {isAuthenticated && (
        <nav>
          <ul className="flex gap-6 text-lg">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className="text-[var(--color-text-base)] hover:text-[var(--color-accent-pink)] transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  )
}
