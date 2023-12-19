import { useEffect, useState } from "react"
import { getDataWithToken } from "../../../functions"
import { putData } from "../../../functions"
import { Link } from "react-router-dom"

const UserHome = () => {
    const [restaurant, setRestaurant] = useState([])

    useEffect(()=>{
        getDataWithToken('/apps/all_kitchen').
        then((res)=>setRestaurant(res.data.results))
    },[])
    
    return(
        <div class="d-flex justify-content-start align-items-start gap-2 w-100 vh-100 p-1">
        <div class="border p-3 rounded-2 w-100">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">N</th>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
                <th scope="col">Working time</th>
                <th scope="col">Latitude</th>
                <th scope="col">Longitude</th>
                <th scope="col">Image</th>
                <th scope="col">Categories</th>
              </tr>
            </thead>
            <tbody>
            {
              restaurant.map((item,index)=>
              <tr>
                <th>{index+1}</th>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.working_time}</td>
                <td>{item.latitude}</td>
                <td>{item.longitude}</td>
                <td><img style={{width:"50px", height:"50px"}} src={`https://api.prounity.uz/food-delivery${item.logo}`} alt="" /></td>
                <td><Link to={`/home/kitchen-categories/${item.id}`} className="btn btn-primary">details</Link></td>
              </tr>
              )
            }
            </tbody>
          </table>
        </div>
      </div>
      
    
    )
}

export default UserHome