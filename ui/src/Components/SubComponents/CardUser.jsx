import { Link } from "react-router-dom";
import Supplier from "../../assets/images/supplier.png";
import { deleteData, putData } from "../../Services/Services";

const CardUser = (props) => {
  const { id, username, active_profile, isactive, setIsactive } = props;

  const deleteDelivery = (id) => {
    deleteData(`/deliveryman/${id}`).then(() => setIsactive((p) => !p));
  };

  const statusFalse = (item) => {
    const status = {
      active_profile: false,
    };
    putData(status, `/deliveryman/${item.id}`);
    setIsactive(!isactive);
  };

  const statusTrue = (item) => {
    const status = {
      active_profile: true,
    };
    putData(status, `/deliveryman/${item.id}`);
    setIsactive(!isactive);
  };

  return (
    <div className="food-item bg-white  text-dark border-none">
      <Link
        to={`/delivery-detail/${id}`}
        className="w-100 d-flex justify-content-center"
      >
        <img className="mb-2 food-img" src={Supplier} />
      </Link>
      <div className="w-100">
        <p className="text-center">{username}</p>
        {active_profile ? (
          <button onClick={() => statusFalse(props)} className="btn-none w-100">
            <p className="text-center text-success">avtive</p>
          </button>
        ) : (
          <button onClick={() => statusTrue(props)} className="btn-none w-100">
            <p className="text-center text-danger">no active</p>
          </button>
        )}
      </div>
      <div className="d-flex justify-content-between w-100 align-items-center">
        <Link to={`${id}`} className={`btn btn-success border-none`}>
          <i className="fa-solid fa-eye"></i> &nbsp; more
        </Link>
        <button onClick={() => deleteDelivery(id)} className="btn btn-danger">
          <i className="fa-solid fa-trash"></i>
        </button>
      </div>
    </div>
  );
};

export default CardUser;
