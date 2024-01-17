import { useEffect, useState } from "react";
import DemoLayout from "../../Layout/Demoproject";
import { getData, putData } from "../../Services/Services";

const ManagerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState([]);
  const [search, setSearch] = useState("");
  const [orderStatus, setOrderStatus] = useState({});
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    getData(`/order/manager/active`).then((res) => {
      setOrders(res.results);
    });
  }, [isActive]);

  useEffect(() => {
    getData(`/order/status`).then((res) => {
      setStatus(res);
    });
  }, []);

  const handleStatusChange = (orderId, selectedStatusId) => {
    setOrderStatus((prev) => ({ ...prev, [orderId]: selectedStatusId }));
    sendStatus();
  };

  const sendStatus = (id) => {
    const selectedStatusIds = Object.values(orderStatus);
    const currenId = Number(selectedStatusIds[0]);
    const data = {
      status: currenId,
    };
    putData(data, `/order/${id}/manager/accept`).then((res) =>
      setIsActive(!isActive)
    );
  };

  return (
    <DemoLayout setSearch={setSearch}>
      <div className=" body-main w-100 p-5 d-flex flex-column justify-content-start align-items-start">
        {orders?.map((item, index) => (
          <table key={item.id} className="table table-light mb-3 shadow">
            <thead>
              <tr>
                <th scope="col">N</th>
                <th scope="col">Name</th>
                <th scope="col">Count</th>
                <th scope="col">image</th>
                <th scope="col">Price</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="align-middle">
                <td>{index + 1}</td>
                <td>
                  {item.foods.map((i) => (
                    <p className="name-order-history">{i.name}</p>
                  ))}
                </td>
                <td>
                  {item.foods.map((i) => (
                    <p className="count-order-history">{i.count}</p>
                  ))}
                </td>
                <td>
                  <div className="d-flex flex-column">
                    {item.foods.map((i) => (
                      <img style={{ width: "50px" }} src={i.food_img} alt="" />
                    ))}
                  </div>
                </td>
                <td>
                  {item.foods.map((i) => (
                    <p className="count-order-history">{i.price}</p>
                  ))}
                </td>
                <td>{item.status.name}</td>
                <td>
                  <div className="d-flex">
                    <select
                      className="form-control"
                      name="statusSelect"
                      id="statusSelect"
                      onChange={(e) =>
                        handleStatusChange(item.id, e.target.value)
                      }
                      value={orderStatus[item.id] || ""}
                    >
                      {status?.map((statusItem) => (
                        <option key={statusItem.id} value={statusItem.id}>
                          {statusItem.name}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => sendStatus(item.id)}
                      className="btn btn-info"
                    >
                      ok
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        ))}
      </div>
    </DemoLayout>
  );
};

export default ManagerOrders;
