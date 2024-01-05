import { Route, Routes } from "react-router-dom";
import { Login, Register } from "../pages";
import Pagenotfound from "../Pagenotfound";

const AuthRoutes = () => {
    const roleuser = localStorage.getItem("role");
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default AuthRoutes;
