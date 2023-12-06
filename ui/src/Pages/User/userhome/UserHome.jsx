import { useEffect, useState } from "react"
import { getDataWithToken } from "../../../functions"
import { putData } from "../../../functions"
import { Link } from "react-router-dom"

const UserHome = () => {
    const [restaurant, setRestaurant] = useState([])

    useEffect(()=>{
        getDataWithToken('/authen/all_kitchen').
        then((res)=>setRestaurant(res.data.results))
    },[])
    
    return(
        <div class="d-flex justify-content-start container align-items-start gap-2 w-100 vh-100 p-1">
        <div class="border p-3 rounded-2 w-100">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">N</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Username</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
        </div>
      </div>
      
    
    )
}

export default UserHome