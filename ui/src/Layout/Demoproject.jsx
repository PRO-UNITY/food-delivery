/* eslint-disable react/prop-types */
import { useState } from "react";
import DemoNavbar from "../pages/demo/Navbar";
import DemoSidebar from "../pages/demo/Sidebar";
import Profile from "../pages/demo/Profile";

const DemoLayout = ({ children, setSearch, count }) => {
  const [showSidebar, setshowSidebar] = useState(false );
  const [showProfile, setshowProfile] = useState(false );
  return (
    <div className=" body overflow-auto d-flex ">
        <DemoSidebar showSidebar={showSidebar} />
        <div className="d-flex  flex-column bg-light w-100">
            <DemoNavbar setSearch={setSearch} setshowSidebar={setshowSidebar} setshowProfile={setshowProfile} />
            <main className="">{children}</main>
        </div>
        <Profile showProfile={showProfile} count={count}/>
    </div>
  );
};

export default DemoLayout;
