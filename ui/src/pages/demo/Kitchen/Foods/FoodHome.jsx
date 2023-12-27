import { useEffect, useState } from "react"
import DemoLayout from "../../../../Layout/Demoproject";
import { deleteData, getUserData } from "../../../../functions/function"; 
import Button from 'react-bootstrap/Button';
import Pagination from 'react-bootstrap/Pagination';
import Spinner from 'react-bootstrap/Spinner';
import { Link } from "react-router-dom";

const FoodHome = () => {
    const [foods,setFoods] = useState([])
    const [loading,setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [isactive, setIsactive] = useState(false)


    useEffect(()=>{
        getUserData(`/foods/`).
        then((res)=>{
            setFoods(res.data.results)
            console.log(res)
            setLoading(false)
        })
    },[isactive])

    const deleteFood = (id) => {
        deleteData(`/foods/${id}`).then(()=>setIsactive(p=>!p)
        )
    }

    return (
        <DemoLayout setSearch={setSearch}>
            {
                loading?
                <div className="container body-main d-flex justify-content-center align-items-center py-5">
                <Button variant="warning" disabled>
                    <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    />
                    Loading...
                </Button>
                </div>:
                <div className="body-main w-100 p-5">
                <div className="d-flex justify-content-between align-items-center">
                <h3 style={{fontWeight:700}}>All Foods</h3>
                <Link to={'/add-food'} className="orange">Add Restaurant</Link>
                </div>
                <div className="foods">
                {
                    foods.map((item, index)=>
                    <div key={index} className="food-item bg-white  text-dark" style={{textDecoration:"none"}}>    
                    <Link to={`/food-detail/${item.id}`} className="w-100 d-flex justify-content-center">
                    <img className="mb-2" style={{width:"100px", height:"100px", objectFit:"contain", borderRadius:"20px"}} src={`${item?.food_img? item?.food_img:"https://www.freeiconspng.com/uploads/food-icon-7.png"}`} />
                    </Link>
                    <div className="mb-2">
                    <i className="fa-solid fa-star orange"></i>
                    <i className="fa-solid fa-star orange"></i>
                    <i className="fa-solid fa-star orange"></i>
                    <i className="fa-solid fa-star orange"></i>
                    <i className="fa-solid fa-star orange"></i>
                    </div>
                    <div className="d-flex justify-content-between w-100 align-items-center">
                        <div>
                        <p style={{fontWeight:500}} className="p-0 m-0">{item?.name}</p>
                        <p style={{fontWeight:800}}><span className="orange">$</span>{item?.price}</p>
                        </div>
                        <Link style={{textDecoration:"none"}} to={`/food/${item.id}`} className={`btn-add bg-green`}><i className="fa-solid fa-eye"></i></Link>
                    </div>
                    <div className="sale">
                        <div className="d-flex justify-content-center align-items-center px-2 text-white sale-percent">15% Off</div>    
                        <button onClick={()=>deleteFood(item.id)}  className="btn-favourite text-danger"><i className="fa-solid fa-trash"></i></button>
         
                    </div>
                    </div>
                    )
                }   
            </div>
                </div>
            }
        </DemoLayout>
    )
}

export default FoodHome