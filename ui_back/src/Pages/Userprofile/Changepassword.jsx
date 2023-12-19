import { useRef } from "react";
import { postDataWithToken } from "../../functions";
import { useNavigate } from "react-router-dom";


const Changepassword = () => {
    const oldpasswordRef = useRef()
    const newpasswordRef = useRef()
    const navigate = useNavigate()

    const handleChange = async (e) => {
        e.preventDefault();
        const passwords = {
            old_password : oldpasswordRef.current?.value,
            new_password : newpasswordRef.current?.value,
        };
        await postDataWithToken(passwords,"/authen/change_password")
        navigate('/user-profile')
    };

    return (
        <div className="container d-flex justify-content-center align-items-center py-5">
            <div className="card w-50">
                <div className="card-header text-light bg-primary"><h3>Change password</h3></div>
                <div className="card-body">
                    <form onSubmit={handleChange}>
                    <input ref={oldpasswordRef} placeholder="old password" className="form-control mb-2" type="text" />
                    <input ref={newpasswordRef} placeholder="new password" className="form-control mb-2" type="text" />
                    <button className="btn btn-primary">send</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Changepassword