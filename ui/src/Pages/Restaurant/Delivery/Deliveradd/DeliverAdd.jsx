// import { postDataWithToken } from "../../../functions";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { AddWithFormData } from "../../../../functions";

const AddDeliver = () => {
    const firstnameRef = useRef();
    const lastnameRef = useRef();
    const usernameRef = useRef();
    const emailref = useRef();
    const passwordRef = useRef();
    const confirmpasswordRef = useRef();
    const navigate = useNavigate();
    

    const handleSubmit = async (e) => {
        const token = localStorage.getItem("token")
        e.preventDefault();
        const formData = new FormData();
        formData.append('first_name', firstnameRef.current?.value);
        formData.append('last_name', lastnameRef.current?.value);
        formData.append('username', usernameRef.current?.value);
        formData.append('email', emailref.current?.value);
        formData.append('password', passwordRef.current?.value);
        formData.append('confirm_password', confirmpasswordRef.current?.value);
        AddWithFormData("/authen/register_delivery", formData).
        then(()=>navigate('/home/delivery'))
    };

    return (
        <div className="d-flex justify-content-center align-items-center">
            <div className="card w-50">
                <div className="card-header bg-primary text-light"><h3>Add Deliver</h3></div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <input ref={firstnameRef} type="text" placeholder="firstname" className="form-control mb-2" />
                        <input ref={lastnameRef} type="text" placeholder="lastname" className="form-control mb-2" />
                        <input ref={usernameRef} type="text" placeholder="username" className="form-control mb-2" />
                        <input ref={emailref} type="text" placeholder="email" className="form-control mb-2" />
                        <input ref={passwordRef} type="text" placeholder="password" className="form-control mb-2" />
                        <input ref={confirmpasswordRef} type="text" placeholder="confirm password" className="form-control mb-2" />
                        <button type="submit" className="btn btn-primary">create</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddDeliver;
