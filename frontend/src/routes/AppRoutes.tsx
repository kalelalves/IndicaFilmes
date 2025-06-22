import { Routes, Route, useLocation } from "react-router-dom";
import { Header } from "../components/Header/Header";
import { Login } from "../pages/Login/Login";
import { Register } from "../pages/Register/Register";

interface AppRoutesProps {
  isAuthenticated: boolean;
}

export const AppRoutes: React.FC<AppRoutesProps> = ({ isAuthenticated }) => {
  const location = useLocation();
  const hideHeaderRoutes: string[] = [];
  const shouldShowHeader = !hideHeaderRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowHeader && <Header isAuthenticated={isAuthenticated} />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Adicione outras rotas privadas aqui */}
      </Routes>
    </>
  );
};