import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { postData } from "../../Services/Services";


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
        await postData(passwords,"/auth/password")
        navigate('/settings')
    };

    return (
        <div className="container d-flex justify-content-center align-items-center py-5">
            <div className="card w-50">
                <div className="card-header text-light bg-orange"><h3>Change password</h3></div>
                <div className="card-body">
                    <form onSubmit={handleChange}>
                    <input ref={oldpasswordRef} placeholder="old password" className="form-control mb-2" type="text" />
                    <input ref={newpasswordRef} placeholder="new password" className="form-control mb-2" type="text" />
                    <button className="btn-orange float-end">send</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Changepassword