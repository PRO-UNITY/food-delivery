import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postData } from "../../Services/Services";

const Login = () => {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const handleSignInUser = async (e) => {
    e.preventDefault();
    const user = {
      username: usernameRef.current?.value,
      password: passwordRef.current?.value,
    };
    await postData(user, "/auth/sigin").then((res) => {
      localStorage.setItem("token", res.token.access);
      localStorage.setItem("refresh", res.token.refresh);

      if (localStorage.getItem("token") !== "undefined") {
        navigate("/dashboard");
        window.location.reload();
      }
    });
  };

  return (
    <div className="container w-100 d-flex justify-content-center align-items-center py-5">
      <div className="card shadow">
        <div className="card-header bg-warning">
          <h3>Login</h3>
        </div>

        <div className="card-body">
          <form onSubmit={handleSignInUser}>
            <label>Username</label>
            <input
              ref={usernameRef}
              type="text"
              placeholder="andrey1"
              className="mb-2 form-control"
            />
            <label>Password</label>
            <input
              ref={passwordRef}
              type="password"
              placeholder="********"
              className="mb-2 form-control"
            />
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex gap-2 align-items-center">
                <p className="p-0 m-0">have you not account</p>
                <Link to={"/register"} className="my-2 " type="button">
                  Register
                </Link>
                <Link to={"/forget-password"} className="my-2 " type="button">
                  forget password
                </Link>
              </div>
              <button className="btn btn-warning float-end my-2">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
