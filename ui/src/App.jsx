import { Route, Routes } from "react-router-dom"
import { Dashboard } from "./pages"
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={ <Dashboard/> } />
        <Route path="/dashboard" element={ <Dashboard/> } />
        <Route path="/food-order" element={ <Dashboard/> } />
      </Routes>
    </>
  )
}

export default App
