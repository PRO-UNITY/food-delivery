import { Route, Routes } from "react-router-dom";
import {
  DeliveryHome,
  DeliveryStatistic,
  EditAdminProfile,
  Login,
  Notification,
  Services,
  TaskList,
} from "../pages";
import Pagenotfound from "../Pagenotfound";

const AdminRoutes = () => {
  const roleuser = localStorage.getItem("role");
  return (
    <Routes>
      <Route
        path="/admin"
        element={
          localStorage.getItem("role") === "kitchen" ? (
            <DeliveryHome />
          ) : (
            <Pagenotfound />
          )
        }
      />
      <Route
        path="/edit-profile"
        element={
          localStorage.getItem("role") === "kitchen" ? (
            <EditAdminProfile />
          ) : (
            <Login />
          )
        }
      />
      <Route path="/statistic" element={<DeliveryStatistic />} />
      <Route path="/task-list" element={<TaskList />} />
      <Route path="/services" element={<Services />} />
      <Route path="/notification" element={<Notification />} />
    </Routes>
  );
};

export default AdminRoutes;
