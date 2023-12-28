import { useState } from "react";
import DemoLayout from "../../../../Layout/Demoproject";
import { EditWithFormData, getUserData } from "../../../../functions/function";
import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../Demo.css";
import { useEffect } from "react";

const RestaurantUpdate = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
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
    if(imgRef.current.files[0]){
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
    <DemoLayout setSearch={setSearch}>
      <div className="body-main w-100 p-5">
        <div className="card w-100">
          <div
            style={{ background: "#F8B602" }}
            className="card-header  text-light"
          >
            <h3>Update Restaurant</h3>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <input
                defaultValue={data.name}
                ref={nameRef}
                type="text"
                placeholder="name"
                className="form-control mb-2"
              />
              <input
                defaultValue={data.description}
                ref={descriptionRef}
                type="text"
                placeholder="description"
                className="form-control mb-2"
              />
              <input ref={imgRef} type="file" className="form-control mb-2" />
              <input
                defaultValue={data.open_time}
                ref={openref}
                type="text"
                placeholder="open_time"
                className="form-control mb-2"
              />
              <input
                defaultValue={data.close_time}
                ref={closeref}
                type="text"
                placeholder="close_time"
                className="form-control mb-2"
              />
              <input
                defaultValue={data.latitude}
                ref={latituderef}
                type="text"
                placeholder="latitude"
                className="form-control mb-2"
              />
              <input
                defaultValue={data.longitude}
                ref={longitudref}
                type="text"
                placeholder="longitude"
                className="form-control mb-2"
              />
              <button type="submit" className="btn-orange">
                save
              </button>
            </form>
          </div>
        </div>
      </div>
    </DemoLayout>
  );
};

export default RestaurantUpdate;
