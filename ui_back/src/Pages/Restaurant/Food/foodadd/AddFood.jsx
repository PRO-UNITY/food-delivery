// import { postDataWithToken } from "../../../functions";
import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import axios from 'axios';
import { AddWithFormData, getDataWithToken } from "../../../../functions";

const AddFoodRestaurant = () => {
    const nameRef = useRef();
    const contentRef = useRef();
    const categoryref = useRef();
    const kitchenref = useRef();
    const priceRef = useRef();
    const imgRef = useRef();
    const navigate = useNavigate();
    const [category, setCategory] = useState([])
    const [kitchen, setKitchen] = useState([])
    const [selectcategory, setSelectcategory] = useState(0)
    const [selectkitchen, setSelectkitchen] = useState(0)
    


    const handleCategory = (id) => {
        setSelectkitchen(id)
        getDataWithToken(`/kitchen/kitchen_categories/${id}`).
        then((res)=>{
            setCategory(res)
             console.log(res)
        })
    }

    useEffect(()=>{
        getDataWithToken('/kitchen/kitchen_is_active').
        then((res)=> setKitchen(res))
    },[])

    const handleSubmit = async (e) => {
        const token = localStorage.getItem("token")
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', nameRef.current.value);
        formData.append('content', contentRef.current.value);
        formData.append('categories_id', selectcategory);
        formData.append('kitchen_id', selectkitchen);
        formData.append('price', priceRef.current.value);
        formData.append('food_img', imgRef.current.files[0]);
        AddWithFormData("/foods/all_foods", formData).
        then(()=>navigate('/home/foods'))
    };

    return (
        <div className="d-flex justify-content-center align-items-center">
            <div className="card w-50">
                <div className="card-header bg-primary text-light"><h3>Add Restaurant</h3></div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <input ref={nameRef} type="text" placeholder="name" className="form-control mb-2" />
                        <input ref={contentRef} type="text" placeholder="content" className="form-control mb-2" />
                        <input ref={priceRef} type="text" placeholder="price" className="form-control mb-2" />
                        <input ref={imgRef} type="file" placeholder="name" className="form-control mb-2" />
                        <select onChange={(e)=>handleCategory(e.target.value)} value={selectkitchen} ref={kitchenref} name="" id="" className="form-control mb-2">
                            <option hidden>select restaurant</option>
                            {kitchen.map((item,index)=>
                            <option key={item.id} value={item.id} className="form-control">{item.name}</option>
                            )}
                        </select>
                        <select onChange={(e)=>setSelectcategory(e.target.value)} value={selectcategory} ref={categoryref} name="" id="" className="form-control mb-2">
                            <option hidden value="">category name</option>
                            {category.map((item,index)=>
                            <option key={item.id} value={item.id} className="form-control">{item.name}</option>
                            )}
                        </select>
                        <button type="submit" className="btn btn-primary">create</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddFoodRestaurant;
