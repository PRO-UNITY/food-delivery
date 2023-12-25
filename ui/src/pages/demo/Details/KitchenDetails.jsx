import { useEffect, useState } from "react"
import DemoLayout from "../../../Layout/Demoproject"
import { getDataWithToken, BASE_URL } from "../../../functions/function"
import { useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Pagination from 'react-bootstrap/Pagination';
import Spinner from 'react-bootstrap/Spinner';
import { Link } from "react-router-dom";

const KitchenDetails = () => {
    const [foods, setFoods] = useState([])
    const [category, setCategory] = useState([])
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState('')
    const [card, setCard] = useState([])
    const [data, setData] = useState({})
    const {id} = useParams()
    
    useEffect(()=>{
        getDataWithToken(`/kitchen/${id}/foods?page=${currentPage}`).
        then((res)=>{
            setFoods(res.data.results)
            const residual = res.data.count%10
            const pages = (res.data.count-residual)/10
            setTotalPages(pages%2==0 && pages ===1?pages:pages+1);
            setLoading(false);
        })
    },[id, currentPage])

    useEffect(()=>{
        getDataWithToken(`/kitchen/${id}`).
        then((res)=>{
            setCategory(res.foods)
        })
    },[])

    useEffect(()=>{
        getDataWithToken(`/kitchen/${id}`).
        then((res)=>{
            setData(res)
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
                    <h3>About {data?.name}</h3>
                
                    
                    <div className="order-history">
                    <div className="img-order-history p-3">
                        <img style={{borderRadius:"10px"}} src={data?.logo} alt="" />
                    </div>
                    <div className="title-order-history">
                    <ul className="list-group w-100">
                        <li className="list-group-item">Name : {data?.name}</li>
                        <li className="list-group-item">Description : {data?.description}</li>
                        <li className="list-group-item">Open time : {data?.open_time}</li>
                        <li className="list-group-item">Close time : {data?.close_time}</li>
                    </ul>
                    </div>
                    </div>
                    
                
                    <h4>Categories of {data?.name}</h4>
                    <div className="categories w-100 mb-3">
                    {
                        category.map((item,index)=>
                            <Link to={`/category/${item.id}`} key={index} className="text-dark" style={{textDecoration:"none"}}>
                            <div className="category-item bg-white">
                            <i style={{fontSize:"25px"}} className="fa-solid fa-bowl-food orange"></i>
                            <p className="name-category p-0 m-0 grey">{item?.categories.name} x{item?.categories.food_count}</p>
                            </div>
                            </Link>
                        )
                    }
                    </div>
                    <hr />
                    <h4>Foods of {data?.name}</h4>

                <div className="foods">
                {
                    foods.map((item,index)=>
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
            
        </DemoLayout>
    )
}

export default KitchenDetails   