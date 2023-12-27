import './Demo.css'
import { NavLink, Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import { getDataWithToken, BASE_URL } from '../../functions/function';

const DemoSidebar = ({ showSidebar }) => {

    const [user, setUser] = useState(null)
    const role = localStorage.getItem('role')

    useEffect(()=>{
        getDataWithToken('/user').
        then((res)=>setUser(res))
    },[])

  const checkActive = (match, location) => {
    const { pathname } = location;
  
    return pathname === match;
  };

  return (
    <>
      <div
        className={`hrms-doc-sidebar py-4
         bg-white  ${showSidebar && "show"} `}
      >
        <div className="w-100 text-center mb-5">
        <h2>delivery</h2>
        </div>
        <div className="side-body">
          <ul style={{listStyle:"none"}} className="px-3">
              
              <li className="nav-item">
              {
                role === 'kitchen'?
                <NavLink to={'/dashboard'} className="nav-link text-start px-2" isActive={() => checkActive("/dashboard")}>
                  <p className="text-start py-3 "><i className="fa-solid fa-utensils mx-3"></i>Restaurants</p>
              </NavLink>:
              <NavLink to={'/dashboard'} className="nav-link text-start px-2" isActive={() => checkActive("/dashboard")}>
                  <p className="text-start py-3 "><i className="fa-solid fa-utensils mx-3"></i>Dashboard</p>
              </NavLink>
              }
              </li>
              
              <li className="nav-item">
                {
                  role === "kitchen"?
                  <NavLink to={"/categories"} className="nav-link text-start px-2" isActive={() => checkActive("/categories")}>
                    <p className="text-start py-3"><i className="fa-solid fa-list mx-3"></i>Categories</p>
                  </NavLink>:
                  <NavLink to={"/food-order"} className="nav-link text-start px-2" isActive={() => checkActive("/food-order")}>
                    <p className="text-start py-3"><i className="fa-solid fa-truck mx-3"></i>Food Order</p>
                    { JSON.parse(localStorage.getItem('card'))?.length > 0 ? <div className='notification'>{JSON.parse(localStorage.getItem('card'))?.length}</div> : "" }
                  </NavLink>
                }
                
              </li>  
              <li className="nav-item"> 
                {
                  role === "kitchen"?
                  <NavLink to={"/foods"} className="nav-link text-start px-2" isActive={() => checkActive("/foods")}>
                    <p className="text-start py-3"><i className="fa-solid fa-bowl-rice mx-3"></i>Foods</p>
                  </NavLink>:
                  <NavLink to={"/favourite"} className="nav-link text-start px-2" isActive={() => checkActive("/favourite")}>
                  <p className="text-start py-3"><i className="fa-solid fa-heart mx-3"></i>Favourite</p>
                  </NavLink>
                }
                
              </li>  
              <li className="nav-item">
                {
                  role === "kitchen"?
                  <NavLink to={"/deliveries"} className="nav-link text-start px-2" isActive={() => checkActive("/deliveries")}>
                    <p className="text-start py-3"><i className="fa-solid fa-truck mx-3"></i>Deliveries</p>
                  </NavLink>:
                  <NavLink to={"/order-history"} className="nav-link text-start px-2" isActive={() => checkActive("/order-history")}>
                  <p className="text-start py-3"><i className="fa-solid fa-clock-rotate-left mx-3"></i>Order History</p>
                  </NavLink>
                }
              </li> 
              {
                role === "kitchen"?
                  <NavLink to={"/managers"} className="nav-link text-start px-2" isActive={() => checkActive("/managers")}>
                    <p className="text-start py-3"><i className="fa-solid fa-user mx-3"></i>Managers</p>
                  </NavLink>:""
              } 
              <li className="nav-item">
                <NavLink to={"/settings"} className="nav-link text-start px-2" isActive={() => checkActive("/settings")}>
                    <p className="text-start py-3"><i className="fa-solid fa-user mx-3"></i> Settings</p>
                </NavLink>
              </li>  
          {
            user?.avatar ?
            <button className="btn-none sidebar-btns">
                <img style={{width:"50px", height:"50px", objectFit:"cover", borderRadius:"20%"}} src={`${user?.avatar ? BASE_URL+user.avatar : "https://plus.unsplash.com/premium_photo-1683121366070-5ceb7e007a97?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"}`} alt="" />
            </button> :
            <div className="sidebar-btns">
                <Link to={'/register'} className='btn btn-outline-warning'>Sign-up</Link>
                <Link to={'/login'} className='btn btn-warning'>Sign-in</Link>
            </div>
            } 
          </ul>
          <div className="px-3 pt-3">
          <div className='bg-orange w-100 sidebar-vaucher d-flex flex-column justify-content-center align-items-start px-3'>
            <p className='p-0 m-0 mb-2'>Upgrade your <br /> Account to Get Free <br /> Vaucher</p>
            {/* <button className='btn-vaucher'>Upgrade</button> */}
          </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DemoSidebar;
