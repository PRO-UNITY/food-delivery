/* eslint-disable react/prop-types */
import { useState } from "react";
import DemoNavbar from "../pages/demo/Navbar";
import DemoSidebar from "../pages/demo/Sidebar";
import Profile from "../pages/demo/Profile";

const DemoLayout = ({ children, setSearch, counter }) => {
  const [showSidebar, setshowSidebar] = useState(false);
  const [showProfile, setshowProfile] = useState(false);
  return (
    <div className="container_ body overflow-auto d-flex">
      <DemoSidebar showSidebar={showSidebar} />
      <div className="d-flex main flex-column w-100 bg-light">
        <DemoNavbar
          setSearch={setSearch}
          setshowSidebar={setshowSidebar}
          setshowProfile={setshowProfile}
        />
        <main className="">{children}</main>
      </div>
      <Profile showProfile={showProfile} counter={counter} />
    </div>
  );
};

export default DemoLayout;
