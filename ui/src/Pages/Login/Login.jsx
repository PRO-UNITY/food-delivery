import { Link, useNavigate } from "react-router-dom"
import { postData } from "../../functions";
import { useRef } from "react";

const Login = () => {
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const navigate = useNavigate();

    const handleSignInUser = async (e) => {
        e.preventDefault();
        const user = {
           username : usernameRef.current?.value,
           password : passwordRef.current?.value,
        };
        await postData(user,"/token/").then((res)=>{
          localStorage.setItem('token',res.access)
        })
        navigate('/home')
    };

    return(
        <div className="container d-flex justify-content-center align-items-center py-5">
    <div className="card w-50">
        <div className="card-header bg-primary text-light">
            <h1>Sign-in</h1>
        </div>
        <div className="card-body">
            <form onSubmit={handleSignInUser} className="text-align-start">

                <input ref={usernameRef} placeholder="username" className="form-control mb-2" type="text" />
                <input ref={passwordRef} placeholder="password" className="form-control mb-2" type="text" />
                <div className="d-flex gap-2 justify-content-between align-items-center">
                <div className="d-flex gap-2">
                    <Link to={'/sign-up-user'}>User Register</Link>
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

export default Login