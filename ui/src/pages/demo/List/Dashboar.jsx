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
    const [search, setSearch] = useState("")
    const [searchFoods, setSearchFoods] = useState([])
    const [card, setCard] = useState([])
    const [count, setCount] = useState(0)

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

    useEffect(()=>{
        getDataWithToken(`/foods/?name=${search}`).
        then((res)=>{
            setSearchFoods(res.data.results) 
        })
    },[search])


    const addToCard = (item) => {
        const updatedCard = [...card, { ...item, count: 1 }];
        const totalPrice = updatedCard.reduce((acc, curr) => acc + curr.price, 0);
        setCount(count=>count+1)
  
        localStorage.setItem("card", JSON.stringify(updatedCard));
        setCard(updatedCard);
    }
  
      useEffect(() => {
        const savedCard = JSON.parse(localStorage.getItem("card")) || [];
        setCard(savedCard);
      }, []);
    
    return ( 
        <DemoLayout setSearch={setSearch} count={count}>
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
                
            <div className="w-100 body-main  px-5 py-1">
                {   
                    search != ""?
                    <div className="foods">
                {
                    searchFoods?.map((item, index)=>
                    <Link key={index} className="food-item bg-white  text-dark" style={{textDecoration:"none"}}>
                    
                    <div className="w-100 d-flex justify-content-center">
                    <img className="mb-2" style={{width:"150px", height:"150px", objectFit:"contain", borderRadius:"20px"}} src={`${item?.food_img? BASE_URL+item?.food_img:"https://www.freeiconspng.com/uploads/food-icon-7.png"}`} />
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
                        <p style={{fontWeight:500}} className="p-0 m-0">{item?.name}</p>
                        <p style={{fontWeight:800}}><span className="orange">$</span>{item?.price}</p>
                        </div>
                        {
                            localStorage.getItem('role')!=="undefined"?
                            <button disabled={card.some(cartItem => cartItem.id === item.id)} onClick={()=>addToCard(item)}
                            className={`${card.some(cartItem => cartItem.id === item.id)?"btn-add bg-green":"btn-add bg-orange"}`}>
                            <i className={`${card.some(cartItem => cartItem.id === item.id)?"fa-solid fa-check":"fa-solid fa-plus"}`}></i>
                            </button>:""
                        }
                    </div>
                    <div className="sale">
                        <div className="d-flex justify-content-center align-items-center px-2 text-white sale-percent">15% Off</div>
                        <button style={{}} className="btn-favourite grey"><i className="fa-solid fa-heart"></i></button>
                    </div>
                    </Link>
                    )
                }   
                </div>: 
                    <>
                <div className="vaucher d-flex flex-column justify-content-center align-items-start p-4 mb-4">
                    <h3 className="text-white">Det Discount Vaucher <br /> Up To 20%</h3>
                    <p className="text-white mini-text-vaucher">Lorem ipsum dolor sit amet consectetur adipisicing elit. <br /> Neque reiciendis sit doloremque aliquam </p>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 style={{fontWeight:"bold"}}>Category</h3>
                <Link to={'/allcategories'} style={{fontWeight:600, textDecoration:"none"}} className="orange text-center mb-1 btn-none">View All <i className="fa-solid fa-angle-right"></i></Link>
                </div>
                <div className="categories w-100 mb-3">
                    {
                        category.map((item,index)=>
                            <Link to={`/category/${item.id}`} key={index} className="text-dark" style={{textDecoration:"none"}}>
                            <div className="category-item bg-white">
                            <i style={{fontSize:"35px"}} className="fa-solid fa-bowl-food orange"></i>
                            <p className="name-category p-0 m-0 grey">{item?.name}</p>
                            </div>
                            </Link>
                        )
                    }
                </div>
                <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 style={{fontWeight:"bold"}}>Restaurants</h3>
                <Link to={'/allkitchens'} style={{fontWeight:600, textDecoration:"none"}} className="orange text-center mb-1 btn-none">View All <i className="fa-solid fa-angle-right"></i></Link>
                </div>
                <div className="categories w-100 mb-3">
                    {
                        kitchen.map((item, index)=>
                        <Link key={index} to={`/kitchen/${item.id}`} className="text-dark" style={{textDecoration:"none"}}>
                        <div className="category-item bg-white">
                            <img style={{width:"50px",height:"50px", borderRadius:"10px"}} src={`${item?.logo? BASE_URL+item?.logo:"https://www.freeiconspng.com/uploads/food-icon-7.png"}`} />
                            <p className="name-category p-0 m-0  grey">{item?.name}</p>
                        </div>
                        </Link>
                        )
                    }
                </div>
                <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 style={{fontWeight:"bold"}}>Popular Foods</h3>
                <Link to={'/allfoods'} style={{fontWeight:600, textDecoration:"none"}} className="orange text-center mb-1 btn-none">View All <i className="fa-solid fa-angle-right"></i></Link>
                </div>
                <div className="foods">
                {
                    food.map((item, index)=>
                    <Link key={index} className="food-item bg-white  text-dark" style={{textDecoration:"none"}}>
                    
                    <div className="w-100 d-flex justify-content-center">
                    <img className="mb-2" style={{width:"150px", height:"150px", objectFit:"contain", borderRadius:"20px"}} src={`${item?.food_img? BASE_URL+item?.food_img:"https://www.freeiconspng.com/uploads/food-icon-7.png"}`} />
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
                        <p style={{fontWeight:500}} className="p-0 m-0">{item?.name}</p>
                        <p style={{fontWeight:800}}><span className="orange">$</span>{item?.price}</p>
                        </div>
                        {
                            localStorage.getItem('role')!=="undefined"?
                            <button disabled={card.some(cartItem => cartItem.id === item.id)} onClick={()=>addToCard(item)}
                            className={`${card.some(cartItem => cartItem.id === item.id)?"btn-add bg-green":"btn-add bg-orange"}`}>
                            <i className={`${card.some(cartItem => cartItem.id === item.id)?"fa-solid fa-check":"fa-solid fa-plus"}`}></i>
                            </button>:""
                        }
                    </div>
                    <div className="sale">
                        <div className="d-flex justify-content-center align-items-center px-2 text-white sale-percent">15% Off</div>
                        <button style={{}} className="btn-favourite grey"><i className="fa-solid fa-heart"></i></button>
                    </div>
                    </Link>
                    )
                }   
            </div>
            </>
                }
            
        </div>
            }
            
        </DemoLayout>
    )
}

export default Dashboard