import { Link, useNavigate } from "react-router-dom";
import "./Delivery-sidebar.css";
import { useContext } from "react";
import { ActiveNavContext } from "../../../Context/ActiveNav";
import { useState, useEffect } from "react";
import { getData } from "../../../Services/Services";

const sideNavs = [
  { id: 1, path: "/admin", name: "Dashboard1", icon: "fa-house" },
  {
    id: 2,
    path: "/statistic",
    name: "Statictic",
    icon: "fa-square-poll-vertical",
  },
  {
    id: 3,
    path: "/task-list",
    name: "Tack list",
    icon: "fa-list-check",
  },
  {
    id: 4,
    path: "/services",
    name: "Services",
    icon: "fa-square-poll-vertical",
  },
  {
    id: 5,
    path: "/notification",
    name: "Notification",
    icon: "fa-bell",
  },
];
const DeliverySidebar = () => {
  const { activeHrmsDash, setActiveHrmsDash } = useContext(ActiveNavContext);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const signOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
    window.location.reload();
  };

  useEffect(() => {
    getData("/user").then((res) => {
      setUser(res);
    });
  }, []);

  return (
    <div>
      <div className="sidebar d-flex  border-secondary border-end  flex-column flex-shrink-0 p-2 ">
        <Link
          onClick={() => setActiveHrmsDash(1)}
          to="/products/hrms/admin"
          className="text-center sidebar-logo  w-100 pt-4 mt-4 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
        >
          <span className="fs-4 fw-semibold text-uppercase">Admetrics</span>
        </Link>

        <ul className="nav nav-pills mx-md-2 px-md-3 py-2 mt-5 flex-column mb-auto">
          {sideNavs.map((item) => (
            <li className="nav-item pt-1" key={item.id}>
              <Link
                to={item.path}
                onClick={() => setActiveHrmsDash(item.id)}
                className={`nav-link text-center text-md-start mx-1  px-3 py-3   text-dark ${
                  activeHrmsDash == item.id ? "bg-primary text-white " : ""
                }rounded-0`}
              >
                <i
                  className={`fa-solid fs-5  me-md-3 ${
                    activeHrmsDash == item.id ? "text-white" : "text-secondary"
                  }  text-secondary ${item.icon} `}
                ></i>
                <span>{item.name}</span>
              </Link>
            </li>
          ))}

          <li className="nav-item">
            <hr />
            <button
              className={`nav-link text-center text-md-start mx-1  px-3 py-3   text-dark`}
              onClick={signOut}
            >
              <i
                className={`fa-solid fa-arrow-right-from-bracket fs-5  text-secondary  me-md-3`}
              ></i>
              <span>Log Out</span>
            </button>
          </li>
        </ul>
        <div className="profile_  d-flex flex-column justify-content-center align-items-center">
          <img
            width={60}
            className="rounded-circle my-2"
            src={user.avatar}
            alt=""
          />
          <div className="name fw-bolder">{user.username}</div>
          <div className="mail text-secondary">{user.email}</div>
        </div>
      </div>
    </div>
  );
};

export default DeliverySidebar;
