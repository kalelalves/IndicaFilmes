import { BrowserRouter } from "react-router-dom";
import { Login } from "./components/Login/Login";
import { Register } from "./components/Register/Register";

export function App() {
  return (
    <BrowserRouter>
      <Login />
      {/* <Register /> */}
    </BrowserRouter>
  );
}