import { useEffect, useState } from "react"
import { getDataWithToken } from "../../../../functions"
import { Link, useParams } from "react-router-dom"
import { putData } from "../../../../functions"

const Delivery = () => {
    const [delivery, setDelivery] = useState([])
    const [isactive, setIsActive] = useState(false)


    useEffect(()=>{
        getDataWithToken(`/authen/delivery_user`).
        then((res)=>setDelivery(res))
    },[isactive])

    const applyUser = async (id) => {
      const user = {
          active_profile : true
      };
      await putData(user,`/authen/delivery_user_crud/${id}`)
      setIsActive(p=>!p)
    };

    const disableUser = async (id) => {
      const user = {
        active_profile : false
      };
      await putData(user,`/authen/delivery_user_crud/${id}`)
      setIsActive(p=>!p)
    };
    
    return(
          <div class="d-flex justify-content-start align-items-start gap-2 w-100 vh-100 p-1">
          <div class="border p-3 rounded-2 w-100">
            <Link to={'/home/create-deliver'} className="btn btn-outline-primary float-end">+create</Link>
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">N</th>
                  <th scope="col">Full name</th>
                  <th scope="col">Username</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
              {
                delivery?.map((item,index)=>
                <tr className="align-middle">
                  <th>{index+1}</th>
                  <td>{`${item.first_name} ${item.last_name}`}</td>
                  <td>{item.username}</td> 
                  <td className={`${item.active_profile ?"text-success":"text-danger"}`}>{`${item.active_profile ?"true":"false"}`}</td>
                  <td>
                    <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                      {
                        item.active_profile?
                        <button onClick={()=>disableUser(item.id)} className={"btn btn-outline-danger"} type="button"><i class="fa-regular fa-circle-xmark fs-7"></i></button>:
                        <button onClick={()=>applyUser(item.id)} className={"btn btn-outline-success"} type="button"><i class="fa-solid fa-check fs-7"></i></button>
                      }
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

export default Delivery