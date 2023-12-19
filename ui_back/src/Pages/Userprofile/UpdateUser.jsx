import { useEffect, useRef, useState } from "react"
import { getDataWithToken } from "../../functions"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const UpdateProfile = () => {
    const [user, setUser] = useState()
    const imgRef = useRef()
    const firstnameRef = useRef()
    const lastnameRef = useRef()
    const usernameRef = useRef()
    const phoneRef = useRef()
    const emailRef = useRef()
    const navigate = useNavigate()


    useEffect(()=>{
        getDataWithToken('/auth/user_profiles').
        then((res)=>
         {setUser(res)
        console.log(res);
        })
    },[])

    const handleSubmit = async (e) => {
        const token = localStorage.getItem("token")
        e.preventDefault();
        const formData = new FormData();
        formData.append('first_name', firstnameRef.current?.value);
        formData.append('last_name', lastnameRef.current?.value);
        formData.append('username', usernameRef.current?.value);
        formData.append('phone', phoneRef.current?.value);
        formData.append('email', emailRef.current?.value);
        if(imgRef.current.files[0]){
            formData.append('avatar', imgRef.current.files[0]);
        }

        try {
            const response = await axios.put('https://api.prounity.uz/food-delivery/auth/user_update', formData, {
                headers: {
                    'Content-Type': 'multipart/formData',
                    Authorization: `Bearer ${token}`,
                },
            });
            navigate('/user-profile'); 
        } catch (error) {


            
            console.error('Error creating category', error);
        }
    };



    return(
        <div className="container w-100 p-5 d-flex justify-content-center">
            <div className="card w-50">
                <div className="card-header bg-primary text-light"><h3>Update Profile</h3></div>
                <div className="card-body">
                    <form onSubmit={handleSubmit} >
                        <input ref={imgRef} className="form-control mb-2" type="file" />
                        <input ref={firstnameRef} className="form-control mb-2" defaultValue={user?.first_name} type="text" />
                        <input ref={lastnameRef} className="form-control mb-2" defaultValue={user?.last_name} type="text" />
                        <input ref={usernameRef} className="form-control mb-2" defaultValue={user?.username} type="text" />
                        <input ref={emailRef} className="form-control mb-2" defaultValue={user?.email} type="text" />
                        <input ref={phoneRef} className="form-control mb-2" defaultValue={user?.phone} type="text" />
                        <button className="btn btn-outline-primary">save</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UpdateProfile