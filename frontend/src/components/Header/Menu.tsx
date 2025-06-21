import { Link } from "react-router-dom";

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

export const Menu: React.FC<{ isAuthenticated: boolean }> = ({ isAuthenticated }) => (
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
);