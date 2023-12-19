import { Link ,Outlet} from "react-router-dom"
import { getRoleUser } from "../functions";
import { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom';

const Sidebar = () => {

    const [role, setRole] = useState('')

    useEffect(() => {
      const fetchRole = async () => {
          const role = await getRoleUser();
          setRole(role);
      };
      fetchRole();
  }, []);

  const checkActive = (match, location) => {
    const { pathname } = location;
  
    return pathname === match;
  };

    return (
      <>
      <div className="d-flex justify-content-start align-items-center w-100 sidebar">
        <div className="d-flex flex-column flex-shrink-0 p-3 bg-light vh-100" style={{ width: "280px" }}>
          <ul className="nav nav-pills flex-column mb-auto">
            
              <NavLink to="/home/main" className="nav-link text-start d-flex justify-content-between" isActive={() => checkActive("/home/main")}>
                <p className="p-0 m-0">
                {
                  role === "admins" ? "Restaurants" :
                    role === "kitchen" ? "Restaurants" :
                      role === "users" ? "Restaurants" : 
                        role === "delivery" ? "New order":
                        role === "manager" ? "New order": ""
                }
                </p>
                {
                  role === "delivery" ? <p className="p-0 m-0">1</p>: ""
                }
              </NavLink>
              
            {
              role === "kitchen" ?<li className="nav-item">
              <NavLink to="/home/category" className="nav-link text-start" isActive={() => checkActive("/home/category")}>
                Category
              </NavLink>
            </li>:""
            }
            {
              role === "users" ?<li className="nav-item">
              <NavLink to="/home/card" className="nav-link text-start" isActive={() => checkActive("/home/card")}>
                Card
              </NavLink>
            </li>:""
            }
            {
              role === "users" ?<li className="nav-item">
              <NavLink to="/home/history-order" className="nav-link text-start" isActive={() => checkActive("/home/history-order")}>
                History Orders
              </NavLink>
            </li>:""
            }
            {
              role === "users" ?<li className="nav-item">
              <NavLink to="/home/my-order" className="nav-link text-start" isActive={() => checkActive("/home/my-order")}>
                My Orders
              </NavLink>
            </li>:""
            }
            {
              role === "kitchen" ?<li className="nav-item">
              <NavLink to="/home/foods" className="nav-link text-start" isActive={() => checkActive("/home/foods")}>
                Foods
              </NavLink>
            </li>:""
            }
            {
              role === "kitchen" ?<li className="nav-item">
              <NavLink to="/home/manager" className="nav-link text-start" isActive={() => checkActive("/home/manager")}>
                Managers
              </NavLink>
            </li>:""
            }
            {
              role === "kitchen" ?<li className="nav-item">
              <NavLink to="/home/delivery" className="nav-link text-start" isActive={() => checkActive("/home/delivery")}>
                Delivery
              </NavLink>
            </li>:""
            }
            {
              role === "delivery" ?<li className="nav-item">
              <NavLink to="/home/delivery-history" className="nav-link text-start" isActive={() => checkActive("/home/delivery")}>
                Active Orders
              </NavLink>
            </li>:""
            }
          </ul>
        </div>
        <div className="w-100">
          <Outlet />
        </div>
      </div>
      </>  
    )
}

export default Sidebar