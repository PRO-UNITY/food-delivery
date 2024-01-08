import "../../Demo.css";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AddWithFormData } from "../../../Services/Services";
import RestaurantAction from "../../../Components/SubComponents/RestaurantAction";

const RestaurantAdd = () => {
  const nameRef = useRef();
  const descriptionRef = useRef();
  const imgRef = useRef();
  const openref = useRef();
  const closeref = useRef();
  const latituderef = useRef();
  const longitudref = useRef();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", nameRef.current.value);
    formData.append("description", descriptionRef.current.value);
    if (imgRef.current.files[0]) {
      formData.append("logo", imgRef?.current?.files[0]);
    }
    formData.append("open_time", openref.current.value);
    formData.append("close_time", closeref.current.value);
    formData.append("latitude", latituderef.current.value);
    formData.append("longitude", longitudref.current.value);

    AddWithFormData("/kitchen/", formData).then(() => navigate("/restaurant"));
  };

  return (
    <>
      <div className="card w-100">
        <div className="card-header  text-light">
          <h3>Add Restaurant</h3>
        </div>
        <RestaurantAction
          data={{}}
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

export default RestaurantAdd;
