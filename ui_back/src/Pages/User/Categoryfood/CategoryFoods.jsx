import { useEffect, useState } from "react"
import { getDataWithToken } from "../../../functions"
import { Link, useParams } from "react-router-dom"

const CategoryFoods = () => {
    const [food, setFood] = useState([])
    const {id} = useParams()

    useEffect(()=>{
        getDataWithToken(`/foods/categories_foods/${id}`).
        then((res)=>setFood(res))
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
                <th scope="col">Category</th>
                <th scope="col">Image</th>
                <th scope="col">Order</th>
              </tr>
            </thead>
            <tbody>
            {
              food.map((item,index)=>
              <tr className="align-middle">
                <th>{index+1}</th>
                <td>{item.name}</td>
                <td>{item.content}</td> 
                <td>{item.price}</td> 
                <td>{item.categories_id.name}</td> 
                <td><img style={{width:"50px", height:"50px"}} src={`https://api.prounity.uz/food-delivery${item.food_img}`} alt="" /></td>
                <Link to={`/home/order`}><td><button className="btn btn-outline-primary">order</button></td></Link>
              </tr>
            )}
            </tbody>
          </table>
        </div>
      </div>
      
    
    )
}

export default CategoryFoods