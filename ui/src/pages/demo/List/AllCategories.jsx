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
                    <Link to={`/category/${item.id}`} key={index} className="category w-100 py-2 px-4 d-flex justify-content-between align-items-center orange" style={{textDecoration:"none"}}>
                        <h4>{item.name}</h4>
                        <i className="fa-solid fa-chevron-right fs-4"></i>
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