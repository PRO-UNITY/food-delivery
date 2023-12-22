import { useEffect, useState } from "react"
import DemoLayout from "../../../Layout/Demoproject"
import { getDataWithToken, BASE_URL } from "../../../functions/function"
import Button from 'react-bootstrap/Button';
import Pagination from 'react-bootstrap/Pagination';
import Spinner from 'react-bootstrap/Spinner';
import { Link } from "react-router-dom";

const AllFoods = () => {
    const [food,setFood] = useState([])
    const [searchFood, setSearchFood] = useState([])
    const [loading,setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [card, setCard] = useState([])
    const [count, setCount] = useState(0)

    useEffect(()=>{
        getDataWithToken(`/foods/`).
        then((res)=>{
            const partFood = res.data.results
            setFood(partFood)
            setLoading(false);
        })
    },[])

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

    const addToCard = (item) => {
        const updatedCard = [...card, { ...item, count: 1 }];
        const totalPrice = updatedCard.reduce((acc, curr) => acc + curr.price, 0);
  
        localStorage.setItem("card", JSON.stringify(updatedCard));
        setCard(updatedCard);
    }
  
    useEffect(() => {
      const savedCard = JSON.parse(localStorage.getItem("card")) || [];
      setCard(savedCard);
    }, []);
    
    useEffect(()=>{
        getDataWithToken(`/foods/?name=${search}`).
        then((res)=>{
            setSearchFood(res.data.results)           
        })
    },[search])

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
                <>
                {
                    search != "" ?
                    <div className="body-main w-100 p-5">
                        { searchFood.length>0 ? 
                        <h3 style={{fontWeight:700}}>Foods by your search</h3>:
                        <h3 style={{fontWeight:700}}>No any food by your search</h3>
                        }
                    <div className="foods">
                        {
                            searchFood?.map((item, index)=>
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
                    </div>
                     :
                    <div className="body-main w-100 p-5">
                    <h3 style={{fontWeight:700}}>All Foods</h3>
                    <div className="foods">
                    {
                        food.map((item,index)=>
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
                    </div>
                    
                }
                </>
                
            }
            
        </DemoLayout>
    )
}

export default AllFoods

