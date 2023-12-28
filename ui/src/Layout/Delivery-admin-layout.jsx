/* eslint-disable react/prop-types */

import DeliveryDashNavbar from "../Components/Delivery-dash-navbar/Delivery-dash-navbar";
import DeliverySidebar from "../pages/demo/Admin/Delivery-sidebar/Delivery-sidebar";

const DeliveryAdminLayout = ({ children }) => {
  return (
    <div className="d-flex hrms-dash vh-100 w-100">
      <DeliverySidebar />
      <div className="w-100">
        <DeliveryDashNavbar />
        <div className="px-md-3 ">{children}</div>
      </div>
    </div>
  );
};

export default DeliveryAdminLayout;
