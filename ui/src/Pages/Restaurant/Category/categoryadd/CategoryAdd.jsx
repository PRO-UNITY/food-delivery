// import { postDataWithToken } from "../../../functions";
import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import axios from 'axios';
import { getDataWithToken } from "../../../../functions";

const AddCategory = () => {
    const nameRef = useRef();
    const categoryref = useRef();
    const navigate = useNavigate();
    const [food, setFood] = useState([])
    const [selectcategory, setSelectcategory] = useState()

    useEffect(()=>{
        getDataWithToken('/kitchen/kitchen_create').
        then((res)=> setFood(res))
    },[])

    const handleSubmit = async (e) => {
        const token = localStorage.getItem("token")
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', nameRef.current.value);
        formData.append('kitchen_id', selectcategory);

        try {
            const response = await axios.post('https://api.prounity.uz/food-delivery/foods/all_categories', formData, {
                headers: {
                    'Content-Type': 'multipart/formData',
                    Authorization: `Bearer ${token}`,
                },
            });
            navigate('/home/category'); 
        } catch (error) {
            console.error('Error creating category', error);
        }
    };



    return (
        <div className="d-flex justify-content-center align-items-center">
            <div className="card w-50">
                <div className="card-header bg-primary text-light"><h3>Add Restaurant</h3></div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <input ref={nameRef} type="text" placeholder="name" className="form-control mb-2" />
                        <select onChange={(e)=>setSelectcategory(e.target.value)} value={selectcategory} ref={categoryref} name="" id="" className="form-control mb-2">
                            {food.map((item,index)=>
                            <option value={item.id} className="form-control">{item.name}</option>
                            )}
                            
                        </select>
                        <button type="submit" className="btn btn-primary">create</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddCategory;
