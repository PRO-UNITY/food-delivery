import { Route, Routes } from "react-router-dom"
import { Dashboard, Favourite, FoodOrder, Login, Register, Settings } from "./pages"
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
        <Route path="/register" element={ <Register/> } />
        <Route path="/login" element={ <Login/> } />
      </Routes>
    </>
  )
}

export default App
