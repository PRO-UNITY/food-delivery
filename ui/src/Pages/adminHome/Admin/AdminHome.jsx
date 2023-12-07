import { useEffect, useState } from "react"
import { getDataWithToken } from "../../../functions"
import { putData } from "../../../functions"
import { Link } from "react-router-dom"

const AdminHome = () => {
    const [restaurant, setRestaurant] = useState([])
    const [isactive, setIsActive] = useState(false)

    useEffect(()=>{
        getDataWithToken('/kitchen/all_kitchen').
        then((res)=>setRestaurant(res.data.results))
    },[isactive])

    const applyUser = async (id) => {
        const user = {
            is_active : false
        };
        await putData(user,`/kitchen/kitchen_crud/${id}`)
        setIsActive(p=>!p)
    };
    const disableUser = async (id) => {
        const user = {
            is_active : true
        };
        await putData(user,`/kitchen/kitchen_crud/${id}`)
        setIsActive(p=>!p)
    };
    
    return(
        <div class="d-flex justify-content-start align-items-start gap-2 w-100 vh-100 p-1">
        <div class="border p-3 rounded-2 w-100">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">N</th>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
                {restaurant.map((item, index)=>
                    <tr key={index}>
                        <th scope="row">{index+1}</th>
                        <td>{item.name}</td>
                        <td className={`${item.is_active?"text-success": "text-danger"}`}>{`${item.is_active?"true": "false"}`}</td>
                        <td>
                        <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                            {
                                item.is_active ? <button onClick={()=>applyUser(item.id)} className={"btn btn-outline-danger"} type="button">NoActive</button> 
                                :
                                <button onClick={()=>disableUser(item.id)} className={"btn btn-outline-success"} type="button">Active</button>
                            }
                            <Link class="btn btn-primary" to={`/home/food-details/${item.id}`}>Foods</Link>
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