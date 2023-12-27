import { useEffect, useState } from "react"
import DemoLayout from "../../../Layout/Demoproject"
import { BASE_URL, getDataWithToken, getUserData } from "../../../functions/function"
import { Link } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Pagination from 'react-bootstrap/Pagination';



const OrderHistory = () => {
    const [search, setSearch] = useState('')
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const token = localStorage.getItem('token')


    useEffect(()=>{
        getUserData(`/orders?page=${currentPage}`).
        then((res)=>{
            setOrders(res.data.results)
            const residual = res.data.count%10
            const pages = (res.data.count-residual)/10
            setTotalPages(pages%2==0 && pages ===1?pages:pages+1);
            setLoading(false);
        })
    },[currentPage])

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
        <DemoLayout setSearch={setSearch}>
            <div className=" body-main w-100  p-5">
            <h3 className="mb-3">Order History</h3>
                {
                    token?
                    <>
                {
                loading?
                <div className="container w-100 body-main d-flex justify-content-center align-items-center py-5">
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
                    orders?.map((item,index)=>
                    <div key={index} className="py-3 w-100">
                    <table  className="table w-100">
                        <thead className="thead">
                            <tr className="table-warning">
                                <th>{index+1}</th>
                                <th>Name</th>
                                <th>Count</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="align-middle">
                                <th>{item.foods.map((i,index)=> <p key={index}>{index+1}</p> )}</th>
                                <th>{item.foods.map((i,index)=> <p key={index}>{i.name}</p> )}</th>
                                <th>{item.foods.map((i,index)=> <p key={index}>{i.count}</p> )}</th>
                                <th>{item.foods.map((i,index)=> <p key={index}>{i.price}</p> )}</th>
                            </tr>
                        </tbody>
                    </table> 
                    <div className="d-flex w-100 justify-content-between">
                    <h6 className="text-start">Total price : {item.total_price}</h6>
                    <Link to={`/order-history/${item.id}`} className="orange text-center mb-1 btn-none">viev order-history</Link>
                    </div>
                    </div>            
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
                </>
                }
                </>:
                <h6>No any order-history  <Link className="orange" to={'/login'}>login</Link></h6>
                }
                
               
                
                
            </div>
        </DemoLayout>
    )
}

export default OrderHistory