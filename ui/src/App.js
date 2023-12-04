import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar';
import Login from './Pages/Login/Login';
import RegisterUser from './Pages/Register/RegisterUser/RegisterUser';
import RegisterRestaurant from './Pages/Register/RegisterRestaurant/RegisterRestaurant';
import AdminHome from './Pages/adminHome/AdminHome';
import { getRole } from './functions';
import { useEffect } from 'react';
import Sidebar from './Components/Sidebar';

function App() {

  // useEffect(()=>{
  //   getRole()
  //   .then((res)=>console.log(res))
  // },[])


  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path={'/home'} element={<Sidebar/>}>
          <Route path={'/home/main'} element={<AdminHome/>}/>
        </Route>
        <Route path={'/'} element={<Login/>}/>
        <Route path={'/sign-up-user'} element={<RegisterUser/>}/>
        <Route path={'/sign-up-restaurant'} element={<RegisterRestaurant/>}/>

        
      </Routes>
    </div>
  );
}

export default App;
