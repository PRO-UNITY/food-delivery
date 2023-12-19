import { useEffect, useState } from "react"
import { getDataWithToken } from "../../../functions"
import { putData } from "../../../functions"
import { Link, useParams } from "react-router-dom"

const RestaurantCategories = () => {
    const [restaurant, setRestaurant] = useState([])
    const [food, setFood] = useState([])
    const [card, setCard] = useState([])
    const {id} = useParams()

    useEffect(()=>{
        getDataWithToken(`/apps/all_categories/${id}`).
        then((res)=>setRestaurant(res))
    },[])

    useEffect(()=>{
        getDataWithToken(`/apps/foods_kitchen/${id}`).
        then((res)=>setFood(res))
    },[])

    const addToCard = (item) => {
      const updatedCard = [...card, { ...item, count: 1 }];
      const totalPrice = updatedCard.reduce((acc, curr) => acc + curr.price, 0);

      localStorage.setItem("card", JSON.stringify(updatedCard));
      setCard(updatedCard);
  }

    useEffect(() => {
      const savedCard = JSON.parse(localStorage.getItem("card")) || [];
      setCard(savedCard);
      console.log(savedCard);
    }, []);
    
    return(
        <div class="d-flex justify-content-start align-items-start gap-2 w-100 vh-100 p-1">
        <div class=" p-3 rounded-2 w-100">
        <h3 className="text-start">Categories</h3>
          <table class="table mb-3 border">
            <thead>
              <tr>
                <th scope="col">N</th>
                <th scope="col">Name Category</th>
                <th scope="col">Foods</th>
              </tr>
            </thead>
            <tbody>
            {
              restaurant.map((item,index)=>
              <tr key={index}>
                <th>{index+1}</th>
                <td>{item.name}</td>
                <td><Link to={`/home/category-foods/${item.id}`} className="btn btn-primary">foods</Link></td>
              </tr>
            )}
            </tbody>
          </table>
        <h3 className="text-start">Foods</h3>
          <table class="table border">
            <thead>
              <tr>
                <th scope="col">N</th>
                <th scope="col">Name</th>
                <th scope="col">Content</th>
                <th scope="col">Price</th>
                <th scope="col">Image</th>
                <th scope="col">Order</th>
              </tr>
            </thead>
            <tbody>
            {
              food.map((item,index)=>
              <tr className="mb-1" key={index}>
                <th>{index+1}</th>
                <td>{item.name}</td>
                <td>{item.content}</td>
                <td>{item.price}</td>
                {/* <td><img style={{width:"50px", height:"50px"}} src={`https://api.prounity.uz/food-delivery${item.food_img}`} alt="" /></td> */}
                <Link to={`/home/order`}><td><button className="btn btn-outline-primary">order</button></td></Link>
                <button onClick={() => addToCard(item)} className="btn btn-success">+</button>
              </tr>
            )}
            </tbody>
          </table>
        </div>
      </div>
      
    
    )
}

export default RestaurantCategories