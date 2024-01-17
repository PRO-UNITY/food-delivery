import { Route, Routes } from "react-router-dom";
import {
  AllCategories,
  AllFoods,
  AllKitchens,
  CategoryDetails,
  Dashboard,
  Deliveryman,
  Favourite,
  FoodDetail,
  FoodOrder,
  Foods,
  HistoryDetailOrder,
  HistoryKitchen,
  Home,
  Kitchen,
  KitchenCategoryDetail,
  KitchenDashboard,
  KitchenDetails,
  Manager,
  ManagerOrders,
  NewOrder,
  Orders,
  Payment,
  Settings,
  UpdateSettings,
  Users,
} from "../pages";

const UserRoutes = () => {
  const roleuser = localStorage.getItem("role");
  return (
    <Routes>
      <Route
        path="/dashboard"
        element={
          roleuser === "kitchen" ? (
            <KitchenDashboard />
          ) : roleuser === "delivery" ? (
            <NewOrder />
          ) : roleuser === "users" ? (
            <Dashboard />
          ) : roleuser === "manager" ? (
            <ManagerOrders />
          ) : (
            <Dashboard />
          )
        }
      />
      <Route path="/allfoods" element={<AllFoods />} />
      <Route path="/allcategories" element={<AllCategories />} />
      <Route path="/allkitchens" element={<AllKitchens />} />
      <Route path="/food-order" element={<FoodOrder />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/favourite" element={<Favourite />} />
      <Route path="/food-detail/:id" element={<FoodDetail />} />
      <Route path="/settings" element={<Settings />}>
        <Route path="update" element={<UpdateSettings />} />
      </Route>
      <Route path="/category/:id" element={<CategoryDetails />} />
      <Route path="/kitchen/:id" element={<KitchenDetails />} />
      <Route
        path="/kitchen/category/:category_id/food/:kitchen_id"
        element={<KitchenCategoryDetail />}
      />
      {/* <Route path="*" element={<Pagenotfound/>} /> */}
      <Route path={"/doc"} element={<Home />} />
      <Route path="/doc/kitchen" element={<Kitchen />} />
      <Route path="/doc/foods" element={<Foods />} />
      <Route path="/doc/deliveryman" element={<Deliveryman />} />
      <Route path="/doc/manager" element={<Manager />} />
      <Route path="/doc/orders" element={<Orders />} />
      <Route path="/doc/users" element={<Users />} />
    </Routes>
  );
};

export default UserRoutes;
