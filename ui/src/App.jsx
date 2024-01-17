import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getRoleUser } from "./Services/Services";
import KitchenRoutes from "./Routes/KitchenRoutes";
import AuthRoutes from "./Routes/AuthRoutes";
import UserRoutes from "./Routes/UserRoutes";
import AdminRoutes from "./Routes/AdminRoutes";
import { ActiveNavContext } from "./Context/ActiveNav";
import { AsideScrollActiveProvider } from "./Context/AsideScrollActive";
import DeliveryRoutes from "./Routes/DeliveryRoutes";
import ManagerRoutes from "./Routes/ManagerRoutes";

function App() {
  const [role, setRole] = useState("");
  const [activeNav, setactiveNav] = useState(1);
  const [activeHrmsDash, setActiveHrmsDash] = useState(1);
  const navigate = useNavigate();
  const [activeHrmsdoc, setActiveHrmsdoc] = useState(null);
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
      <AsideScrollActiveProvider>
        <ActiveNavContext.Provider
          value={{
            activeNav,
            setactiveNav,
            activeHrmsDash,
            setActiveHrmsDash,
            activeHrmsdoc,
            setActiveHrmsdoc,
          }}
        >
          <AuthRoutes />
          <KitchenRoutes />
          <UserRoutes />
          <AdminRoutes />
          <DeliveryRoutes />
          <ManagerRoutes />
        </ActiveNavContext.Provider>
      </AsideScrollActiveProvider>
    </>
  );
}

export default App;
