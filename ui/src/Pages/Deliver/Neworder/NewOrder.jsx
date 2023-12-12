import { useEffect, useState } from "react"
import { BASE_URL, getDataWithToken, putDataWithounAny } from "../../../functions"
import { useNavigate } from "react-router-dom"


const NewOrder = () => {
  const [order, setOrder] = useState([])
  const navigate = useNavigate()

  useEffect(()=>{
    getDataWithToken(`/delivery/active_order`).
    then((res)=>{
      setOrder(res)
      console.log(res);
    })
  },[])

  const accept = (id) => {
    putDataWithounAny(`/delivery/acceptance_order/${id}`).
    then(()=>navigate('/home/main')).
    then(()=>window.location.reload())
  }

    return(
        <div class="d-flex justify-content-start flex-column align-items-start gap-2 w-100 vh-100 p-1">
        <div class="p-3 border rounded-2 w-100">
          <table class="table table-light">
            <thead>
              <tr>
                <th scope="col">N</th>
                <th scope="col">Name Food</th>
                <th scope="col">Count</th>
                <th scope="col">Status</th>
                <th scope="col">Receive</th>
              </tr>
            </thead>
            <tbody>
                {
                  order.map((item,index)=>
                  <tr key={index} className="align-middle">
                    <th>{index+1}</th>
                    <td>{item.foods.map(i=>
                        <p>{i.name}</p>
                      )}
                    </td>
                    <td>
                    {item.foods.map(i=>
                        <p>{i.count}</p>
                      )}
                    </td>
                    <td>{item.status.name}</td>
                    <td><button onClick={()=>accept(item.id)} className="btn btn-primary">accept</button></td>
                  </tr>
                  )
                }
            </tbody>
          </table>
        </div>
      </div>
    )
}

export default NewOrder