import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar';
import Login from './Pages/Login/Login';
import RegisterUser from './Pages/Register/RegisterUser/RegisterUser';
import RegisterRestaurant from './Pages/Register/RegisterRestaurant/RegisterRestaurant';
import AdminHome from './Pages/adminHome/Admin/AdminHome';
import { getRoleUser } from './functions';
import { useEffect, useState } from 'react';
import Sidebar from './Components/Sidebar';
import FoodDetails from './Pages/adminHome/Admin/foodDetails/FoodDetails';
import RestaurantHome from './Pages/Restaurant/Kitchen/Restauranthome/RestaurantHome';
import AddFood from './Pages/Restaurant/Kitchen/AddKitchen/AddKitchen';
import UserHome from './Pages/User/userhome/UserHome';
import EditFood from './Pages/Restaurant/Kitchen/EditKitchen/EditKitchen';
import CategoryHome from './Pages/Restaurant/Category/categoryhome/CategoryHome';
import FoodHome from './Pages/Restaurant/Food/foodhome/FoodHome';
import AddCategory from './Pages/Restaurant/Category/categoryadd/CategoryAdd';
import EditCategory from './Pages/Restaurant/Category/categoryedit/CategoryEdit';
import AddKitchen from './Pages/Restaurant/Kitchen/AddKitchen/AddKitchen';
import AddFoodRestaurant from './Pages/Restaurant/Food/foodadd/AddFood';
import AddDeliverToKitchen from './Pages/Restaurant/Kitchen/AddDeliver/AddDeliver';
import EditFoodRestaurant from './Pages/Restaurant/Food/foodedit/Foodedit';
import UserProfile from './Pages/Userprofile/Userprofile';
import UpdateProfile from './Pages/Userprofile/UpdateUser';
import Forgetpassword from './Pages/Userprofile/Forgetpassword';
import Changepassword from './Pages/Userprofile/Changepassword';
import RestaurantCategories from './Pages/User/RestaurantCategories/Restaurantcategories';
import CategoryFoods from './Pages/User/Categoryfood/CategoryFoods';
import Delivery from './Pages/Restaurant/Delivery/Deliverhome/Delivery';
import OrderFood from './Pages/User/Order/OrderFood';
import NewOrder from './Pages/Deliver/Neworder/NewOrder';
import DeliveryHistory from './Pages/Deliver/DeliverHistory/DeliveryHistory';
import AddDeliver from './Pages/Restaurant/Delivery/Deliveradd/DeliverAdd';
import ManagerHome from './Pages/Restaurant/Manager/ManagerHome/ManagerHome';
import AddManager from './Pages/Restaurant/Manager/ManagerAdd/ManagerAdd';
import AddManagerToKitchen from './Pages/Restaurant/Kitchen/AddManager/AddManager';
import Card from './Pages/User/Card/Card';
import ManagerMain from './Pages/Manager/ManagerHome/ManagerHome';
import DeliverDetails from './Pages/Manager/DeliverDetails/DeliverDetails';
import UserOrder from './Pages/User/UserOrder/UserOrder';
import HistoryOrder from './Pages/User/HistoryOrder/HistoryOrder';
import Rate from './Pages/User/UserRate/UserRate';

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
    <div className="App">
      {
         role === 'admins' ?
       <>
        <Navbar/>
        <Routes>
        <Route path={'/user-profile'} element={<UserProfile/>}/>
        <Route path={'/edit-profile'} element={<UpdateProfile/>}/>
        <Route path={'/change-password'} element={<Changepassword/>}/>
            <Route path={'/home'} element={<Sidebar/>}>
              <Route path={'/home/main'} element={<AdminHome/>}/>
              <Route path={'/home/food-details/:id'} element={<FoodDetails/>}/>
            </Route> 
          <Route path={'/sign-up-user'} element={<RegisterUser/>}/>
          <Route path={'/sign-up-restaurant'} element={<RegisterRestaurant/>}/>
        </Routes> 
       </> :
       role === "kitchen" ?
       <>
        <Navbar/>
        <Routes>
        <Route path={'/user-profile'} element={<UserProfile/>}/>
        <Route path={'/edit-profile'} element={<UpdateProfile/>}/>
        <Route path={'/change-password'} element={<Changepassword/>}/>
            <Route path={'/home'} element={<Sidebar/>}>
              <Route path={'/home/main'} element={<RestaurantHome/>}/>
              <Route path={'/home/add-kitchen'} element={<AddKitchen/>}/>
              <Route path={'/home/edit-food/:id'} element={<EditFood/>}/>
              <Route path={'/home/category'} element={<CategoryHome/>}/>
              <Route path={'/home/foods'} element={<FoodHome/>}/>
              <Route path={'/home/add-category'} element={<AddCategory/>}/>
              <Route path={'/home/edit-category/:id'} element={<EditCategory/>}/>
              <Route path={'/home/add-food'} element={<AddFoodRestaurant/>}/>
              <Route path={'/home/edit-foodrestaurant/:id'} element={<EditFoodRestaurant/>}/>
              <Route path={'/home/delivery'} element={<Delivery/>}/>
              <Route path={'/home/create-deliver'} element={<AddDeliver/>}/>
              <Route path={'/home/add-deliver/:id'} element={<AddDeliverToKitchen/>}/>
              <Route path={'/home/manager'} element={<ManagerHome/>}/>
              <Route path={'/home/create-manager'} element={<AddManager/>}/>
              <Route path={'/home/add-manager/:id'} element={<AddManagerToKitchen/>}/>

            </Route> 
          <Route path={'/sign-up-user'} element={<RegisterUser/>}/>
          <Route path={'/sign-up-restaurant'} element={<RegisterRestaurant/>}/>
        </Routes> 
       </> :
       role === "users" ?
       <>
        <Navbar/>
        <Routes>
        <Route path={'/user-profile'} element={<UserProfile/>}/>
        <Route path={'/edit-profile'} element={<UpdateProfile/>}/>
        <Route path={'/change-password'} element={<Changepassword/>}/>
            <Route path={'/home'} element={<Sidebar/>}>
              <Route path={'/home/main'} element={<UserHome/>}/>
              <Route path={'/home/card'} element={<Card/>}/>
              <Route path={'/home/kitchen-categories/:id'} element={<RestaurantCategories/>}/>
              <Route path={'/home/category-foods/:id'} element={<CategoryFoods/>}/>
              <Route path={'/home/order'} element={<OrderFood/>}/>
              <Route path={'/home/history-order'} element={<HistoryOrder/>}/>
              <Route path={'/home/my-order'} element={<UserOrder/>}/>
              <Route path={'/home/rating/:id'} element={<Rate/>}/>
            </Route> 
          <Route path={'/sign-up-user'} element={<RegisterUser/>}/>
          <Route path={'/sign-up-restaurant'} element={<RegisterRestaurant/>}/>
        </Routes> 
       </> :
        role === "delivery" ?
        <>
          <Navbar/>
        <Routes>
        <Route path={'/user-profile'} element={<UserProfile/>}/>
        <Route path={'/edit-profile'} element={<UpdateProfile/>}/>
        <Route path={'/change-password'} element={<Changepassword/>}/>
            <Route path={'/home'} element={<Sidebar/>}>
              <Route path={'/home/main'} element={<NewOrder/>}/>
              <Route path={'/home/delivery-history'} element={<DeliveryHistory/>}/>

            </Route> 
          <Route path={'/sign-up-user'} element={<RegisterUser/>}/>
          <Route path={'/sign-up-restaurant'} element={<RegisterRestaurant/>}/>
        </Routes> 
        </> :
        role === "manager" ?
        <>
          <Navbar/>
        <Routes>
        <Route path={'/user-profile'} element={<UserProfile/>}/>
        <Route path={'/edit-profile'} element={<UpdateProfile/>}/>
        <Route path={'/change-password'} element={<Changepassword/>}/>
            <Route path={'/home'} element={<Sidebar/>}>
              <Route path={'/home/main'} element={<ManagerMain/>}/>
              <Route path={'/home/delivery-history'} element={<DeliveryHistory/>}/>
              <Route path={'/home/deliver-details/:id'} element={<DeliverDetails/>}/>

            </Route> 
          <Route path={'/sign-up-user'} element={<RegisterUser/>}/>
          <Route path={'/sign-up-restaurant'} element={<RegisterRestaurant/>}/>
        </Routes> 
        </> :
       <Routes>
        <Route path={'/'} element={<Login/>}/>
        <Route path={'/forget-password'} element={<Forgetpassword/>}/>
        <Route path={'/sign-up-user'} element={<RegisterUser/>}/>
        <Route path={'/sign-up-restaurant'} element={<RegisterRestaurant/>}/>
      </Routes> 
      }
     
    </div>
  );
}

export default App;
