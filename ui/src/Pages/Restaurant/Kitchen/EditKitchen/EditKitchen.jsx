import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";

const EditFood = () => {
    const nameRef = useRef();
    const descriptionRef = useRef();
    const imgRef = useRef();
    const timeref = useRef();
    const latituderef = useRef();
    const longitudref = useRef();
    const navigate = useNavigate();
    const {id} = useParams()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        const formData = new FormData();
        formData.append('name', nameRef.current.value);
        formData.append('description', descriptionRef.current.value);
        formData.append('logo', imgRef.current.files[0]);
        formData.append('working_time', timeref.current.value)
        formData.append('latitude', latituderef.current.value)
        formData.append('longitude', longitudref.current.value)

        try {
            const response = await axios.put(`https://api.prounity.uz/food-delivery/kitchen/kitchen_crud/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });
            navigate('/home/main'); 
        } catch (error) {
            console.error('Error updating food', error);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center">
            <div className="card w-50">
                <div className="card-header bg-primary text-light"><h3>Edit Restaurant</h3></div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <input ref={nameRef} type="text" placeholder="name" className="form-control mb-2" />
                        <input ref={descriptionRef} type="text" placeholder="description" className="form-control mb-2" />
                        <input ref={imgRef} type="file" className="form-control mb-2" />
                        <input ref={timeref} type="text" placeholder="working_time" className="form-control mb-2" />
                        <input ref={latituderef} type="text" placeholder="latitude" className="form-control mb-2" />
                        <input ref={longitudref} type="text" placeholder="longitude" className="form-control mb-2" />
                        <button type="submit" className="btn btn-primary">update</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditFood;
