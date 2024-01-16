import { Route, Routes } from "react-router-dom";
import { NewOrder, OrderHistoryDeliver } from "../pages";

const DeliveryRoutes = () => {
  const roleuser = localStorage.getItem("role");
  return (
    <Routes>
      <Route path="/order-history" element={<OrderHistoryDeliver/>}/>
    </Routes>
  );
};

export default DeliveryRoutes;
