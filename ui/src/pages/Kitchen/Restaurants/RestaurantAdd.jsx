import "../../Demo.css";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import DemoLayout from "../../../Layout/Demoproject";
import { AddWithFormData } from "../../../Services/Services";

const RestaurantAdd = () => {
  const [search, setSearch] = useState("");
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
    formData.append("logo", imgRef.current.files[0]);
    formData.append("open_time", openref.current.value);
    formData.append("close_time", closeref.current.value);
    formData.append("latitude", latituderef.current.value);
    formData.append("longitude", longitudref.current.value);

    AddWithFormData("/kitchen/", formData).then(() => navigate("/dashboard"));
  };

  return (
    <DemoLayout setSearch={setSearch}>
      <div className="body-main w-100 p-5">
        <div className="card w-100">
          <div className="card-header  text-light">
            <h3>Add Restaurant</h3>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <input
                ref={nameRef}
                type="text"
                placeholder="name"
                className="form-control mb-2"
              />
              <input
                ref={descriptionRef}
                type="text"
                placeholder="description"
                className="form-control mb-2"
              />
              <input ref={imgRef} type="file" className="form-control mb-2" />
              <input
                ref={openref}
                type="text"
                placeholder="open_time"
                className="form-control mb-2"
              />
              <input
                ref={closeref}
                type="text"
                placeholder="close_time"
                className="form-control mb-2"
              />
              <input
                ref={latituderef}
                type="text"
                placeholder="latitude"
                className="form-control mb-2"
              />
              <input
                ref={longitudref}
                type="text"
                placeholder="longitude"
                className="form-control mb-2"
              />
              <button type="submit" className="btn-orange">
                create
              </button>
            </form>
          </div>
        </div>
      </div>
    </DemoLayout>
  );
};

export default RestaurantAdd;
