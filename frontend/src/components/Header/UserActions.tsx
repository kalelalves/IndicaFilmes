import { Link } from "react-router-dom";

export const UserActions: React.FC<{ isAuthenticated: boolean }> = ({ isAuthenticated }) => (
  <>
    {isAuthenticated ? (
      <>
        <button aria-label="Buscar" title="Buscar">Pesquisar</button>
        <span>Infantil</span>
        <button aria-label="Notificações" title="Notificações">Notificações</button>
        <div className="w-4 h-4 bg-white rounded-sm flex items-center justify-center">
          <span className="sr-only">Avatar</span>
          <img src="/avatar.png" alt="Avatar" className="w-full h-full object-cover rounded-sm" />
        </div>
      </>
    ) : (
      <>
        <span>Idiomas</span>
        <Link to="/login" className="hover:underline">
          Entrar
        </Link>
      </>
    )}
  </>
);