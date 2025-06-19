import { useLocation, Link } from "react-router-dom";

interface HeaderProps {
  isAuthenticated: boolean;
}

interface MenuItem {
  label: string;
  path: string;
  private: boolean;
}

const menuItems: MenuItem[] = [
  { label: "Início", path: "/", private: true },
  { label: "Séries", path: "/series", private: true },
  { label: "Filmes", path: "/filmes", private: true },
  { label: "Bombando", path: "/bombando", private: true },
  { label: "Minha lista", path: "/minha-lista", private: true },
  { label: "Navegar por idiomas", path: "/idiomas", private: true },
];

export const Header: React.FC<HeaderProps> = ({ isAuthenticated }) => {
  const location = useLocation();
  const isAuthPage = ["/login", "/register"].includes(location.pathname);

  return (
    <header className="w-full bg-purple-800 text-white px-6 py-2 text-sm">
      <div className="flex justify-between items-center">
        <div className="flex gap-6 items-center">
          <Link to="/" className="font-bold">
            LOGO
          </Link>

          {!isAuthPage && (
            <nav>
              <ul className="flex gap-4">
                {menuItems
                  .filter((item) => (item.private ? isAuthenticated : true))
                  .map((item) => (
                    <li key={item.path}>
                      <Link to={item.path} className="hover:underline">
                        {item.label}
                      </Link>
                    </li>
                  ))}
              </ul>
            </nav>
          )}
        </div>

        <div className="flex items-center gap-4">
          {!isAuthPage && isAuthenticated && (
            <>
              <button title="Buscar">Pesquisar</button>
              <span>Infantil</span>
              <button title="Notificações">Notificações</button>
              <div className="w-4 h-4 bg-white rounded-sm">Avatar</div>
            </>
          )}

          {!isAuthenticated && !isAuthPage && (
            <>
              <span>Idiomas</span>
              <Link to="/login" className="hover:underline">
                Entrar
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
