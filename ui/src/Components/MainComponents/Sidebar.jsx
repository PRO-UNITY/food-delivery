import "../../pages/Demo.css";
import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { getData, BASE_URL } from "../../Services/Services";

const DemoSidebar = ({ showSidebar }) => {
  const [user, setUser] = useState(null);
  const role = localStorage.getItem("role");

  useEffect(() => {
    getData("/user").then((res) => setUser(res));
  }, []);

  const checkActive = (match, location) => {
    const { pathname } = location;

    return pathname === match;
  };

  return (
    <>
      <div
        className={`delivery-sidebar py-4
         bg-white  ${showSidebar && "show"} `}
      >
        <div className="w-100 text-center mb-5">
          <h2>delivery</h2>
        </div>
        <div className="side-body">
          <ul style={{ listStyle: "none" }} className="px-3">
            <li className="nav-item">
              {role === "kitchen" ? (
                <NavLink
                  to={"/restaurant"}
                  className="nav-link text-start px-2"
                  isActive={() => checkActive("/restaurant")}
                >
                  <p className="text-start py-3 ">
                    <i className="fa-solid fa-utensils mx-3"></i>Restaurants
                  </p>
                </NavLink>
              ) : role === "users" ? (
                <NavLink
                  to={"/dashboard"}
                  className="nav-link text-start px-2"
                  isActive={() => checkActive("/dashboard")}
                >
                  <p className="text-start py-3 ">
                    <i className="fa-solid fa-utensils mx-3"></i>Dashboard
                  </p>
                </NavLink>
              ) : role === "delivery" ? (
                <NavLink
                  to={"/dashboard"}
                  className="nav-link text-start px-2"
                  isActive={() => checkActive("/dashboard")}
                >
                  <p className="text-start py-3 ">
                    <i className="fa-solid fa-utensils mx-3"></i>New orders
                  </p>
                  {/* <div className="notification">1</div> */}
                </NavLink>
              ) : role === "manager" ? (
                <NavLink
                  to={"/dashboard"}
                  className="nav-link text-start px-2"
                  isActive={() => checkActive("/dashboard")}
                >
                  <p className="text-start py-3 ">
                    <i className="fa-solid fa-utensils mx-3"></i>New orders
                  </p>
                </NavLink>
              ) : (
                <NavLink
                  to={"/dashboard"}
                  className="nav-link text-start px-2"
                  isActive={() => checkActive("/dashboard")}
                >
                  <p className="text-start py-3 ">
                    <i className="fa-solid fa-utensils mx-3"></i>Dashboard
                  </p>
                </NavLink>
              )}
            </li>

            <li className="nav-item">
              {role === "kitchen" ? (
                <NavLink
                  to={"/categories"}
                  className="nav-link text-start px-2"
                  isActive={() => checkActive("/categories")}
                >
                  <p className="text-start py-3">
                    <i className="fa-solid fa-list mx-3"></i>Categories
                  </p>
                </NavLink>
              ) : role === "users" ? (
                <NavLink
                  to={"/food-order"}
                  className="nav-link text-start px-2"
                  isActive={() => checkActive("/food-order")}
                >
                  <p className="text-start py-3">
                    <i className="fa-solid fa-truck mx-3"></i>Food Order
                  </p>
                  {JSON.parse(localStorage.getItem("card"))?.length > 0 ? (
                    <div className="notification">
                      {JSON.parse(localStorage.getItem("card"))?.length}
                    </div>
                  ) : (
                    ""
                  )}
                </NavLink>
              ) : role === "delivery" ? (
                <NavLink
                  to={"/order-history"}
                  className="nav-link text-start px-2"
                  isActive={() => checkActive("/order-history")}
                >
                  <p className="text-start py-3">
                    <i className="fa-solid fa-list mx-3"></i>Order History
                  </p>
                </NavLink>
              ) : role === "manager" ? (
                ""
              ) : (
                <NavLink
                  to={"/food-order"}
                  className="nav-link text-start px-2"
                  isActive={() => checkActive("/food-order")}
                >
                  <p className="text-start py-3">
                    <i className="fa-solid fa-truck mx-3"></i>Food Order
                  </p>
                  {JSON.parse(localStorage.getItem("card"))?.length > 0 ? (
                    <div className="notification">
                      {JSON.parse(localStorage.getItem("card"))?.length}
                    </div>
                  ) : (
                    ""
                  )}
                </NavLink>
              )}
            </li>

            <li className="nav-item">
              {role === "kitchen" ? (
                <NavLink
                  to={"/foods"}
                  className="nav-link text-start px-2"
                  isActive={() => checkActive("/foods")}
                >
                  <p className="text-start py-3">
                    <i className="fa-solid fa-bowl-rice mx-3"></i>Foods
                  </p>
                </NavLink>
              ) : role === "users" ? (
                <NavLink
                  to={"/favourite"}
                  className="nav-link text-start px-2"
                  isActive={() => checkActive("/favourite")}
                >
                  <p className="text-start py-3">
                    <i className="fa-solid fa-heart mx-3"></i>Favourite
                  </p>
                </NavLink>
              ) : role === "delivery" ? (
                <NavLink
                  to={"/active-order"}
                  className="nav-link text-start px-2"
                  isActive={() => checkActive("/active-order")}
                >
                  <p className="text-start py-3">
                    <i className="fa-solid fa-clock-rotate-left mx-3"></i>Active
                    orders
                  </p>
                </NavLink>
              ) : role === "manager" ? (
                <NavLink
                  to={"/history-manager"}
                  className="nav-link text-start px-2"
                  isActive={() => checkActive("/history-manager")}
                >
                  <p className="text-start py-3">
                    <i className="fa-solid fa-heart mx-3"></i>History
                  </p>
                </NavLink>
              ) : (
                <NavLink
                  to={"/favourite"}
                  className="nav-link text-start px-2"
                  isActive={() => checkActive("/favourite")}
                >
                  <p className="text-start py-3">
                    <i className="fa-solid fa-heart mx-3"></i>Favourite
                  </p>
                </NavLink>
              )}
            </li>

            <li className="nav-item">
              {role === "kitchen" ? (
                <NavLink
                  to={"/deliveries"}
                  className="nav-link text-start px-2"
                  isActive={() => checkActive("/deliveries")}
                >
                  <p className="text-start py-3">
                    <i className="fa-solid fa-truck mx-3"></i>Deliveries
                  </p>
                </NavLink>
              ) : role === "users" ? (
                <NavLink
                  to={"/history"}
                  className="nav-link text-start px-2"
                  isActive={() => checkActive("/history")}
                >
                  <p className="text-start py-3">
                    <i className="fa-solid fa-clock-rotate-left mx-3"></i>Order
                    History
                  </p>
                </NavLink>
              ) : role === "delivery" ? (
                ""
              ) : role === "manager" ? (
                ""
              ) : (
                <NavLink
                  to={"/history"}
                  className="nav-link text-start px-2"
                  isActive={() => checkActive("/history")}
                >
                  <p className="text-start py-3">
                    <i className="fa-solid fa-clock-rotate-left mx-3"></i>Order
                    History
                  </p>
                </NavLink>
              )}
            </li>

            {role === "kitchen" ? (
              <li className="nav-item">
                <NavLink
                  to={"/managers"}
                  className="nav-link text-start px-2"
                  isActive={() => checkActive("/managers")}
                >
                  <p className="text-start py-3">
                    <i className="fa-solid fa-user mx-3"></i>Managers
                  </p>
                </NavLink>
              </li>
            ) : (
              ""
            )}
            {role === "kitchen" ? (
              <li className="nav-item">
                <NavLink
                  to={"/history"}
                  className="nav-link text-start px-2"
                  isActive={() => checkActive("/history")}
                >
                  <p className="text-start py-3">
                    <i className="fa-solid fa-clock-rotate-left mx-3"></i>order
                    history
                  </p>
                </NavLink>
              </li>
            ) : (
              ""
            )}
            <li className="nav-item">
              {role === "kitchen" ? (
                <NavLink
                  to={"/settings"}
                  className="nav-link text-start px-2"
                  isActive={() => checkActive("/settings")}
                >
                  <p className="text-start py-3">
                    <i className="fa-regular fa-address-card mx-3"></i> Settings
                  </p>
                </NavLink>
              ) : role === "users" ? (
                <NavLink
                  to={"/settings"}
                  className="nav-link text-start px-2"
                  isActive={() => checkActive("/settings")}
                >
                  <p className="text-start py-3">
                    <i className="fa-regular fa-address-card mx-3"></i> Settings
                  </p>
                </NavLink>
              ) : (
                <NavLink
                  to={"/settings"}
                  className="nav-link text-start px-2"
                  isActive={() => checkActive("/settings")}
                >
                  <p className="text-start py-3">
                    <i className="fa-regular fa-address-card mx-3"></i> Settings
                  </p>
                </NavLink>
              )}
            </li>
          </ul>
          {role === "users" ? (
            <div className="px-3 pt-3">
              <div className="bg-orange w-100 sidebar-vaucher d-flex flex-column justify-content-center align-items-start px-3">
                <p className="p-0 m-0 mb-2">
                  Upgrade your <br /> Account to Get Free <br /> Vaucher
                </p>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default DemoSidebar;
