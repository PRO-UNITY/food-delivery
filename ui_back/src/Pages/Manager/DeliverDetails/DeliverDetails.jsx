import { useEffect, useState } from "react"
import { BASE_URL, getDataWithToken, putDataWithounAny } from "../../../functions"
import { useNavigate, useParams } from "react-router-dom"
import { Link } from "react-router-dom"


const DeliverDetails = () => {
  const [order, setOrder] = useState([])
  const [total_price_data, setTotal_price_data] = useState(0)
  const navigate = useNavigate()
  const {id} = useParams()

  useEffect(()=>{
    getDataWithToken(`/delivery/active_delivery_detaile/${id}`).
    then((res)=>{
      setOrder(res)
      setTotal_price_data(res[0].total_price);
    })
  },[])
    return(
        <div class="d-flex justify-content-start flex-column align-items-start gap-2 w-100 vh-100 p-1">
        <div class="p-3 border rounded-2 w-100">
          <table class="table ">
            <thead>
              <tr>
                <th scope="col">N</th>
                <th scope="col">Name Food</th>
                <th scope="col">Address</th>
                <th scope="col">Image</th>
                <th scope="col">Name Client</th>
                <th scope="col">Name Deliver</th>
                <th scope="col">Count</th>
                <th scope="col">Price</th>
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
                    <td className="d-flex flex-column justify-content-center align-items-center">{item.foods.map((i, index)=>
                        <img key={index} style={{width:"50px", height:"50px", objectFit:"contain"}} src={`${BASE_URL}`+i.food_img} alt="" />
                      )} 
                    </td>
                    <td>{item.klient.username}</td>
                    <td>{item.delivery.username}</td>
                    <td>{item.foods?.map((i, index)=>
                    <p>{i.count}</p>
                    )}</td>
                    <td>{item.foods?.map((i, index)=>
                    <p>{i.price}</p>
                    )}</td>
                    <td>{item.foods?.map((i, index)=>
                    <p>{i.total_price}</p>
                    )}</td>
                  </tr>
                  )
                }
            </tbody>
          </table>
          <h4>Total Price : {total_price_data}</h4>
        </div>
      </div>
    )
}

export default DeliverDetails