import { useEffect, useState } from "react"
import DemoLayout from "../../../Layout/Demoproject"
import { getDataWithToken, BASE_URL } from "../../../functions/function"
import Button from 'react-bootstrap/Button';
import Pagination from 'react-bootstrap/Pagination';
import Spinner from 'react-bootstrap/Spinner';
import { Link } from "react-router-dom";

const AllKitchens = () => {
    const [kitchen,setKitchen] = useState([])
    const [loading,setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);


    useEffect(()=>{
        getDataWithToken(`/kitchen/`).
        then((res)=>{
            const partKitchen = res.data.results
            setKitchen(partKitchen)
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
                <h3 style={{fontWeight:700}}>All Restaurants</h3>
                <div className="foods">
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

export default AllKitchens