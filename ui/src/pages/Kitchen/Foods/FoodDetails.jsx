import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DemoLayout from "../../../Layout/Demoproject";
import { getUserData } from "../../../Services/Services";

const KitchenFoodDetails = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    getUserData(`/foods/${id}`).then((res) => {
      setData(res);
      setLoading(false);
    });
  }, []);
  return (
    <DemoLayout setSearch={setSearch}>
      <div className=" body-main w-100  p-5">
        <h3>{data.name}</h3>
        <div key={data?.id} className="order-history">
          <div className="img-order-history p-3">
            <img
              src={`${data?.food_img}`}
              style={{ borderRadius: "20px" }}
              alt=""
            />
          </div>
          <div className="title-order-history">
            <ul className="list-group w-100">
              <li className="list-group-item">Name : {data?.name}</li>
              <li className="list-group-item">
                Description : {data?.description}
              </li>
              <li className="list-group-item">Price : {data?.price}</li>
            </ul>
          </div>
        </div>
        <div className="w-100">
          <Link
            to={`/edit-food/${data.id}`}
            className="btn-orange float-end border-none"
          >
            update
          </Link>
        </div>
      </div>
    </DemoLayout>
  );
};

export default KitchenFoodDetails;
