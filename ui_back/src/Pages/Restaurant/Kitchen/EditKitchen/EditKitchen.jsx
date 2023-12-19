import { useNavigate } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import { getDataWithToken } from "../../../../functions";
import { EditWithFormData } from "../../../../functions";

const EditFood = () => {
    const nameRef = useRef();
    const descriptionRef = useRef();
    const imgRef = useRef(null);
    const timeref = useRef();
    const latituderef = useRef();
    const longitudref = useRef();
    const navigate = useNavigate();
    const {id} = useParams()
    const [data,setData] = useState()

    useEffect(()=>{
        getDataWithToken(`/kitchen/${id}`).
        then((res)=>
         {setData(res.kitchen[0])
         console.log(res.kitchen[0])}
         )
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        const formData = new FormData();
        formData.append('name', nameRef.current.value);
        formData.append('description', descriptionRef.current.value);
        formData.append('working_time', timeref.current.value)
        formData.append('latitude', latituderef.current.value)
        formData.append('longitude', longitudref.current.value)
        if(imgRef.current?.files[0]){
            formData.append('logo', imgRef.current.files[0]);
        }
        EditWithFormData(`/kitchen/${id}`, formData).
        then((res)=>navigate('/home/main'))
    };

    

    return (
        <div className="d-flex justify-content-center align-items-center">
            <div className="card w-50">
                <div className="card-header bg-primary text-light"><h3>Edit Restaurant</h3></div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <input defaultValue={data?.name} ref={nameRef} type="text" placeholder="name" className="form-control mb-2" />
                        <input defaultValue={data?.description} ref={descriptionRef} type="text" placeholder="description" className="form-control mb-2" />
                        <input  ref={imgRef} type="file" className="form-control mb-2" />
                        <input defaultValue={data?.working_time} ref={timeref} type="text" placeholder="working_time" className="form-control mb-2" />
                        <input defaultValue={data?.latitude} ref={latituderef} type="text" placeholder="latitude" className="form-control mb-2" />
                        <input defaultValue={data?.longitude} ref={longitudref} type="text" placeholder="longitude" className="form-control mb-2" />
                        <button type="submit" className="btn btn-primary">update</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditFood;
