import { Route, Routes } from "react-router-dom";
import { ActiveOrders, NewOrder, NewOrderDetail, OrderHistoryDeliver } from "../pages";

const DeliveryRoutes = () => {
  const roleuser = localStorage.getItem("role");
  return (
    <Routes>
      <Route path="/order-history" element={<OrderHistoryDeliver/>}/>
      <Route path="/new-order-detail/:id" element={<NewOrderDetail/>}/>
      <Route path="/active-order" element={<ActiveOrders/>}/>
    </Routes>
  );
};

export default DeliveryRoutes;
