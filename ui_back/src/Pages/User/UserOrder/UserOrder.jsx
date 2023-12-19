import { useEffect, useState } from "react"
import { getDataWithToken, putData } from "../../../functions"
import { Link, useNavigate, useParams } from "react-router-dom"

const UserOrder = () => {
    const [order, setOrder] = useState([])
    const {id} = useParams()

    useEffect(()=>{
        getDataWithToken(`/delivery/user_active_order`).
        then((res)=>setOrder(res))
    },[])
    
    return(
        <div class="d-flex justify-content-start align-items-start gap-2 w-100 vh-100 p-1">
        <div class="border p-3 rounded-2 w-100">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">N</th>
                <th scope="col">Name Food</th>
                <th scope="col">Content</th>
                <th scope="col">Price</th>
                <th scope="col">Status</th>
                <th scope="col">Ended orders</th>
              </tr>
            </thead>
            <tbody>
            {
              order?.map((item,index)=>
              <tr className="align-middle">
                <th>{index+1}</th>
                <td>{item.foods.map(i=><p>{i.name}</p>)}</td>
                <td>{item.foods.map(i=><p>{i.count}</p>)}</td>
                <td>{item.total_price}</td>
                <td>{item.status.name}</td>
                <td>
                {
                    item.status.id == 6 ? <Link to={`/home/rating/${item.id}`} className="btn btn-outline-success">qabul qildim</Link>:""
                }
                </td>
              </tr>
            )}
            </tbody>
          </table>
        </div>
      </div>
      
    
    )
}

export default UserOrder