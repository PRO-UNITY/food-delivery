import { useEffect, useState } from "react"
import DemoLayout from "../../../Layout/Demoproject"
import { getDataWithToken, BASE_URL } from "../../../functions/function"
import Button from 'react-bootstrap/Button';
import Pagination from 'react-bootstrap/Pagination';
import Spinner from 'react-bootstrap/Spinner';
import { Link } from "react-router-dom";

const AllCategories = () => {
    const [category,setCategory] = useState([])
    const [loading,setLoading] = useState(true)
    const [search, setSearch] = useState('')

    useEffect(()=>{
        getDataWithToken(`/kitchen/category`).
        then((res)=>{
            setCategory(res)
            setLoading(false);
        })
    },[])


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
                <h3 style={{fontWeight:700}}>All Foods</h3>
                <div className="foods">
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
                </div>
            }
            
        </DemoLayout>
    )
}

export default AllCategories