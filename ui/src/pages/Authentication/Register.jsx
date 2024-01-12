import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postData } from "../../Services/Services";

const Register = () => {
  const [firstname, setFirstname] = useState("");
  const [username, setUsername] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState({
    text: "",
    type: "",
  });

  const handleSignUpRestaurant = async (e) => {
    e.preventDefault();
    const user = {
      first_name: firstname,
      last_name: lastname,
      username: username,
      email: email,
      role: role,
      password: password,
      confirm_password: password2,
    };
    const res = await postData(user, "/auth/signup");
    if (res && res.token) {
      setAlertMessage({
        text: `Registration successfully`,
        type: "success",
      });
      setTimeout(() => {
        setAlertMessage("");
        navigate("/login");
      }, 2000);
    } else {
      if (res && typeof res === "object" && Object.keys(res).length > 0) {
        const errorMessage = Object.keys(res)
          .map((field) =>
            Array.isArray(res[field])
              ? res[field].map((error) => `${field}: ${error}`).join(", ")
              : `${field}: ${res[field]}`
          )
          .join(", ");

        setAlertMessage({
          text: `Error during registration: ${errorMessage}`,
          type: "danger",
        });
      }
    }
  };

  return (
    <div className="container w-100 d-flex flex-column justify-content-center align-items-center py-5">
      {alertMessage && (
        <div
          className={`alert alert-${alertMessage.type} w-50 m-auto my-3`}
          role="alert"
        >
          {alertMessage.text}
        </div>
      )}
      <div className="card shadow">
        <div className="card-header bg-warning">
          <h3>Register</h3>
        </div>

        <div className="card-body">
          <form onSubmit={handleSignUpRestaurant}>
            <div className="w-100 d-flex justify-content-between gap-2 mb-3">
              <div className="w-50">
                <label htmlFor="">Firstname</label>
                <input
                  onChange={(e) => setFirstname(e.target.value)}
                  required
                  placeholder="Andrey"
                  className="w-100 form-control"
                  type="text"
                />
              </div>
              <div className="w-50">
                <label htmlFor="">Lastname</label>
                <input
                  onChange={(e) => setLastname(e.target.value)}
                  required
                  placeholder="Molodsov"
                  className="w-100 form-control"
                  type="text"
                />
              </div>
            </div>
            <div className="w-100 d-flex justify-content-between gap-2 mb-3">
              <div className="w-50">
                <label htmlFor="">Email</label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="example@gmail.com"
                  className="w-100 form-control"
                  type="email"
                />
              </div>
              <div className="w-50">
                <label htmlFor="">Username</label>
                <input
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  placeholder="Andrey1"
                  className="w-100 form-control"
                  type="text"
                />
              </div>
            </div>
            <div className="w-100 d-flex justify-content-between gap-2 ">
              <div className="w-50">
                <label htmlFor="">Password</label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="********"
                  className="w-100 form-control"
                  type="text"
                />
              </div>
              <div className="w-50">
                <label htmlFor="">Confirm_password</label>
                <input
                  onChange={(e) => setPassword2(e.target.value)}
                  required
                  placeholder="********"
                  className="w-100 form-control"
                  type="text"
                />
              </div>
            </div>
            <div className="w-100 d-flex justify-content-between gap-2 ">
              <div className="w-100">
                <label htmlFor="">Role</label>
                <select
                  onChange={(e) => setRole(e.target.value)}
                  className="form-select form-select-lg mb-3"
                  aria-label=".form-select-lg example"
                >
                  <option hidden className="form-control" value=""></option>
                  <option className="form-control" value="users">
                    Users
                  </option>
                  <option className="form-control" value="admins">
                    Admin
                  </option>
                  <option className="form-control" value="kitchen">
                    Kitchen
                  </option>
                  <option className="form-control" value="delivery">
                    Delivery
                  </option>
                  <option className="form-control" value="manager">
                    Manager
                  </option>
                </select>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex gap-2 align-items-center">
                <p className="p-0 m-0">have you an account</p>
                <Link to={"/login"} className="my-2 " type="button">
                  Login
                </Link>
              </div>
              <button className="btn btn-warning float-end my-2">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
