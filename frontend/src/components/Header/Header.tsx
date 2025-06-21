import { Menu } from "./Menu";
import { UserActions } from "./UserActions";

interface HeaderProps {
  isAuthenticated: boolean;
}

export const Header: React.FC<HeaderProps> = ({ isAuthenticated }) => {

  return (
    <header className="w-full bg-purple-800 text-white px-6 py-2 text-sm">
      <Menu isAuthenticated={isAuthenticated} />
      <UserActions isAuthenticated={isAuthenticated} />
    </header>
  );
};
