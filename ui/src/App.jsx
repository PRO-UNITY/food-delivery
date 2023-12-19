import { Route, Routes } from "react-router-dom"
import { Dashboard, Favourite, FoodOrder, Settings } from "./pages"
import 'bootstrap/dist/css/bootstrap.min.css';
import OrderHistory from "./pages/demo/List/OrderHistory";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={ <Dashboard/> } />
        <Route path="/dashboard" element={ <Dashboard/> } />
        <Route path="/food-order" element={ <FoodOrder/> } />
        <Route path="/favourite" element={ <Favourite/> } />
        <Route path="/order-history" element={ <OrderHistory/> } />
        <Route path="/settings" element={ <Settings/> } />
      </Routes>
    </>
  )
}

export default App
