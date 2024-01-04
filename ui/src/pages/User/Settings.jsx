import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DemoLayout from "../../Layout/Demoproject";
import { getUserData } from "../../Services/Services";
import ListProfile from "../../Components/SubComponents/ListProfile";

const Settings = () => {
  const [search, setSearch] = useState("");
  const [user, setUser] = useState({});
  const token = localStorage.getItem("token");

  useEffect(() => {
    getUserData("/user").then((res) => setUser(res));
  }, []);

  return (
    <DemoLayout setSearch={setSearch}>
      <div className=" body-main w-100 p-5">
        <h3 className="mb-3">Settings</h3>
        {token ? (
          <div className="settings">
            <div className="container-avatar">
              <img className="avatar-user" src={user.avatar} alt="" />
            </div>
            <div className="w-100 mt-5">
              <ListProfile {...user} />
              <div className="w-100 d-flex justify-content-center">
                <Link
                  to={"/update-settings"}
                  className="btn-sign-in bg-orange mx-auto"
                >
                  update profile
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <h6>
            No settings for this please{" "}
            <Link className="text-orange" to={"/login"}>
              login
            </Link>
          </h6>
        )}
      </div>
    </DemoLayout>
  );
};

export default Settings;
