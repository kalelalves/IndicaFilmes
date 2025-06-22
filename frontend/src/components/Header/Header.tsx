import { Menu } from "./Menu";
import { UserActions } from "./UserActions";

interface HeaderProps {
  isAuthenticated: boolean;
}

export const Header: React.FC<HeaderProps> = ({ isAuthenticated }) => (
  <header className="w-full px-8 py-4 flex justify-between items-center bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] shadow-md">
    <Menu isAuthenticated={isAuthenticated} />
    <UserActions isAuthenticated={isAuthenticated} />
  </header>
);
