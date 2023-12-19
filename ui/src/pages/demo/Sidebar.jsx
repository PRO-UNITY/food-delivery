import './Demo.css'
import { NavLink } from "react-router-dom";

const Sidenavs = [
    {
      id: "users",
      name: "Dashboard",
      path: "/dashboard",
      active: "/dashboard",
      icon : "fa-solid fa-utensils"
    },
    {
      id: "kitchen",
      name: "Food order",
      path: "/food-order",
      active: "/food-order",
      icon: "fa-solid fa-truck",
    },
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

// eslint-disable-next-line react/prop-types
const DemoSidebar = ({ showSidebar }) => {

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
          {
            Sidenavs.map(item=>
              <li className="nav-item" key={item.id}>
                <NavLink to={item.path} className="nav-link text-start px-2" isActive={() => checkActive(item.active)}>
                    <p className="text-start py-3"><i className={`${item.icon} mx-3 `}></i> {item.name}</p>
                </NavLink>
              </li>  
            )
          }
          </ul>
        </div>
      </div>
    </>
  );
};

export default DemoSidebar;
