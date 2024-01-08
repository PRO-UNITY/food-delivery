import "../../Demo.css";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { EditWithFormData, getUserData } from "../../../Services/Services";
import RestaurantAction from "../../../Components/SubComponents/RestaurantAction";

const RestaurantUpdate = () => {
  const [data, setData] = useState({});
  const nameRef = useRef(null);
  const descriptionRef = useRef(null);
  const imgRef = useRef();
  const openref = useRef(null);
  const closeref = useRef(null);
  const latituderef = useRef(null);
  const longitudref = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", nameRef.current.value);
    formData.append("description", descriptionRef.current.value);
    formData.append("open_time", openref.current.value);
    formData.append("close_time", closeref.current.value);
    formData.append("latitude", latituderef.current.value);
    formData.append("longitude", longitudref.current.value);
    if (imgRef.current.files[0]) {
      formData.append("logo", imgRef?.current?.files[0]);
    }
    EditWithFormData(`/kitchen/${id}`, formData).then(() => {
      navigate(`/restaurant/${id}`);
    });
  };

  useEffect(() => {
    getUserData(`/kitchen/${id}`).then((res) => {
      setData(res);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <div className="card w-100">
        <div className="card-header text-light">
          <h3>Update Restaurant</h3>
        </div>
        <RestaurantAction
          data={data}
          nameRef={nameRef}
          descriptionRef={descriptionRef}
          openref={openref}
          closeref={closeref}
          latituderef={latituderef}
          longitudref={longitudref}
          imgRef={imgRef}
          handleSubmit={handleSubmit}
        />
      </div>
    </>
  );
};

export default RestaurantUpdate;
