import { useEffect, useState } from "react";
import { getData, putData } from "../../Services/Services";
import DemoLayout from "../../Layout/Demoproject";
import { Link } from "react-router-dom";
import Order from "../../assets/images/3500833.png";

const ActiveOrders = () => {
  const [order, setOrder] = useState([]);
  const [search, setSearch] = useState("");
  const [active, setActive] = useState(false)
  useEffect(() => {
    getData(`/order/deliver/active`).then((res) => {
      setOrder(res.results);
    });
  }, [active]);

  const accepted = (id) => {
    const data = {
      status: 6,
      is_active : true,
    };
    putData(data, `/order/${id}/delivery/accept`).then((res) =>
      setActive(!active)
    );
  };

  return (
    <DemoLayout setSearch={setSearch}>
      <div className="w-100 body-main py-5 px-2">
        <div className="foods">
          {order?.map((item, index) => (
            <div
              key={index}
              className="food-item bg-white text-dark border-none"
            >
              <Link className="w-100 d-flex justify-content-center mb-4">
                <img className="mb-2 food-img" src={Order} />
              </Link>
              {/* <div className="w-100">
                <p className="text-center text-danger">{item.status.name}</p>
              </div> */}
              <div className="d-flex justify-content-between w-100 align-items-center">
                <button
                  onClick={() => accepted(item.id)}
                  className={`btn btn-success border-none`}
                >
                  accepted
                </button>
                <Link
                  to={`/new-order-detail/${item.id}`}
                  className={`btn btn-warning border-none`}
                >
                  <i className="fa-solid fa-eye"></i>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DemoLayout>
  );
};

export default ActiveOrders;
