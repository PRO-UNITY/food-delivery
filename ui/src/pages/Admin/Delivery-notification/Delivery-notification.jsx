import { useState } from "react";
import DeliveryAdminLayout from "../../../Layout/DeliveryAdminLayout";

const DeliveryNotification = () => {
  const [showMenu, setshowMenu] = useState(false);
  return (
    <DeliveryAdminLayout>
      <div className="hrms-dashboasrd-home mt-4 overflow-auto">
        <div className="container">
          <h3>Notifications</h3>
          <div className="card w-100 p-0 rounded overflow-hidden">
            <table className="table m-0">
              <tbody>
                <tr>
                  <td>
                    <h6 className="m-0 mt-2">Oct 01, 2022 </h6>
                    <span className="text-secondary ">Incoming Date</span>
                  </td>
                  <td>
                    <h6 className="m-0 mt-2">
                      <i className="fa-solid fa-circle-exclamation text-primary"></i>
                      <span className="text-primary fw-normal">14:02</span>
                    </h6>
                    <span className="text-secondary">Incoming Time</span>
                  </td>
                  <td>
                    <h6 className="m-0 mt-2">Lorem ipsum dolor sit amet...</h6>
                    <span className="text-secondary">Text</span>
                  </td>
                  <td align="center" className="text-end">
                    <div className="d-flex align-items-center justify-content-end mt-2">
                      <div className="position-realative">
                        {showMenu && (
                          <div className="menu-open  p-3 rounded d-flex  justify-content-end flex-column gap-2">
                            <button className="btn btn-danger">
                              Delete Message
                            </button>
                          </div>
                        )}
                        <button
                          className="btn ms-1"
                          onClick={() => setshowMenu((prev) => !prev)}
                        >
                          <i className="fa-solid fa-ellipsis-vertical fs-5 "></i>
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h6 className="m-0 mt-2">Sep 13, 2022 </h6>
                    <span className="text-secondary ">Incoming Date</span>
                  </td>
                  <td>
                    <h6 className="m-0 mt-2">
                      <i className="fa-solid fa-circle-exclamation text-primary"></i>
                      <span className="text-primary fw-normal">22:05</span>
                    </h6>
                    <span className="text-secondary">Incoming Time</span>
                  </td>
                  <td>
                    <h6 className="m-0 mt-2">Lorem ipsum dolor sit amet...</h6>
                    <span className="text-secondary">Text</span>
                  </td>
                  <td align="center" className="text-end">
                    <div className="d-flex align-items-center justify-content-end mt-2">
                      <div className="position-realative">
                        <button className="btn ms-1">
                          <i className="fa-solid fa-ellipsis-vertical fs-5 "></i>
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DeliveryAdminLayout>
  );
};

export default DeliveryNotification;
