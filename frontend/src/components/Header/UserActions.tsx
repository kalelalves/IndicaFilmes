import { Link } from "react-router-dom";

export const UserActions: React.FC<{ isAuthenticated: boolean }> = ({ isAuthenticated }) => (
  <div className="flex items-center gap-4 text-lg text-[var(--color-text-primary)]">
    {isAuthenticated ? (
      <>
        <button className="hover:text-[var(--color-accent-pink)] transition-colors">Pesquisar</button>
        <span className="hover:text-[var(--color-accent-pink)] cursor-pointer">Infantil</span>
        <button className="hover:text-[var(--color-accent-pink)] transition-colors">Notificações</button>
        <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-[var(--color-accent-cyan)]">
          <img src="/avatar.png" alt="Avatar" className="w-full h-full object-cover" />
        </div>
      </>
    ) : (
      <>
        <Link to="/idiomas" className="hover:text-[var(--color-accent-pink)] transition-colors">
          Navegar por idiomas
        </Link>
        <Link to="/login" className="hover:text-[var(--color-accent-pink)] transition-colors">
          Entrar
        </Link>
      </>
    )}
  </div>
);