import { Link, useNavigate } from "react-router-dom"
import { postData } from "../../../functions";
import { useEffect, useState } from "react";

const RegisterRestaurant = () => {
    const [firstname, setFirstname] = useState('')
    const [username, setUsername] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [kitchen, setKitchen] = useState('')
    const navigate = useNavigate();
    const [active, setActive] = useState(false)
    const [alertMessage, setAlertMessage] = useState({
        text:"",
        type:""
    })

    const handleSignUpRestaurant = async (e) => {
        e.preventDefault();
        const user = {
            first_name : firstname, 
            last_name : lastname, 
            username : username,
            email : email,
            password : password,
            confirm_password : password2,
            kitchen_name : kitchen
         };            
                const res = await postData(user,"/auth/kitchen_register")
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
        if(username != "" && firstname != "" && lastname != "" && email != "" && password != "" && password2 != "" && kitchen != "" ){
            setActive(true)
            console.log(active);
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
            <h1>Register as Restaurant</h1>
        </div>
        <div className="card-body">
            <form onSubmit={handleSignUpRestaurant} className="text-align-start">
                <div className="text-start"><label className="">Type your Firstname</label></div>
                <input required onChange={(e)=>setFirstname(e.target.value)} placeholder="firstname" className="form-control mb-2" type="text" />
                <div className="text-start"><label className="">Type your Lastname</label></div>
                <input required onChange={(e)=>setLastname(e.target.value)} placeholder="lastname" className="form-control mb-2" type="text" />
                <div className="text-start"><label className="">Type your Username</label></div>
                <input required onChange={(e)=>setUsername(e.target.value)} placeholder="username" className="form-control mb-2" type="text" />
                <div className="text-start"><label className="">Type your Restaurant Name</label></div>
                <input required onChange={(e)=>setKitchen(e.target.value)} placeholder="kitchenname" className="form-control mb-2" type="text" />
                <div className="text-start"><label className="">Type your Email</label></div>
                <input required onChange={(e)=>setEmail(e.target.value)} placeholder="email" className="form-control mb-2" type="email"/>
                <div className="text-start"><label className="">Type your Password</label></div>
                <input required onChange={(e)=>setPassword(e.target.value)} placeholder="password" className="form-control mb-2" type="text"/>
                <div className="text-start"><label className="">Type your confirm Password</label></div>
                <input required onChange={(e)=>setPassword2(e.target.value)} placeholder="repassword" className="form-control mb-2" type="text"/>
                <div className="d-flex gap-2 justify-content-between align-items-center">
                <div className="d-flex gap-2">
                    <Link to={'/'}>Sign-in</Link>
                    <Link to={'/sign-up-user'}>User Register</Link>
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

export default RegisterRestaurant