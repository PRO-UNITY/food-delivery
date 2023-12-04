import { useEffect, useState } from "react"
import { getDataWithToken } from "../../functions"
import { putData } from "../../functions"

const AdminHome = () => {
    const [restaurant, setRestaurant] = useState([])
    const [isactive, setIsActive] = useState(false)

    useEffect(()=>{
        getDataWithToken('/authen/all_kitchen_views/').
        then((res)=>setRestaurant(res.data.results))
    },[isactive])

    const applyUser = async (id) => {
        const user = {
            active_profile : false
        };
        await putData(user,`/authen/user_deteilse_views/${id}`)
        setIsActive(p=>!p)
    };
    const disableUser = async (id) => {
        const user = {
            active_profile : true
        };
        await putData(user,`/authen/user_deteilse_views/${id}`)
        setIsActive(p=>!p)
    };
    
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
                {restaurant.map((item, index)=>
                    <tr key={index}>
                        <th scope="row">{index+1}</th>
                        <td>{item.first_name}</td>
                        <td>{item.last_name}</td>
                        <td>{item.username}</td>
                        <td className={`${item.active_profile?"text-success": "text-danger"}`}>{`${item.active_profile?"true": "false"}`}</td>
                        <td>
                        <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                            {
                                item.active_profile ? <button onClick={()=>applyUser(item.id)} className={"btn btn-outline-success"} type="button">Active</button> 
                                :
                                <button onClick={()=>disableUser(item.id)} className={"btn btn-outline-danger"} type="button">NoActiv</button>
                            }
                            <button type="button" class="btn btn-primary">Foods</button>
                        </div>
                        </td>
                    </tr>
                )}
            </tbody>
          </table>
        </div>
      </div>
      
    
    )
}

export default AdminHome