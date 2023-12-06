import { Link, useNavigate } from "react-router-dom"
import { postData } from "../../functions";
import { useRef } from "react";
import GoogleLogin from 'react-google-login';

const Login = () => {

    const responseGoogle = (response) => {
        console.log(response);
    }

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
          console.log(res.access);
        })
        navigate('/home')
        window.location.reload()
    };

    return(
        <div className="container d-flex justify-content-center align-items-center py-5">
    <div className="card w-50">
        <div className="card-header bg-primary text-light">
            <h1>Sign-in</h1>
        </div>
        <div className="card-body">
            <form onSubmit={handleSignInUser} className="text-align-start">

                <input required ref={usernameRef} placeholder="username" className="form-control mb-2" type="text" />
                <input required ref={passwordRef} placeholder="password" className="form-control mb-2" type="text" />
                <div className="">
                <button className="btn btn-primary mb-3">Sign-in</button>
                <div className="d-flex gap-2 justify-content-center mb-3">
                    <Link to={'/sign-up-user'}>User Register</Link>
                    <Link to={'/sign-up-restaurant'}>Restaurant Register</Link>
                </div>
                <p className="text-secondary">Or continue with :</p>
                
                </div>
            </form>
            <div className="d-flex gap-2 justify-content-center">
                    <button className="round"><img src={'https://png.pngtree.com/png-vector/20221018/ourmid/pngtree-facebook-social-media-icon-png-image_6315968.png'} alt="" /></button>
                    <button className="round"><img src={'https://www.freepnglogos.com/uploads/google-logo-png/google-logo-vector-graphic-pixabay-15.png'} alt="" /></button>
                    <GoogleLogin
                      clientId="779292070672-l8i5b70gc8s2sor3gt4udk0igrrfvifa.apps.googleusercontent.com"
                      buttonText="Login"
                      onSuccess={responseGoogle}
                      onFailure={responseGoogle}
                      cookiePolicy={'single_host_origin'}
                    />,
            </div>
            <Link to={'/forget-password'} className="float-end" href="">forget password ?</Link>
        </div>
    </div>
</div>

    )
}

export default Login