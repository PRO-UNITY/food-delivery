import { useEffect, useState } from "react"
import DemoLayout from "../../../../Layout/Demoproject";
import { deleteData, getUserData } from "../../../../functions/function"; 
import Button from 'react-bootstrap/Button';
import Pagination from 'react-bootstrap/Pagination';
import Spinner from 'react-bootstrap/Spinner';
import { Link } from "react-router-dom";
import Supplier from '../../../../assets/images/supplier.png'

const KitchenManagerHome = () => {
    const [deliveries,setDeliveries] = useState([])
    const [loading,setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [isactive, setIsactive] = useState(false)


    useEffect(()=>{
        getUserData(`/managers`).
        then((res)=>{
            setDeliveries(res.data.results)
            console.log(res)
            setLoading(false)
        })
    },[isactive])

    const deleteDelivery = (id) => {
        deleteData(`/manager/${id}`).then(()=>setIsactive(p=>!p)
        )
    }

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
                <div className="d-flex justify-content-between align-items-center">
                <h3 style={{fontWeight:700}}>All Suppliers</h3>
                <Link to={'/add-delivery'} className="orange">Add Supplier</Link>
                </div>
                <div className="foods">
                {
                    deliveries?.map((item, index)=>
                    <div key={index} className="food-item bg-white  text-dark" style={{textDecoration:"none"}}>    
                    <Link to={`/delivery-detail/${item.id}`} className="w-100 d-flex justify-content-center">
                    <img className="mb-2" style={{width:"100px", height:"100px", objectFit:"contain", borderRadius:"20px"}} src={`${item?.food_img? item?.food_img:Supplier}`} />
                    </Link>
                    <div className="w-100"><p className="text-center">{item.username}</p></div>
                    <div className="d-flex justify-content-between w-100 align-items-center">
                        <Link style={{textDecoration:"none"}} to={`/manager/${item.id}`} className={`btn btn-success`}><i className="fa-solid fa-eye"></i> &nbsp; more</Link>
                        <button onClick={()=>deleteDelivery(item.id)}  className="btn btn-danger"><i className="fa-solid fa-trash"></i></button>
                    </div>
                    </div>
                    )
                }   
            </div>
                </div>
            }
        </DemoLayout>
    )
}

export default KitchenManagerHome