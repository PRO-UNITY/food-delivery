import { Route, Routes, useLocation, useNavigate } from "react-router-dom"
import { AllCategories, AllFoods, AllKitchens, CategoryDetails, Dashboard, DeliveryHome, DeliveryStatistic, EditAdminProfile, Favourite, FoodDetail, FoodOrder, HistoryDetailOrder, KitchenCategoryDetail, KitchenDetails, Login, Notification, Register, Services, Settings, TaskList, UpdateSettings } from "./pages"
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
  const navigate = useNavigate()
  const location = useLocation()
  const currentUrl = location.pathname


  useEffect(() => {
    if(currentUrl === '/'){
      navigate('/dashboard')
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
      <Routes>
        <Route path="/dashboard" element={ <Dashboard/> } />
        <Route path="/allfoods" element={ <AllFoods/> } />
        <Route path="/allcategories" element={ <AllCategories/> } />
        <Route path="/allkitchens" element={ <AllKitchens/> } />
        {<Route path="/dashboard" element={ <Dashboard/> } />}
        <Route path="/food-order" element={ <FoodOrder/> } />
        <Route path="/favourite" element={ <Favourite/> } />
        <Route path="/food-detail/:id" element={ <FoodDetail/> } />
        <Route path="/order-history" element={ <OrderHistory/> } />
        <Route path="/settings" element={ <Settings/> } />
        <Route path="/update-settings" element={ <UpdateSettings/> } />
        <Route path="/register" element={ <Register/> } />
        <Route path="/login" element={ <Login/> } />
        <Route path="/category/:id" element={ <CategoryDetails/> } />
        <Route path="/kitchen/:id" element={ <KitchenDetails/> } />
        <Route path="/order-hIstory/:id" element={ <HistoryDetailOrder/> } />
        <Route path="//kitchen/category/:category_id/food/:kitchen_id" element={ <KitchenCategoryDetail/> } />
        <Route path="*" element={ <Pagenotfound/> } />
        <Route path="/admin" element={ localStorage.getItem('role')==="kitchen"?<DeliveryHome/>:<Dashboard/> } />
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
