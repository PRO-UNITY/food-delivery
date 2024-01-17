/* eslint-disable react/prop-types */
import { useState } from "react";
import Navbar from "./Navbar"
import Sidebar from "./Sidebar";

const DeliveryDocumentationLayout = ({ children }) => {
  const [showSidebar, setshowSidebar] = useState(false);
  return (
    <div
      className=" vh-100 overflow-auto products-doc "
      style={{ background: "rgb(248, 246, 252)" }}
    >
      <Navbar setshowSidebar={setshowSidebar} />
      <div className="d-flex bg-white container-lg p-0">
        <Sidebar showSidebar={showSidebar} setshowSidebar={setshowSidebar} />
        <main className="w-100">{children}</main>
      </div>
    </div>
  );
};

export default DeliveryDocumentationLayout;