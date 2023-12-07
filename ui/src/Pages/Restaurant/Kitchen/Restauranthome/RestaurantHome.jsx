import { useEffect, useState } from "react"
import { getDataWithToken, deleteData } from "../../../../functions"
import { Link } from "react-router-dom"

const RestaurantHome = () => {
    const [food, setFood] = useState([])

    useEffect(()=>{
        getDataWithToken('/kitchen/kitchen_create').
        then((res)=> setFood(res))
    },[])

    const handleDelete = (id) => {
        deleteData(`/kitchen/kitchen_crud/${id}`)
    }
    
    return(
        <div class="d-flex justify-content-center align-items-start gap-2 w-100 vh-100 p-1">
        <div class="border p-3 rounded-2 w-100">
            <Link to={'/home/add-kitchen'} className="btn btn-outline-primary float-end mb-3">+add</Link>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">N</th>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
                <th scope="col">Image</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
                {food.map((item,index)=>
                <tr className="align-middle" key={index}>
                    <th>{index+1}</th>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td><img style={{width:"50px", height:"50px"}} src={`https://api.prounity.uz/food-delivery${item.logo}`} alt="" /></td>
                    <td>{item.is_active?"active":"noactive"}</td>
                    <td class="btn-group" role="group" aria-label="Basic mixed styles example">
                    <Link class="btn btn-outline-warning" to={`/home/edit-food/${item.id}`}><i class="fa-solid fa-pen-to-square"></i></Link>
                    <button onClick={(e)=>handleDelete(item.id)} class="btn btn-outline-danger"><i class="fa-solid fa-trash-can"></i></button>
                    </td>
                </tr>
                )}
            </tbody>
          </table>
        </div>
      </div>
      
    
    )
}

export default RestaurantHome