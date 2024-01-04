import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DemoLayout from "../../../Layout/Demoproject";
import { getUserData } from "../../../Services/Services";
import Supplier from "../../../assets/images/supplier.png";
import ListProfile from "../../../Components/SubComponents/ListProfile";

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
              <img className="avatar-user" src={Supplier} alt="" />
            </div>
            <div className="w-100 mt-5">
              <ListProfile {...data} />
            </div>
          </div>
        }
      </div>
    </DemoLayout>
  );
};

export default KitchenDeliveryDetails;
