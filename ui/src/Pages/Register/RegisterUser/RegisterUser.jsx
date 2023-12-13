import { Link, useNavigate } from "react-router-dom"
import { useEffect, useRef, useState } from "react";
import { postData } from "../../../functions";

const RegisterUser = () => {
    const [firstname, setFirstname] = useState('')
    const [username, setUsername] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')  
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const navigate = useNavigate();
    const [active, setActive] = useState(false)

    const handleSignUpUser = async (e) => {
        e.preventDefault();
        const user = {
           first_name : firstname, 
           last_name : lastname, 
           username : username,
           email : email,
           password : password,
           confirm_password : password2,
        };
        if(username.length >= 5 && password.length >=8 && password.length === password2.length){
            await postData(user,"/authen/user_signup")
            navigate('/')
        }else{
            alert("something went wrong")
        }  
    };

useEffect(()=>{
    if(username.length >= 5 && password.length >=8 && password === password2 ){
        setActive(true)
        console.log(active);
    }
},[password2])

    return(
        <div className="container d-flex justify-content-center align-items-center py-5">
    <div className="card w-50">
        <div className="card-header bg-primary text-light">
            <h1>User Register</h1>
        </div>
        <div className="card-body">
            <form onSubmit={handleSignUpUser} className="text-align-start">
            <input onChange={(e)=>setFirstname(e.target.value)} placeholder="firstname" className="form-control mb-2" type="text" />
                <input onChange={(e)=>setLastname(e.target.value)}  placeholder="lastname" className="form-control mb-2" type="text" />
                <input onChange={(e)=>setUsername(e.target.value)} placeholder="username" className="form-control mb-2" type="text" />
                <input onChange={(e)=>setEmail(e.target.value)} placeholder="email" className="form-control mb-2" type="text" />
                <input onChange={(e)=>setPassword(e.target.value)} placeholder="password" className="form-control mb-2" type="text" />
                <input onChange={(e)=>setPassword2(e.target.value)} placeholder="repassword" className="form-control mb-2" type="text" />
                <div className="d-flex gap-2 justify-content-between align-items-center">
                <div className="d-flex gap-2">
                    <Link to={'/'}>Sign-in</Link>
                    <Link to={'/sign-up-restaurant'}>Restaurant Register</Link>
                </div>
                    {
                    active ?
                    <button className="btn btn-primary">Register</button> :
                    <button disabled className="btn btn-primary">Register</button>
                    }
                </div>
            </form>
        </div>
    </div>
</div>

    )
}

export default RegisterUser