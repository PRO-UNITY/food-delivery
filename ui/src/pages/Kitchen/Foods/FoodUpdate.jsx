import "../../Demo.css";
import { useState, useEffect, useRef } from "react";
import { EditWithFormData, getUserData } from "../../../Services/Services";
import { useNavigate, useParams } from "react-router-dom";
import FoodAction from "../../../Components/SubComponents/FoodAction";

const FoodUpdate = () => {
  const nameRef = useRef();
  const descriptionRef = useRef();
  const imgRef = useRef();
  const priceRef = useRef();
  const categoryref = useRef();
  const kitchenref = useRef();
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  const [data, setData] = useState({});
  const [kitchen, setKitchen] = useState([]);
  const [selectcategory, setSelectcategory] = useState(0);
  const [selectkitchen, setSelectkitchen] = useState(0);
  const { id } = useParams();

  useEffect(() => {
    getUserData(`/foods/${id}`).then((res) => {
      setData(res);
    });
  }, []);

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

    EditWithFormData(`/foods/${id}`, formData).then(() => navigate("/foods"));
  };

  return (
    <>
      <div className="card w-100">
        <div className="card-header text-light">
          <h3>Update Food</h3>
        </div>
        <FoodAction
          data={data}
          nameRef={nameRef}
          descriptionRef={descriptionRef}
          imgRef={imgRef}
          priceRef={priceRef}
          categoryref={categoryref}
          kitchenref={kitchenref}
          category={category}
          kitchen={kitchen}
          selectcategory={selectcategory}
          selectkitchen={selectkitchen}
          setSelectcategory={setSelectcategory}
          setSelectkitchen={setSelectkitchen}
          handleSubmit={handleSubmit}
        />
      </div>
    </>
  );
};

export default FoodUpdate;
