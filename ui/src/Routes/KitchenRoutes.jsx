import { Route, Routes } from "react-router-dom";
import {
  AddManagerToKitchen,
  AddSupplier,
  CategoryHome,
  DeliveryAdd,
  FoodAdd,
  FoodHome,
  FoodUpdate,
  HistoryDetailOrder,
  HistoryKitchen,
  KitchenDeliveryDetails,
  KitchenDeliveryHome,
  KitchenFoodDetails,
  KitchenManagerDetails,
  KitchenManagerHome,
  ManagerAdd,
  RestaurantAdd,
  RestaurantDetails,
  RestaurantHome,
  RestaurantUpdate,
} from "../pages";
import OrderHistory from "../pages/User/OrderHistory";

const KitchenRoutes = () => {
  const roleuser = localStorage.getItem("role");
  return (
    <Routes>
      <Route path="/restaurant" element={<RestaurantHome />}>
        <Route path="add" element={<RestaurantAdd />} />
        <Route path=":id" element={<RestaurantDetails />} />
        <Route path=":id/edit" element={<RestaurantUpdate />} />
        <Route path=":id/add-supplier" element={<AddSupplier />} />
        <Route path=":id/add-manager" element={<AddManagerToKitchen />} />
      </Route>

      <Route
        path="/history"
        element={roleuser === "kitchen" ? <HistoryKitchen /> : <OrderHistory />}
      >
        <Route path=":id" element={<HistoryDetailOrder />} />
      </Route>

      <Route path="/categories" element={<CategoryHome />} />

      <Route path="foods" element={<FoodHome />}>
        <Route path="add" element={<FoodAdd />} />
        <Route path=":id" element={<KitchenFoodDetails />} />
        <Route path=":id/edit" element={<FoodUpdate />} />
      </Route>

      <Route path="/deliveries" element={<KitchenDeliveryHome />}>
        <Route path="add" element={<DeliveryAdd />} />
        <Route path=":id" element={<KitchenDeliveryDetails />} />
      </Route>

      <Route path="/managers" element={<KitchenManagerHome />}>
        <Route path="add" element={<ManagerAdd />} />
        <Route path=":id" element={<KitchenManagerDetails />} />
      </Route>
    </Routes>
  );
};

export default KitchenRoutes;
