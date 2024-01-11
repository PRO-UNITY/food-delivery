import "../../Demo.css";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import CreateEmployee from "../../../Components/SubComponents/CreateEmpleyee";
import { AddWithFormData } from "../../../Services/Services";

const ManagerAdd = () => {
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
    <div className="card w-100">
      <div className="card-header text-light">
        <h3>Add Manager</h3>
      </div>
      <CreateEmployee
        usernameRef={usernameRef}
        firstnameRef={firstnameRef}
        lastnameRef={lastnameRef}
        emailRef={emailRef}
        passwordRef={passwordRef}
        passwordRef2={passwordRef2}
        phoneRef={phoneRef}
        longitudeRef={longitudeRef}
        latitudeRef={latitudeRef}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default ManagerAdd;
