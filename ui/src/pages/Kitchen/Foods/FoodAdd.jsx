import "../../Demo.css";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AddWithFormData, getData } from "../../../Services/Services";
import FoodAction from "../../../Components/SubComponents/FoodAction";

const FoodAdd = () => {
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
    getData("/kitchen/category").then((res) => {
      setCategory(res);
    });
  }, []);

  useEffect(() => {
    getData("/kitchen/").then((res) => {
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
    <div className="card w-100">
      <div className="card-header  text-light">
        <h3>Add Food</h3>
      </div>
      <FoodAction
        data={{}}
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
  );
};

export default FoodAdd;
