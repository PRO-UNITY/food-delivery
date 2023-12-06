import { useEffect, useState } from "react"
import { getDataWithToken } from "../../functions"

const UserProfile = () => {
    const [user, setUser] = useState()

    useEffect(()=>{
        getDataWithToken('/authen/user_profiles').
        then((res)=>
         {setUser(res)
        console.log(res);
        })
    },[])

    return(
        <div className="container w-100 p-5 d-flex justify-content-center">
            <div className="card w-50">
                <div className="card-header bg-primary text-light"><h3>User-Profile</h3></div>
                <div className="card-body">
                    <div className="w-100 d-flex justify-content-center align-items-center">
                        <img style={{width:"100px", height:"100px"}} src={user?.avatar ? `https://api.prounity.uz/food-delivery${user?.avatar}`: "https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"} alt="" />
                    </div>
                    <ul class="list-group">
                        <li class="list-group-item text-start">First-name : {user?.first_name}</li>
                        <li class="list-group-item text-start">Last-name : {user?.last_name}</li>
                        <li class="list-group-item text-start">Username : {user?.username}</li>
                        <li class="list-group-item text-start">Email : {user?.email}</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default UserProfile