import { useEffect, useRef, useState } from "react"
import DemoLayout from "../../../Layout/Demoproject"
import { BASE_URL, getDataWithToken, getUserData } from "../../../functions/function"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"


const UpdateSettings = () => {
    const [search, setSearch] = useState('')
    const [user, setUser] = useState({})
    const usernameRef = useRef(null)
    const firstnameRef = useRef(null)
    const lastnameRef = useRef(null)
    const emailRef = useRef(null)
    const phoneRef = useRef(null)
    const imgRef = useRef(null)
    const latitudeRef = useRef(null)
    const longitudeRef = useRef(null)
    const navigate = useNavigate()

    useEffect(()=>{
        getUserData('/user').
        then((res)=>setUser(res))
    },[])

    const handleSubmit = async (e) => {
        const token = localStorage.getItem("token")
        e.preventDefault();
        const formData = new FormData();
        formData.append('first_name', firstnameRef.current?.value);
        formData.append('last_name', lastnameRef.current?.value);
        formData.append('phone', phoneRef.current?.value);
        formData.append('email', emailRef.current?.value);
        formData.append('latitude', latitudeRef.current?.value);
        formData.append('longitude', longitudeRef.current?.value);
        if(imgRef.current.files[0]){
            formData.append('avatar', imgRef.current.files[0]);
        }
    
        try {
            await axios.put('https://api.prounity.uz/food-delivery/user', formData, {
                headers: {
                    'Content-Type': 'multipart/formData',
                    Authorization: `Bearer ${token}`,
                },
            });
            navigate('/settings')
        } catch (error) {
            console.error('Error creating category', error);
        }
    };



    return ( 
        <DemoLayout setSearch={setSearch}>
            <div className=" body-main w-100 p-5">
               <form onSubmit={handleSubmit} className="settings">
                <div className="container-avatar">
                    <img  className="avatar-user" src={user.avatar} alt="" />
                    <label htmlFor="fileInput" className="icon-button m-0 p-0"><i className="fa-regular fa-pen-to-square"></i></label>
                    <input ref={imgRef} type="file" id="fileInput" className="form-control mb-3" />
                </div>
                <div className="w-100 mt-5">
                    <label htmlFor="">Firstname</label>
                    <input ref={firstnameRef} defaultValue={user?.first_name} type="text" className="form-control mb-3" />
                    <label htmlFor="">Lastname</label>
                    <input ref={lastnameRef} defaultValue={user?.last_name} type="text" className="form-control mb-3" />
                    <label htmlFor="">Email</label>
                    <input ref={emailRef} defaultValue={user?.email} type="text" className="form-control mb-3" />
                    <label htmlFor="">Phone</label>
                    <input ref={phoneRef} defaultValue={user?.phone? user.phone : ""} type="text" className="form-control mb-3" />
                    <label htmlFor="">Latitude</label>
                    <input ref={latitudeRef} defaultValue={user?.latitude? user.latitude : ""} type="text" className="form-control mb-3" />
                    <label htmlFor="">Longitude</label>
                    <input ref={longitudeRef} defaultValue={user?.longitude? user.longitude : ""} type="text" className="form-control mb-3" />
                    <div className="w-100 d-flex justify-content-center">
                        <button style={{border:"none"}} className="btn-sign-in bg-orange mx-auto w-50">save</button>
                    </div>
                </div>
               </form>
            </div>
        </DemoLayout>
    )
}

export default UpdateSettings