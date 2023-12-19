import { useEffect, useState } from "react"
import { getDataWithToken, putData, putDataWithToken } from "../../../functions"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"


const ManagerMain = () => {
  const [order, setOrder] = useState([])
  const navigate = useNavigate()
  const [status, setStatus] = useState([])

  useEffect(()=>{
    getDataWithToken(`/delivery/active_delivery`).
    then((res)=>{
      setOrder(res)
    })
  },[status])

  useEffect(()=>{
    getDataWithToken('/delivery/status_delivery').
    then((res)=>{
        res.shift()
        res.pop()
        setStatus(res);
    })
  },[status])

  const putId = (orderId,id) => {
    const statusId = {
        status : id
    }
    putData(statusId,`/delivery/deteile_order/${orderId}`)
  }

    return(
        <div class="d-flex justify-content-start flex-column align-items-start gap-2 w-100 vh-100 p-1">
        <div class="p-3 border rounded-2 w-100">
          <table class="table table-light">
            <thead>
              <tr>
                <th scope="col">N</th>
                <th scope="col">Name Food</th>
                <th scope="col">Address</th>
                <th scope="col">Name Client</th>
                <th scope="col">Name Deliver</th>
                <th scope="col">Status</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
                {
                  order?.map((item,index)=>
                  <tr key={index} className="align-middle">
                    <td>{index+1}</td>
                    <td>{item.foods.map(i=>
                    <p>{i.name}</p>    
                    )}</td>
                    <td>{item.address}</td>
                    <td>{item.klient.username}</td>
                    <td>{item.delivery.username}</td>
                    <td>{item.status.name}</td>
                    
                    <td>
                        <Link to={`/home/deliver-details/${item.id}`}  className="btn btn-primary mx-1">details</Link>
                       {
                            status?.map(i=>     
                                <button key={i.id} onClick={()=>putId(item.id, i.id)} className={`${i.id == 2?"btn btn-warning mx-1": i.id == 3? "btn btn-success mx-1" : i.id == 4? "btn btn-info mx-1": i.id == 5? "btn btn-primary mx-1":""}`}>{i.name}</button>    
                            )
                        }
                        
                    </td> 
                  </tr>
                  )
                }
            </tbody>
          </table>
        </div>
      </div>
    )
}

export default ManagerMain