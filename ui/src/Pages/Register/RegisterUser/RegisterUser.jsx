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
    const [alertMessage, setAlertMessage] = useState({
        text:"",
        type:""
    })

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
            const res = await postData(user,"/auth/user_signup")
            if(res && res.token){
                console.log(res);
                setAlertMessage({
                    text: `Registration successfully`,
                    type: 'success',
                });
                setTimeout(()=>{
                    setAlertMessage('')
                    navigate('/');
                },2000)

            }else{
                if (res && typeof res === 'object' && Object.keys(res).length > 0) {
                    const errorMessage = Object.keys(res).map(field => (
                        Array.isArray(res[field])
                            ? res[field].map(error => `${field}: ${error}`).join(', ')
                            : `${field}: ${res[field]}`
                    )).join(', ');
    
                    setAlertMessage({
                        text: `Error during registration: ${errorMessage}`,
                        type: 'danger',
                    });
                }
            }
         
    };

useEffect(()=>{
    if(username != "" && firstname != "" && lastname != "" && email != "" && password != "" && password2 != "" ){
        setActive(true)
    }
},[password2])

    return(
    <div className="container d-flex flex-column justify-content-center align-items-center py-5">
    {alertMessage && (
    <div className={`alert alert-${alertMessage.type} w-50 m-auto my-3`} role="alert">
        {alertMessage.text}
    </div>
    )}
    <div className="card w-50">
        <div className="card-header bg-primary text-light">
            <h1>User Register</h1>
        </div>
        <div className="card-body">
            <form onSubmit={handleSignUpUser} className="text-align-start">
                <div className="text-start"><label className="">Type your Firstname</label></div>
                <input onChange={(e)=>setFirstname(e.target.value)} placeholder="firstname" className="form-control mb-2" type="text" />
                <div className="text-start"><label className="">Type your Lastname</label></div>
                <input onChange={(e)=>setLastname(e.target.value)}  placeholder="lastname" className="form-control mb-2" type="text" />
                <div className="text-start"><label className="">Type your Username</label></div>
                <input onChange={(e)=>setUsername(e.target.value)} placeholder="username" className="form-control mb-2" type="text" />
                <div className="text-start"><label className="">Type your Email</label></div>
                <input onChange={(e)=>setEmail(e.target.value)} placeholder="email" className="form-control mb-2" type="text" />
                <div className="text-start"><label className="">Type your Password</label></div>
                <input onChange={(e)=>setPassword(e.target.value)} placeholder="password" className="form-control mb-2" type="text" />
                <div className="text-start"><label className="">Type your confirm Password</label></div>
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