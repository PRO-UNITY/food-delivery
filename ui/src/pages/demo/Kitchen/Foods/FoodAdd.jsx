import { useEffect, useState } from "react";
import DemoLayout from "../../../../Layout/Demoproject";
import {
  AddWithFormData,
  getDataWithToken,
  getUserData,
} from "../../../../functions/function";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../../Demo.css";

const FoodAdd = () => {
  const [search, setSearch] = useState("");
  const nameRef = useRef();
  const descriptionRef = useRef();
  const imgRef = useRef();
  const priceRef = useRef();
  const categoryref = useRef();
  const kitchenref = useRef();
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  const [kitchen, setKitchen] = useState([]);
  const [selectcategory, setSelectcategory] = useState(0);
  const [selectkitchen, setSelectkitchen] = useState(0);

  useEffect(() => {
    getUserData("/kitchen/category").then((res) => {
      setCategory(res);
    });
  }, []);

  useEffect(() => {
    getUserData("/kitchen/").then((res) => {
      setKitchen(res);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", nameRef.current.value);
    formData.append("description", descriptionRef.current.value);
    formData.append("food_img", imgRef.current.files[0]);
    formData.append("price", priceRef.current.value);
    formData.append("kitchen", Number(selectkitchen));
    formData.append("categories", Number(selectcategory));

    AddWithFormData("/foods/", formData).then(() => navigate("/foods"));
  };

  return (
    <DemoLayout setSearch={setSearch}>
      <div className="body-main w-100 p-5">
        <div className="card w-100">
          <div
            style={{ background: "#F8B602" }}
            className="card-header  text-light"
          >
            <h3>Add Food</h3>
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
                ref={priceRef}
                type="text"
                placeholder="price"
                className="form-control mb-2"
              />
              <select
                onChange={(e) => setSelectkitchen(e.target.value)}
                value={selectkitchen}
                ref={kitchenref}
                name=""
                id=""
                className="form-control mb-2"
              >
                <option hidden>select restaurant</option>
                {kitchen.map((item) => (
                  <option
                    key={item.id}
                    value={item.id}
                    className="form-control"
                  >
                    {item.name}
                  </option>
                ))}
              </select>
              <select
                onChange={(e) => setSelectcategory(e.target.value)}
                value={selectcategory}
                ref={categoryref}
                name=""
                id=""
                className="form-control mb-2"
              >
                <option hidden value="">
                  category name
                </option>
                {category.map((item) => (
                  <option
                    key={item.id}
                    value={item.id}
                    className="form-control"
                  >
                    {item.name}
                  </option>
                ))}
              </select>
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

export default FoodAdd;
