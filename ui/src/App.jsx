import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getRoleUser } from "./Services/Services";
import KitchenRoutes from "./Routes/KitchenRoutes";
import AuthRoutes from "./Routes/AuthRoutes";
import UserRoutes from "./Routes/UserRoutes";
import AdminRoutes from "./Routes/AdminRoutes";
import { ActiveNavContext } from "./Context/ActiveNav";
import DeliveryRoutes from "./Routes/DeliveryRoutes";

function App() {
  const [role, setRole] = useState("");
  const [activeNav, setactiveNav] = useState(1);
  const [activeHrmsDash, setActiveHrmsDash] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();
  const currentUrl = location.pathname;

  useEffect(() => {
    if (currentUrl === "/") {
      navigate("/dashboard");
    }
    const fetchRole = async () => {
      const role = await getRoleUser();
      setRole(role);
    };
    fetchRole();
  }, []);

  return (
    <>
      <ActiveNavContext.Provider
        value={{ activeNav, setactiveNav, activeHrmsDash, setActiveHrmsDash }}
      >
        <AuthRoutes />
        <KitchenRoutes />
        <UserRoutes />
        <AdminRoutes />
        <DeliveryRoutes/>
      </ActiveNavContext.Provider>
    </>
  );
}

export default App;
