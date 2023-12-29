import { useEffect, useState } from "react";
import "./Demo.css";
import { BASE_URL, getUserData } from "../../functions/function";
import { Link, useNavigate } from "react-router-dom";
import User from "../../assets/images/user.png";

const Profile = ({ showProfile, counter }) => {
  const [user, setUser] = useState(null);
  const [card, setCard] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const cardData = JSON.parse(localStorage.getItem("card"));

  useEffect(() => {
    getUserData("/user").then((res) => {
      setUser(res);
    });
  }, []);

  const logOut = () => {
    localStorage.clear();
    navigate("/dashboard");
    window.location.reload()
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("card"));
    setCard(data);
  }, [counter]);

  return (
    <div className={`bg-white pt-4 px-4 profile  ${showProfile && "show"}`}>
      <div className="d-flex justify-content-end align-items-center mb-4">
        {!token ? (
          <div className="d-flex gap-1">
            {/* <Link to={'/register'} className='btn-sign-in bg-orange'>Sign-up</Link> */}
            <Link to={"/login"} className="btn-sign-in bg-orange">
              Sign-in
            </Link>
          </div>
        ) : (
          <div className="d-flex gap-2 align-items-center">
            <Link to={"/settings"} className="btn-none ">
              <img
                style={{
                  width: "50px",
                  height: "50px",
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
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

      {/* <p className="text-secondary">Lorem ipsum dolor, sit amet dolor consectetur adipisicing elit.</p> */}
      {token ? (
        <>
          <h6 className="text-secondary">Your Address</h6>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <p style={{ fontWeight: "700" }} className="p-0 m-0">
              <i className="fa-solid fa-location-dot orange"></i> Elm Street, 23
            </p>
          </div>
          <hr />
          {cardData?.length > 0 ? (
            <>
              <h5 style={{ fontWeight: 700 }} className="mb-3">
                Order Menu
              </h5>
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
                          <p style={{ fontWeight: "bold" }} className="m-0 p-0">
                            {item?.name}
                          </p>
                        </div>
                      </div>
                      <p
                        style={{ fontWeight: "bold" }}
                        className="mx-2 m-0 p-0"
                      >
                        +
                        <span className="orange">
                          {item?.totalPrice ? item?.totalPrice : item?.price}
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <hr />
              <div className="d-flex justify-content-between align-items-center">
                <p style={{ fontSize: "10px" }}>service</p>
                <p style={{ fontWeight: "bold" }} className="mx-2">
                  +<span className="orange">$</span>1
                </p>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <p>Total</p>
                <p style={{ fontWeight: "bold" }} className="mx-2">
                  <span className="orange">$</span>
                </p>
              </div>
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
