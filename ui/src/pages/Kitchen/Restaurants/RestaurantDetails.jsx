import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DemoLayout from "../../../Layout/Demoproject";
import { getUserData } from "../../../Services/Services";

const RestaurantDetails = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    getUserData(`/kitchen/${id}`).then((res) => {
      setData(res);
      setLoading(false);
    });
  }, []);

  return (
    <DemoLayout setSearch={setSearch}>
      <div className=" body-main w-100  p-5">
        <h3>About {data.name}</h3>
        <div key={data.id} className="order-history">
          <div className="img-order-history p-3">
            <img src={`${data.logo}`} alt="" />
          </div>
          <div className="title-order-history">
            <ul className="list-group w-100">
              <li className="list-group-item">Name : {data.name}</li>
              <li className="list-group-item">
                Description : {data.description}
              </li>
              <li className="list-group-item">Open Time : {data.open_time}</li>
              <li className="list-group-item">
                Close Time : {data.close_time}
              </li>
              <li className="list-group-item">Longitude : {data.longitude}</li>
              <li className="list-group-item">Latitude : {data.latitude}</li>
            </ul>
          </div>
        </div>
        <div className="w-100 d-flex justify-content-center gap-2">
          <Link
            to={`/add-supplier/${data.id}`}
            className="btn btn-success border-none"
          >
            add supplier
          </Link>
          <Link
            to={`/add-manager/${data.id}`}
            className="btn btn-primary border-none"
          >
            add manager
          </Link>
          <Link
            to={`/edit-restaurant/${data.id}`}
            className="btn btn-warning border-none"
          >
            update
          </Link>
        </div>
      </div>
    </DemoLayout>
  );
};

export default RestaurantDetails;
