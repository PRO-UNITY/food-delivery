import { useEffect, useState } from "react"
import { getDataWithToken, putData } from "../../../functions"


const DeliveryHistory = () => {
  const [orders, setOrders] = useState([])
  const [status, setStatus] = useState([])


  useEffect(()=>{
    getDataWithToken('/delivery/active_delivery').
    then((res)=>{
      setOrders(res)
    })
  },[status])

  useEffect(()=>{
    getDataWithToken('/delivery/status_delivery').
    then((res)=>{
        setStatus(res[5]);
    })
  },[])

  const putId = (orderId,id) => {
    const statusId = {
        status : id
    }
    putData(statusId,`/delivery/deteile_order/${orderId}`)
  }

    return(
    <div class="d-flex justify-content-start flex-column align-items-start gap-2 w-100 vh-100 p-1">
        <div class="border p-3 rounded-2 w-100">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">N</th>
                <th scope="col">Name Food</th>
                <th scope="col">Address</th>
                <th scope="col">Status</th>
                <th scope="col">Count</th>
                <th scope="col">Completed</th>
              </tr>
            </thead>
            <tbody>
                {orders?.map((item,index)=>
                <tr key={index} className="align-middle">
                <th>{index+1}</th>
                {/* <th>{item.id}</th> */}
                <td>{item.foods.map(i=>
                    <p>{i.name}</p>
                  )}
                </td>
                <td>{item.address}</td>
                <td>{item.status.name}</td>
                <td>{item.foods.map(i=>
                    <p>{i.count}</p>
                  )}
                </td>
                <td>
                  <button onClick={()=>putId(item.id, status.id)} className="btn btn-outline-success">{status.name}</button>
                </td>
              </tr>
                )}
            </tbody>
          </table>
        </div>
    </div>
    )
}

export default DeliveryHistory