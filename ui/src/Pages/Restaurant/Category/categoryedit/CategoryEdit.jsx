// import { postDataWithToken } from "../../../functions";
import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import axios from 'axios';
import { getDataWithToken, EditWithFormData } from "../../../../functions";
import { useParams } from "react-router-dom";

const EditCategory = () => {
    const nameRef = useRef();
    const categoryref = useRef();
    const navigate = useNavigate();
    const {id} = useParams()
    const [food, setFood] = useState([])
    const [data, setData] = useState([])
    const [selectcategory, setSelectcategory] = useState([])

    useEffect(()=>{
        getDataWithToken('/kitchen/kitchen_create').
        then((res)=> setFood(res))
    },[])

    useEffect(()=>{
        getDataWithToken(`/foods/categories_crud/${id}`).
        then((res)=> setData(res[0]))
    },[])

    const handleEdit = async (e) => {
        const token = localStorage.getItem("token")
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', nameRef.current.value);
        formData.append('kitchen_id', selectcategory);
        EditWithFormData(`/foods/categories_crud/${id}`, formData).
        then((res)=>navigate('/home/category'))
    };



    return (
        <div className="d-flex justify-content-center align-items-center">
            <div className="card w-50">
                <div className="card-header bg-primary text-light"><h3>Update Category</h3></div>
                <div className="card-body">
                    <form onSubmit={handleEdit}>
                        <input defaultValue={data.name} ref={nameRef} type="text" placeholder="name" className="form-control mb-2" />
                        <select onChange={(e)=>setSelectcategory(e.target.value)} value={selectcategory} ref={categoryref} name="" id="" className="form-control mb-2">
                            <option hidden value="">Select Restaurant</option>
                            {food.map((item,index)=>
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

export default EditCategory;
