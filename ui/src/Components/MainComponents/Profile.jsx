import "../../pages/Demo.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getData } from "../../Services/Services";
import User from "../../assets/images/user.png";

const Profile = ({ showProfile, counter }) => {
  const [user, setUser] = useState(null);
  const [card, setCard] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const cardData = JSON.parse(localStorage.getItem("card"));

  useEffect(() => {
    getData("/user").then((res) => {
      setUser(res);
    });
  }, []);

  const logOut = () => {
    localStorage.clear();
    navigate("/login");
    window.location.reload();
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("card"));
    setCard(data);
  }, [counter]);

  return (
    <div className={`bg-white pt-4 px-4 profile  ${showProfile && "show"}`}>
      <div className="d-flex justify-content-start align-items-center mb-4">
        {role==="undefined" || !role ? (
          <div className="d-flex gap-1">
            <Link to={"/login"} className="btn-sign-in bg-orange">
              Sign-in
            </Link>
          </div>
        ) : (
          <div className="d-flex gap-2 align-items-center">
            <Link to={"/settings"} className="btn-none ">
              <img
                className="user-img"
                src={`${user?.avatar ? user?.avatar : User}`}
                alt=""
              />
            </Link>
            <button onClick={logOut} className="btn btn-outline-danger">
              Log-out
            </button>
          </div>
        )}
      </div>

      {token ? (
        <>
          <h6 className="text-secondary">Your Address</h6>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <p className="address">
              <i className="fa-solid fa-location-dot text-orange"></i> Elm
              Street, 23
            </p>
          </div>
          <hr />
          {cardData?.length > 0 ? (
            <>
              <h5 className="mb-3">Order Menu</h5>
              <div className="orders">
                {card?.map((item, index) => (
                  <div key={index}>
                    <div className="card-order d-flex align-items-center justify-content-between mb-3">
                      <div className="d-flex gap-2">
                        <img
                          style={{ width: "50px", height: "50px" }}
                          src={`${item?.food_img}`}
                          alt=""
                        />
                        <div className="d-flex align-items-center">
                          <p className="name-order">{item?.name}</p>
                        </div>
                      </div>
                      <p className="mx-2 name-order">
                        +
                        <span className="text-orange">
                          {item?.totalPrice ? item?.totalPrice : item?.price}
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <hr />

              <Link to={"/food-order"}>
                <button className="btn-checkout">Checkout</button>
              </Link>
            </>
          ) : (
            ""
          )}
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default Profile;
