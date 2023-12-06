import { useEffect, useState } from "react"
import { getDataWithToken } from "../../functions"

const UpdateProfile = () => {
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
                <div className="card-header bg-primary text-light"><h3>Update Profile</h3></div>
                <div className="card-body">
                    <input type="file" />
                    <input defaultValue={user?.first_name} type="text" />
                    <input defaultValue={user?.last_name} type="text" />
                    <input defaultValue={user?.username} type="text" />
                </div>
            </div>
        </div>
    )
}

export default UpdateProfile