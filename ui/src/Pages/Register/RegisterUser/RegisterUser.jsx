import { Link, useNavigate } from "react-router-dom"
import { useRef } from "react";
import { postData } from "../../../functions";

const RegisterUser = () => {
    const usernameRef = useRef(null);
    const firstnameRef = useRef(null);
    const lastnameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const password2Ref = useRef(null);
    const navigate = useNavigate();

    const handleSignUpUser = async (e) => {
        e.preventDefault();
        const user = {
           first_name : firstnameRef.current?.value, 
           last_name : lastnameRef.current?.value, 
           username : usernameRef.current?.value,
           email : emailRef.current?.value,
           password : passwordRef.current?.value,
           confirm_password : password2Ref.current?.value,
        };
        await postData(user,"/authen/user_signup")
        navigate('/')
    };

    return(
        <div className="container d-flex justify-content-center align-items-center py-5">
    <div className="card w-50">
        <div className="card-header bg-primary text-light">
            <h1>Register</h1>
        </div>
        <div className="card-body">
            <form onSubmit={handleSignUpUser} className="text-align-start">
            <input ref={firstnameRef} placeholder="firstname" className="form-control mb-2" type="text" />
                <input ref={lastnameRef} placeholder="lastname" className="form-control mb-2" type="text" />
                <input ref={usernameRef} placeholder="username" className="form-control mb-2" type="text" />
                <input ref={emailRef} placeholder="email" className="form-control mb-2" type="text" />
                <input ref={passwordRef} placeholder="password" className="form-control mb-2" type="text" />
                <input ref={password2Ref} placeholder="repassword" className="form-control mb-2" type="text" />
                <div className="d-flex gap-2 justify-content-between align-items-center">
                <div className="d-flex gap-2">
                    <Link to={'/'}>Sign-in</Link>
                    <Link to={'/sign-up-restaurant'}>Restaurant Register</Link>
                </div>
                <button className="btn btn-primary">Sign-in</button>
                </div>
            </form>
        </div>
    </div>
</div>

    )
}

export default RegisterUser