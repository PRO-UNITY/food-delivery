import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getData } from "../../../Services/Services";
import Supplier from "../../../assets/images/supplier.png";
import ListProfile from "../../../Components/SubComponents/ListProfile";

const KitchenManagerDetails = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    getData(`/deliveryman/${id}`).then((res) => {
      setData(res);
      setLoading(false);
    });
  }, []);
  return (
    <>
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
    </>
  );
};

export default KitchenManagerDetails;
