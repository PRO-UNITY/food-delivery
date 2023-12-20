import { Route, Routes } from "react-router-dom"
import { AdminHome, CategoryDetails, Dashboard, Favourite, FoodOrder, KitchenDetails, Login, Register, Settings } from "./pages"
import 'bootstrap/dist/css/bootstrap.min.css';
import OrderHistory from "./pages/demo/List/OrderHistory";
import { useState, useEffect } from "react";
import { getRoleUser } from "./functions/function";

function App() {

  const [role, setRole] = useState('')

  useEffect(() => {
    const fetchRole = async () => {
        const role = await getRoleUser();
        setRole(role);
    };
    fetchRole();
}, []);

  return (
    <>
      <Routes>
        <Route path="/" element={ <Dashboard/> } />
        <Route path="/dashboard" element={ <Dashboard/> } />
        <Route path="/food-order" element={ <FoodOrder/> } />
        <Route path="/favourite" element={ <Favourite/> } />
        <Route path="/order-history" element={ <OrderHistory/> } />
        <Route path="/settings" element={ <Settings/> } />
        <Route path="/register" element={ <Register/> } />
        <Route path="/login" element={ <Login/> } />
        <Route path="/category-details/:id" element={ <CategoryDetails/> } />
        <Route path="/kitchen-details/:id" element={ <KitchenDetails/> } />
        <Route path="/admin" element={ localStorage.getItem('role')==="users"?<AdminHome/>:<Login/> } />
      </Routes>
    </>
  )
}

export default App
