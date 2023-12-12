import { useEffect, useState } from "react"
import { getDataWithToken, deleteData } from "../../../../functions"
import { Link } from "react-router-dom"
import { putData } from "../../../../functions"

const ManagerHome = () => {
    const [manager, setManager] = useState([])
    const [isactive, setIsActive] = useState(false)


    useEffect(()=>{
        getDataWithToken('/authen/manager_user').
        then((res)=> setManager(res))
    },[isactive])

    // const handleDelete = (id) => {
    //     deleteData(`/kitchen/kitchen_crud/${id}`)
    // }

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
        <div class="d-flex justify-content-center align-items-start gap-2 w-100 vh-100 p-1">
        <div class="border p-3 rounded-2 w-100">
            <Link to={'/home/create-manager'} className="btn btn-outline-primary float-end mb-3">+add</Link>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">N</th>
                <th scope="col">First_name</th>
                <th scope="col">Last_name</th>
                <th scope="col">Username</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
                {manager?.map((item,index)=>
                <tr className="align-middle" key={index}>
                    <th>{index+1}</th>
                    <td>{item.first_name}</td>
                    <td>{item.last_name}</td>
                    <td>{item.username}</td>
                    <td className={`${item.active_profile ?"text-success":"text-danger"}`}>{`${item.active_profile ?"true":"false"}`}</td>
                    <td class="btn-group" role="group" aria-label="Basic mixed styles example">
                    {
                        item.active_profile?
                        <button onClick={()=>disableUser(item.id)} className={"btn btn-outline-danger"} type="button"><i class="fa-regular fa-circle-xmark fs-7"></i></button>:
                        <button onClick={()=>applyUser(item.id)} className={"btn btn-outline-success"} type="button"><i class="fa-solid fa-check fs-7"></i></button>
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

export default ManagerHome