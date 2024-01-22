import { useEffect, useState } from "react";
import { getData } from "../../Services/Services";
import DemoLayout from "../../Layout/Demoproject";
import Order from "../../assets/images/3500833.png";
import { Link } from "react-router-dom";


const ManagerHistory = () => {
  const [order, setOrder] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getData(`/order/manager/history`).then((res) => {
      console.log(res);
      setOrder(res.results);
    });
  }, []);

  return (
    <DemoLayout setSearch={setSearch}>
      <div className="w-100 body-main py-5 px-2">
        <div className="foods">
          {order?.map((item, index) => (
            <div
              key={index}
              className="food-item bg-white text-dark border-none"
            >
              <Link className="w-100 d-flex justify-content-center">
                <img className="mb-2 food-img" src={Order} />
              </Link>
              <div className="w-100">
                <p className="text-center text-danger">{item.klient.username}</p>
              </div>
              <div className="d-flex justify-content-between w-100 align-items-center">
                <Link
                  to={`/new-order-detail/${item.id}`}
                  className={`btn btn-warning border-none w-100`}
                >
                  <i className="fa-solid fa-eye"></i> view
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DemoLayout>
  );
};

export default ManagerHistory;
