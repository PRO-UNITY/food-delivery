import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getData } from "../../../Services/Services";

const HistoryDetailOrder = () => {
  const [search, setSearch] = useState("");
  const [orders, setOrders] = useState([]);
  const [data, setData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getData(`/order/${id}/foods`).then((res) => {
      setOrders(res.foods);
    });
  }, []);

  return (
    <>
      <h3>Order History Details</h3>
      {orders.map((item, index) => (
        <div key={index} className="order-history">
          <div className="img-order-history p-3">
            <img src={`${item.food_img}`} alt="" />
          </div>
          <div className="title-order-history">
            <ul className="list-group w-100">
              <li className="list-group-item">Name : {item.name}</li>
              <li className="list-group-item">Count : {item.count}</li>
              <li className="list-group-item">
                Description : {item.description}
              </li>
              <li className="list-group-item">Price : {item.price}</li>
            </ul>
          </div>
        </div>
      ))}
    </>
  );
};

export default HistoryDetailOrder;
