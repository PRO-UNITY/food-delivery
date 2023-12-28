import { useEffect, useState } from "react";
import DemoLayout from "../../../../Layout/Demoproject";
import { getUserData } from "../../../../functions/function";
import { Link, useParams } from "react-router-dom";
import Supplier from "../../../../assets/images/supplier.png";

const KitchenDeliveryDetails = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    getUserData(`/deliveryman/${id}`).then((res) => {
      setData(res);
      console.log(res);
      setLoading(false);
    });
  }, []);
  return (
    <DemoLayout setSearch={setSearch}>
      <div className=" body-main w-100 p-5">
        <h3 className="mb-3">Settings</h3>
        {
          <div className="settings">
            <div className="container-avatar">
              <img
                className="avatar-user"
                src={data?.avatar ? data?.avatar : Supplier}
                alt=""
              />
            </div>
            <div className="w-100 mt-5">
              <ul className="list-group w-100 mb-3">
                <li className="list-group-item">Username : {data?.username}</li>
                <li className="list-group-item">
                  Firstname : {data?.first_name}
                </li>
                <li className="list-group-item">
                  Lastname : {data?.last_name}
                </li>
                <li className="list-group-item">Email : {data?.email}</li>
                <li className="list-group-item">
                  Phone number : {data?.phone ? data.phone : "No number yet"}
                </li>
              </ul>
            </div>
          </div>
        }
      </div>
    </DemoLayout>
  );
};

export default KitchenDeliveryDetails;
