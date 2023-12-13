import { Link, useNavigate } from "react-router-dom"
import { postData } from "../../functions";
import { useRef } from "react";
import { useGoogleLogin } from '@react-oauth/google';
import axios from "axios";


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
          if(localStorage.getItem("token") !== "undefined" ){
            navigate('/home')
            window.location.reload()
        }
        })
    };

    const login = useGoogleLogin({
        onSuccess: async (response) => {
            try {
                const res = await axios.post(
                    "https://api.prounity.uz/food-delivery/auth/google/login",
                    {
                        token :response.access_token
                    }
                )
                localStorage.setItem('token',res.data.access_token)
                navigate('/home')
                window.location.reload()
            } catch (err) {
                console.log(err)
            }
        }
    });


    // const responseGoogle = async (response) => {
    //     try {
    //         const backendResponse = await axios.post(
    //         'https://api.prounity.uz/food-delivery/auth/google/login',
    //         {token: response.tokenId}
    //     )
    //     console.log(response);
    //     const {token} = backendResponse.data;

    //     localStorage.setItem('token', token);
    //     } catch (error) {
    //         console.error("Google login failed : ", error.message )
    //     }
    // }

    return(
        <div className="container d-flex justify-content-center align-items-center py-5">
            <div className="card w-50">
                <div className="card-header bg-primary text-light">
                    <h1>Sign-in</h1>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSignInUser} className="text-align-start">
                        <div className="text-start"><label className="">Type your Uersname</label></div>
                        <input required ref={usernameRef} placeholder="username" className="form-control mb-2" type="text" />
                        <div className="text-start"><label className="">Type your Password</label></div>
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
                        <button className="round" onClick={() => login()}>
                        <img src={'https://static-00.iconduck.com/assets.00/google-icon-2048x2048-czn3g8x8.png'} alt="" />
                        </button>
                    </div>
                    <Link to={'/forget-password'} className="float-end" href="">forget password ?</Link>
                </div>
            </div>
        </div>

    )
}

export default Login

            {/*                     <button className="round"><img src={'https://png.pngtree.com/png-vector/20221018/ourmid/pngtree-facebook-social-media-icon-png-image_6315968.png'} alt="" /></button>
 */}