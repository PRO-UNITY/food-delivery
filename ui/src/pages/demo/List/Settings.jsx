import { useEffect, useState } from "react"
import DemoLayout from "../../../Layout/Demoproject"
import { BASE_URL, getDataWithToken, getUserData } from "../../../functions/function"
import { Link } from "react-router-dom"


const Settings = () => {
    const [search, setSearch] = useState('')
    const [user, setUser] = useState({})

    useEffect(()=>{
        getUserData('/user').
        then((res)=>setUser(res))
    },[])


    return ( 
        <DemoLayout setSearch={setSearch}>
            <div className=" body-main w-100 p-5">
               <div className="settings">
                <div className="container-avatar">
                    <img  className="avatar-user" src={user.avatar} alt="" />
                </div>
                <div className="w-100 mt-5">
                    <ul className="list-group w-100 mb-3">
                        <li className="list-group-item">Username : {user?.username}</li>
                        <li className="list-group-item">Firstname : {user?.first_name}</li>
                        <li className="list-group-item">Lastname : {user?.last_name}</li>
                        <li className="list-group-item">Email : {user?.email}</li>
                        <li className="list-group-item">Phone number : {user?.phone? user.phone : "No number yet"}</li>
                    </ul>
                    <div className="w-100 d-flex justify-content-center">
                        <Link to={'/update-settings'} style={{border:"none"}} className="btn-sign-in bg-orange mx-auto">update profile</Link>
                    </div>
                </div>
               </div>
            </div>
        </DemoLayout>
    )
}

export default Settings