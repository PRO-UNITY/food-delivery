import "../../Demo.css";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import DemoLayout from "../../../Layout/Demoproject";
import { AddWithFormData } from "../../../Services/Services";

const DeliveryAdd = () => {
  const [search, setSearch] = useState("");
  const usernameRef = useRef();
  const firstnameRef = useRef(null);
  const lastnameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const passwordRef2 = useRef(null);
  const phoneRef = useRef(null);
  const latitudeRef = useRef(null);
  const longitudeRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("first_name", firstnameRef.current.value);
    formData.append("last_name", lastnameRef.current.value);
    formData.append("username", usernameRef.current.value);
    formData.append("password", passwordRef.current.value);
    formData.append("confirm_password", passwordRef2.current.value);
    formData.append("email", emailRef.current.value);
    formData.append("phone", phoneRef.current.value);
    formData.append("latitude", latitudeRef.current.value);
    formData.append("longitude", longitudeRef.current.value);

    AddWithFormData("/deliveryman/", formData).then(() =>
      navigate("/deliveries")
    );
  };

  return (
      <>
        <div className="card w-100">
          <div className="card-header text-light">
            <h3>Add Supplier</h3>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <input
                ref={firstnameRef}
                type="text"
                placeholder="firstname"
                className="form-control mb-2"
              />
              <input
                ref={lastnameRef}
                type="text"
                placeholder="lastname"
                className="form-control mb-2"
              />
              <input
                ref={usernameRef}
                type="text"
                placeholder="username"
                className="form-control mb-2"
              />
              <input
                ref={emailRef}
                type="email"
                placeholder="email"
                className="form-control mb-2"
              />
              <input
                ref={phoneRef}
                type="text"
                placeholder="phone"
                className="form-control mb-2"
              />
              <input
                ref={latitudeRef}
                type="text"
                placeholder="latitude"
                className="form-control mb-2"
              />
              <input
                ref={longitudeRef}
                type="text"
                placeholder="longitude"
                className="form-control mb-2"
              />
              <input
                ref={passwordRef}
                type="text"
                placeholder="password"
                className="form-control mb-2"
              />
              <input
                ref={passwordRef2}
                type="text"
                placeholder="confirm password"
                className="form-control mb-2"
              />
              <button type="submit" className="btn-orange">
                create
              </button>
            </form>
          </div>
        </div>
      </>
  );
};

export default DeliveryAdd;
