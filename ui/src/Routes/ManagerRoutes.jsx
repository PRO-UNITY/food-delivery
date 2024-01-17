import { Route, Routes } from "react-router-dom";
import { ManagerHistory, ManagerProgress } from "../pages";

const ManagerRoutes = () => {
  const roleuser = localStorage.getItem("role");
  return (
    <Routes>
      <Route path="/progress" element={<ManagerProgress />} />
      <Route path="/history-manager" element={<ManagerHistory />} />
    </Routes>
  );
};

export default ManagerRoutes;
