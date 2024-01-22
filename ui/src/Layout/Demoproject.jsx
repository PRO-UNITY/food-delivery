/* eslint-disable react/prop-types */
import { useState } from "react";
import DemoNavbar from "../Components/MainComponents/Navbar";
import DemoSidebar from "../Components/MainComponents/Sidebar";
import Profile from "../Components/MainComponents/Profile";

const DemoLayout = ({ children, setSearch, counter }) => {
  const [showSidebar, setshowSidebar] = useState(false);
  const [showProfile, setshowProfile] = useState(false);
  return (
    <div className="body overflow-auto d-flex">
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
