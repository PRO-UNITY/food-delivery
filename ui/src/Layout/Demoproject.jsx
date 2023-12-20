/* eslint-disable react/prop-types */
import { useState } from "react";
import DemoNavbar from "../pages/demo/Navbar";
import DemoSidebar from "../pages/demo/Sidebar";
import Profile from "../pages/demo/Profile";

const DemoLayout = ({ children, setSearch }) => {
  const [showSidebar, setshowSidebar] = useState(false );
  return (
    <div className="bg-light vh-100 overflow-auto d-flex ">
        <DemoSidebar showSidebar={showSidebar} />
        <div className="d-flex w-100 flex-column">
            <DemoNavbar setSearch={setSearch} setshowSidebar={setshowSidebar} />
            <main className="">{children}</main>
        </div>
        <Profile/>
    </div>
  );
};

export default DemoLayout;
