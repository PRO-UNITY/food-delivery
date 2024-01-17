import { Route, Routes } from "react-router-dom";
import {
  AllCategories,
  AllFoods,
  AllKitchens,
  CategoryDetails,
  Dashboard,
  Favourite,
  FoodDetail,
  FoodOrder,
  HistoryDetailOrder,
  HistoryKitchen,
  KitchenCategoryDetail,
  KitchenDashboard,
  KitchenDetails,
  ManagerOrders,
  NewOrder,
  Payment,
  Settings,
  UpdateSettings,
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
    </Routes>
  );
};

export default UserRoutes;
