import { useEffect, useState } from "react"
import DemoLayout from "../../../Layout/Demoproject"
import { BASE_URL, getDataWithToken } from "../../../functions/function"

const Dashboard = () => {
    const [category, setCategory] = useState([])
    const [kitchen, setKitchen] = useState([])
    const [food, setFood] = useState([])

    useEffect(()=>{
        getDataWithToken(`/kitchen/category`).
        then((res)=>{
            setCategory(res)
        })
    },[])

    useEffect(()=>{
        getDataWithToken(`/kitchen/`).
        then((res)=>{
            setKitchen(res)
        })
    },[])

    useEffect(()=>{
        getDataWithToken(`/foods/`).
        then((res)=>{
            setFood(res)
        })
    },[])

    return ( 
        <DemoLayout>
            <div className="w-100 body-main  p-5">
                <div className="vaucher d-flex flex-column justify-content-center align-items-start p-4 mb-4">
                    <h3 className="text-white">Det Discount Vaucher <br /> Up To 20%</h3>
                    <p className="text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit. <br /> Neque reiciendis sit doloremque aliquam </p>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-3">
                <h3>Category</h3>
                <button className="orange text-center mb-1 btn-none">View All <i className="fa-solid fa-angle-right"></i></button>
                </div>
                <div className="categories w-100 mb-3">
                    {
                        category.map((item,index)=>
                            <div className="category-item bg-white">
                                <img style={{width:"50px",height:"50px", borderRadius:"10px"}} src={`${BASE_URL}${item.kitchen.logo}`} alt="" />
                            <p className="name-category">{item.name}</p>
                            </div>
                        )
                    }
                </div>
                <div className="d-flex justify-content-between align-items-center mb-3">
                <h3>Restaurants</h3>
                <button className="orange text-center mb-1 btn-none">View All <i className="fa-solid fa-angle-right"></i></button>
                </div>
                <div className="categories w-100 mb-3">
                    {
                        kitchen.map((item, index)=>
                        <div className="category-item bg-white">
                                <img style={{width:"50px",height:"50px", borderRadius:"10px"}} src={`${BASE_URL}${item.logo}`} alt="" />
                        <p className="name-category">{item.name}</p>
                    </div>
                        )
                    }
                </div>
                <div className="d-flex justify-content-between align-items-center mb-3">
                <h3>Popular Foods</h3>
                <button className="orange text-center mb-1 btn-none">View All <i className="fa-solid fa-angle-right"></i></button>
                </div>
                <div className="foods">
                    {
                        food.map((item, index)=>
                        <div className="food-item bg-white">
                        <div className="w-100 d-flex justify-content-center">
                        <img style={{width:"160px", height:"160px", objectFit:"contain"}} src={`${BASE_URL}${item.food_img}`} alt="" />
                        </div>
                        <div className="mb-2">
                        <i className="fa-solid fa-star orange"></i>
                        <i className="fa-solid fa-star orange"></i>
                        <i className="fa-solid fa-star orange"></i>
                        <i className="fa-solid fa-star orange"></i>
                        <i className="fa-solid fa-star orange"></i>
                        </div>
                        <div className="d-flex justify-content-between w-100 align-items-center">
                            <div>
                            <p className="p-0 m-0">{item.name}</p>
                            <p style={{fontWeight:800}}><span className="orange">$</span>{item.price}</p>
                            </div>
                            <button className="btn-add bg-orange"><i className="fa-solid fa-plus"></i></button>
                        </div>
                        <div className="sale">
                            <div className="d-flex justify-content-center align-items-center px-2 text-white sale-percent">15% Off</div>
                            <button style={{color:"rgb(247, 69, 69)"}} className="btn-favourite"><i className="fa-solid fa-heart"></i></button>
                        </div>
                    </div> 
                        )
                    }   
                </div>
            </div>
        </DemoLayout>
    )
}

export default Dashboard