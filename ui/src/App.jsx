import { Route, Routes } from "react-router-dom"
import { CategoryDetails, Dashboard, DeliveryHome, DeliveryStatistic, EditAdminProfile, Favourite, FoodOrder, KitchenDetails, Login, Notification, Register, Services, Settings, TaskList } from "./pages"
import 'bootstrap/dist/css/bootstrap.min.css';
import OrderHistory from "./pages/demo/List/OrderHistory";
import { useState, useEffect } from "react";
import { getRoleUser } from "./functions/function";
import Pagenotfound from "./Pagenotfound";
import { ActiveNavContext } from "./context/ActiveNav";

function App() {

  const [role, setRole] = useState('')
  const [activeNav, setactiveNav] = useState(1);
  const [activeHrmsDash, setActiveHrmsDash] = useState(1);


  useEffect(() => {
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
      <Routes>
        <Route path="/" element={ <Dashboard/> } />
        <Route path="/home" element={ <Dashboard/> } />
        {localStorage.getItem('role')==="kitchen"?<Route path="/dashboard" element={ <Dashboard/> } />:""}
        <Route path="/food-order" element={ <FoodOrder/> } />
        <Route path="/favourite" element={ <Favourite/> } />
        <Route path="/order-history" element={ <OrderHistory/> } />
        <Route path="/settings" element={ <Settings/> } />
        <Route path="/register" element={ <Register/> } />
        <Route path="/login" element={ <Login/> } />
        <Route path="/category/:id" element={ <CategoryDetails/> } />
        <Route path="/kitchen-details/:id" element={ <KitchenDetails/> } />
        <Route path="*" element={ <Pagenotfound/> } />
        <Route path="/admin" element={ localStorage.getItem('role')==="admins"?<DeliveryHome/>:<Dashboard/> } />
        <Route path="/edit-profile" element={ localStorage.getItem('role')==="admins"?<EditAdminProfile/>:<Login/> } />
        <Route path="/statistic" element={ <DeliveryStatistic/> } />
        <Route path="/task-list" element={ <TaskList/> } />
        <Route path="/services" element={ <Services/> } />
        <Route path="/notification" element={ <Notification/> } />
      </Routes>
      </ActiveNavContext.Provider>
    </>
  ) 
}

export default App
