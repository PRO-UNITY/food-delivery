import './Demo.css'
import { NavLink, Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import { getDataWithToken, BASE_URL } from '../../functions/function';

const Sidenavs = [
    {
      id: "foods",
      name: "Favourite",
      path: "/favourite",
      active: "/favourite",
      icon: "fa-regular fa-heart",
    },
    {
      id: "deliveryman",
      name: "Order History",
      path: "/order-history",
      active: "/order-history",
      icon: "fa-solid fa-clock-rotate-left",

    },
    {
      id: "orders",
      name: "Settings",
      path: "/settings",
      active: "/settings",
      icon: "fa-solid fa-gears",
    }
];

const DemoSidebar = ({ showSidebar }) => {

    const [user, setUser] = useState(null)

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
        className={`hrms-doc-sidebar py-2
         bg-white  ${showSidebar && "show"} `}
      >
        <div className="w-100 text-center mb-5">
        <h2>Delivery</h2>
        </div>
        <div className="side-body ">
          <ul style={{listStyle:"none"}} className="px-3">
          
            
              <li className="nav-item">
                <NavLink to={'/dashboard'} className="nav-link text-start px-2" isActive={() => checkActive("/dashboard")}>
                    <p className="text-start py-3"><i className="fa-solid fa-utensils mx-3"></i> Dashboard</p>
                </NavLink>
              </li>  
              <li className="nav-item">
                <NavLink to={localStorage.getItem('token')?"/food-order":"/login"} className="nav-link text-start px-2" isActive={() => checkActive("/food-order")}>
                    <p className="text-start py-3"><i className="fa-solid fa-truck mx-3"></i> Food Order</p>
                </NavLink>
              </li>  
              <li className="nav-item">
                <NavLink to={localStorage.getItem('token')?"/favourite":"/login"} className="nav-link text-start px-2" isActive={() => checkActive("/favourite")}>
                    <p className="text-start py-3"><i className="fa-solid fa-heart mx-3"></i> Favourite</p>
                </NavLink>
              </li>  
              <li className="nav-item">
                <NavLink to={localStorage.getItem('token')?"/favourite":"/login"} className="nav-link text-start px-2" isActive={() => checkActive("/order-history")}>
                    <p className="text-start py-3"><i className="fa-solid fa-clock-rotate-left mx-3"></i> Order History</p>
                </NavLink>
              </li>  
              <li className="nav-item">
                <NavLink to={localStorage.getItem('token')?"/favourite":"/login"} className="nav-link text-start px-2" isActive={() => checkActive("/settings")}>
                    <p className="text-start py-3"><i className="fa-solid fa-gears mx-3"></i> Settings</p>
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
        </div>
      </div>
    </>
  );
};

export default DemoSidebar;
