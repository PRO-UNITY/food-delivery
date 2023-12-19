import { useEffect, useState } from "react"
import DemoLayout from "../../../Layout/Demoproject"
import { BASE_URL, getDataWithToken } from "../../../functions/function"
import { Link } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState([])
    const [kitchen, setKitchen] = useState([])
    const [food, setFood] = useState([])

    useEffect(()=>{
        getDataWithToken(`/kitchen/category`).
        then((res)=>{
            setCategory(res)
            setLoading(false);
        })
    },[])

    useEffect(()=>{
        getDataWithToken(`/kitchen/`).
        then((res)=>{
            const partKitchen = res.data.results.slice(0,7)
            setKitchen(partKitchen)
            setLoading(false);
        })
    },[])

    useEffect(()=>{
        getDataWithToken(`/foods/`).
        then((res)=>{
            const partFood = res.data.results.slice(0,3)
            setFood(partFood)
            setLoading(false);
        })
    },[])

    if (loading) {
        return (
            <div className="container d-flex justify-content-center align-items-center py-5">
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
            </div>
        )
    }
    return ( 
        <DemoLayout>
            <div className="w-100 body-main  p-5">
                
                <div className="d-flex justify-content-between align-items-center mb-3">
                <h3>Favourite Foods</h3>
                </div>
                <div className="foods">
                    {
                        food.map((item, index)=>
                        <Link key={index} className="food-item bg-white  text-dark" style={{textDecoration:"none"}}>
                        
                        <div className="w-100 d-flex justify-content-center">
                        <img style={{width:"160px", height:"160px", objectFit:"contain", borderRadius:"20px"}} src={`${item?.food_img? BASE_URL+item.food_img:"https://www.freeiconspng.com/uploads/food-icon-7.png"}`} />
                        </div>
                        <div className="d-flex justify-content-between w-100 align-items-center">
                            <div>
                            <p className="p-0 m-0">{item.name}</p>
                            <p style={{fontWeight:800}}><span className="orange">$</span>{item.price}</p>
                            </div>
                            <button className="btn-add bg-orange"><i className="fa-solid fa-plus"></i></button>
                        </div>
                        </Link>
                        )
                    }   
                </div>
            </div>
        </DemoLayout>
    )
}

export default Dashboard