import { useState } from "react";
import DemoLayout from "../../../Layout/Demoproject";
import { AddWithFormData } from "../../../Functions/Function";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../../Demo.css";

const ManagerAdd = () => {
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

    AddWithFormData("/managers", formData).then(() => navigate("/managers"));
  };

  return (
    <DemoLayout setSearch={setSearch}>
      <div className="body-main w-100 p-5">
        <div className="card w-100">
          <div
            style={{ background: "#F8B602" }}
            className="card-header  text-light"
          >
            <h3>Add Manager</h3>
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
      </div>
    </DemoLayout>
  );
};

export default ManagerAdd;
