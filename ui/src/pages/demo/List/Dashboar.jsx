import { useEffect, useState } from "react"
import DemoLayout from "../../../Layout/Demoproject"
import { BASE_URL, getDataWithToken } from "../../../functions/function"
import { Link } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Pagination from 'react-bootstrap/Pagination';

const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState([])
    const [kitchen, setKitchen] = useState([])
    const [food, setFood] = useState([])
    const [search, setSearch] = useState("")
    const [searchFoods, setSearchFoods] = useState([])
    const [card, setCard] = useState([])
    const [favourite, setFavourite] = useState(JSON.parse(localStorage.getItem('favourite')) || [])
    const [count, setCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [bool, setBool] = useState(true)

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
            const residual = res.data.count%10
            const pages = (res.data.count-residual)/10
            setTotalPages(pages%2==0 && pages ===1?pages:pages+1);
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

      const addToFavourite = (item,index) => {
        if(bool){
            const updatedFavourite = [...favourite, { ...item }];
            localStorage.setItem("favourite", JSON.stringify(updatedFavourite));
            setFavourite(updatedFavourite);
            setBool(false)
        }else{
            removeItem(index) 
        }
    }

    const removeItem = (index) => {
        const newFavourite = [...favourite];
        newFavourite.splice(index, 1)
        setFavourite(newFavourite)
        localStorage.setItem('favourite', JSON.stringify(newFavourite))
        setBool(true)
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleNextPage = () => {
        if (currentPage <= 1) {
            setCurrentPage(currentPage + 1);
        }
       
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };
    
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
                    <Link to={`/food-detail/${item.id}`} key={index} className="food-item bg-white  text-dark" style={{textDecoration:"none"}}>
                    
                    <div className="w-100 d-flex justify-content-center">
                    <img className="mb-2" style={{width:"100px", height:"100px", objectFit:"contain", borderRadius:"20px"}} src={`${item?.food_img? item?.food_img:"https://www.freeiconspng.com/uploads/food-icon-7.png"}`} />
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
                            <div className="w-100 d-flex justify-content-center">
                        <Pagination className="mt-4">
                            <Pagination.Prev onClick={handlePrevPage} disabled={currentPage === 1} />
                            {[...Array(totalPages).keys()].map((page) => (
                                <Pagination.Item
                                    key={page + 1}
                                    active={page + 1 === currentPage}
                                    onClick={() => handlePageChange(page + 1)}
                                >
                                    {page+1}
                                </Pagination.Item>
                                
                            ))}
                            <Pagination.Next onClick={handleNextPage} disabled={currentPage === totalPages} />
                        </Pagination>
            </div>
                </div>: 
                    <>
                <div className="vaucher d-flex flex-column justify-content-center align-items-start p-4 mb-4">
                    <p className="text-white big-text-vaucher">Det Discount Vaucher <br /> Up To 20%</p>
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
                            <i style={{fontSize:"25px"}} className="fa-solid fa-bowl-food orange"></i>
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
                            <img style={{width:"35px",height:"35px", borderRadius:"10px"}} src={`${item?.logo? item?.logo:"https://www.freeiconspng.com/uploads/food-icon-7.png"}`} />
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
                    <Link key={index} to={`/food-detail/${item.id}`} className="food-item bg-white  text-dark" style={{textDecoration:"none"}}>    
                    <div className="w-100 d-flex justify-content-center">
                    <img className="mb-2" style={{width:"100px", height:"100px", objectFit:"contain", borderRadius:"20px"}} src={`${item?.food_img? item?.food_img:"https://www.freeiconspng.com/uploads/food-icon-7.png"}`} />
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
                        {
                            favourite?.some(favouriteItem => favouriteItem.id === item.id)?
                            <button onClick={removeItem} style={{}} className="btn-favourite orange"><i className="fa-solid fa-heart"></i></button>:
                            <button onClick={()=>addToFavourite(item, index)} style={{}} className="btn-favourite grey"><i className="fa-solid fa-heart"></i></button>
                        }
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