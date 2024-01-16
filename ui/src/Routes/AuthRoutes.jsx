import { Route, Routes } from "react-router-dom";
import { ForgetPassword, Login, Register, ResetPassword } from "../pages";
import Pagenotfound from "../Pagenotfound";

const AuthRoutes = () => {
    const roleuser = localStorage.getItem("role");
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forget-password" element={<ForgetPassword />} />
      <Route path="/reset-password/:uidb64/:token" element={<ResetPassword />} />
      {/* <Route path="*" element={<Pagenotfound/>} /> */}
    </Routes>
  );
};

export default AuthRoutes;
