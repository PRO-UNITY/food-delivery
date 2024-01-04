import DeliveryDashNavbar from "../Components/DeliveryDashNavbar/DeliveryDashNavbar";
import DeliverySidebar from "../pages/Admin/Delivery-sidebar/Delivery-sidebar";

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
