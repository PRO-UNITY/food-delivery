import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DemoLayout from "../../../Layout/Demoproject";
import { getData } from "../../../Services/Services";

const FoodDetail = () => {
  const [search, setSearch] = useState("");
  const [orders, setOrders] = useState([]);
  const [data, setData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getData(`/foods/${id}`).then((res) => {
      setData(res);
    });
  }, []);

  return (
    <DemoLayout setSearch={setSearch}>
      <div className=" body-main w-100 py-5 px-2">
        <h3>Food Details</h3>
        <div className="order-history">
          <div className="img-order-history p-3">
            <img className="w-75" src={`${data.food_img}`} alt="" />
          </div>
          <div className="title-order-history">
            <ul className="list-group w-100">
              <li className="list-group-item">Name : {data.name}</li>
              <li className="list-group-item">
                Description : {data.description}
              </li>
              <li className="list-group-item">Price : {data.price}</li>
            </ul>
          </div>
        </div>
      </div>
    </DemoLayout>
  );
};

export default FoodDetail;
