import { useEffect, useState } from "react"
import { getDataWithToken, deleteData } from "../../../../functions"
import { Link } from "react-router-dom"

const CategoryHome = () => {
    const [food, setFood] = useState([])

    useEffect(()=>{
        getDataWithToken('/foods/all_categories').
        then((res)=> setFood(res.data.results))
    },[])

    const handleDelete = (id) => {
        deleteData(`/foods/categories_crud/${id}`)
    }
    
    return(
        <div class="d-flex justify-content-center align-items-start gap-2 w-100 vh-100 p-1">
        <div class="border p-3 rounded-2 w-100">
            <Link to={'/home/add-category'} className="btn btn-outline-primary float-end mb-3">+add</Link>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">N</th>
                <th scope="col">Name</th>
                <th scope="col">Kitchen</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
                {food.map((item,index)=>
                <tr key={index}>
                    <th>{index+1}</th>
                    <td>{item.name}</td>
                    <td>{item.kitchen_id.name}</td>
                    <td class="btn-group" role="group" aria-label="Basic mixed styles example">
                    <Link class="btn btn-warning" to={`/home/edit-category/${item.id}`}><i class="fa-solid fa-pen-to-square"></i></Link>
                    <button onClick={(e)=>handleDelete(item.id)} class="btn btn-danger"><i class="fa-solid fa-trash-can"></i></button>
                    {item.is_active?<Link class="btn btn-success" to={`/home/food-details/`}>AddFood</Link>:""}
                    </td>
                </tr>
                )}
            </tbody>
          </table>
        </div>
      </div>
      
    
    )
}

export default CategoryHome