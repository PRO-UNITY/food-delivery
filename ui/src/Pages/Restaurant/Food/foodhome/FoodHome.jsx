import { useEffect, useState } from "react"
import { getDataWithToken, deleteData } from "../../../../functions"
import { Link } from "react-router-dom"

const FoodHome = () => {
    const [food, setFood] = useState([])

    useEffect(()=>{
        getDataWithToken('/foods/all_foods').
        then((res)=> setFood(res.data.results))
    },[])

    const handleDelete = (id) => {
        deleteData(`/foods/foods_crud/${id}`)
    }
    
    return(
        <div class="d-flex justify-content-center align-items-start gap-2 w-100 vh-100 p-1">
        <div class="border p-3 rounded-2 w-100">
            <Link to={'/home/add-food'} className="btn btn-outline-primary float-end mb-3">+add</Link>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">N</th>
                <th scope="col">Name</th>
                <th scope="col">Content</th>
                <th scope="col">Price</th>
                <th scope="col">Category</th>
                <th scope="col">Image</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
                {food.map((item,index)=>
                <tr className="align-middle" key={index}>
                    <th>{index+1}</th>
                    <td>{item.name}</td>
                    <td>{item.content}</td>
                    <td>{item.price}</td>
                    <td>{item.categories_id.name}</td>
                    <td><img style={{width:"50px", height:"50px"}} src={`https://api.prounity.uz/food-delivery${item.food_img}`} alt="" /></td>
                    <td class="btn-group" role="group" aria-label="Basic mixed styles example">
                    <Link class="btn btn-warning" to={`/home/edit-foodrestaurant/${item.id}`}>Edit</Link>
                    <button onClick={(e)=>handleDelete(item.id)} class="btn btn-danger">Delete</button>
                    {item.is_active?<Link class="btn btn-success" to={`/home/food-details/`}>AddFood</Link>:""}
                    </td>
                </tr>
                )}
                {/* <tr>
                    <th>1</th>
                    <td>osh</td>
                    <td>1 pors</td>
                    <td>30 000</td>
                    <td class="btn-group" role="group" aria-label="Basic mixed styles example">
                    <Link class="btn btn-outline-warning"><i class="fa-solid fa-pen-to-square"></i></Link>
                    <button  class="btn btn-outline-danger"><i class="fa-solid fa-trash-can"></i></button>
                    </td>
                </tr> */}
            </tbody>
          </table>
        </div>
      </div>
      
    
    )
}

export default FoodHome