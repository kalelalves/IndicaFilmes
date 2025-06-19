import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./components/Login/Login";
import { Register } from "./components/Register/Register";
import { Header } from "./components/Header/Header";

export function App() {
  //Temporary placeholder for authentication status
  const isAuthenticated = false;

  return (
    <BrowserRouter>
      <Header isAuthenticated={isAuthenticated} />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}