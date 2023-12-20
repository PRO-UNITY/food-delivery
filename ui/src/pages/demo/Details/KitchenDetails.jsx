import { useEffect, useState } from "react"
import DemoLayout from "../../../Layout/Demoproject"
import { getDataWithToken, BASE_URL } from "../../../functions/function"
import { useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

const KitchenDetails = () => {
    const [foods, setFoods] = useState([])
    const [loading, setLoading] = useState(true);
    const {id} = useParams()
    
    useEffect(()=>{
        getDataWithToken(`/kitchen/${id}/foods`).
        then((res)=>{
            console.log(res.data.results)
            setFoods(res.data.results)
            setLoading(false);
        })
    },[])
    return (
        <DemoLayout>
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
            <div className="foods">
                {
                    foods.map((item,index)=>
                    <div key={index} className="food-item bg-white  text-dark" style={{textDecoration:"none"}}>
                    
                    <div className="w-100 d-flex justify-content-center">
                    <img style={{width:"160px", height:"160px", objectFit:"contain", borderRadius:"20px"}} src={`${item?.food_img? BASE_URL+item?.food_img:"https://www.freeiconspng.com/uploads/food-icon-7.png"}`} />
                    </div>
                    {/* <div className="mb-2">
                    <i className="fa-solid fa-star orange"></i>
                    <i className="fa-solid fa-star orange"></i>
                    <i className="fa-solid fa-star orange"></i>
                    <i className="fa-solid fa-star orange"></i>
                    <i className="fa-solid fa-star orange"></i>
                    </div> */}
                    <div className="d-flex justify-content-between w-100 align-items-center">
                        <div>
                        <p className="p-0 m-0">{item?.name}</p>
                        <p style={{fontWeight:800}}><span className="orange">$</span>{item?.price}</p>
                        </div>
                        <button className="btn-add bg-orange"><i className="fa-solid fa-plus"></i></button>
                    </div>
                    {/* <div className="sale">
                        <div className="d-flex justify-content-center align-items-center px-2 text-white sale-percent">15% Off</div>
                        <button style={{color:"rgb(247, 69, 69)"}} className="btn-favourite"><i className="fa-solid fa-heart"></i></button>
                    </div> */}
                    </div>
                    )
                }
            </div>
            </div>
            }
            
        </DemoLayout>
    )
}

export default KitchenDetails