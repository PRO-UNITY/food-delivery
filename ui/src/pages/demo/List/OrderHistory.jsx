import { useEffect, useState } from "react"
import DemoLayout from "../../../Layout/Demoproject"
import { BASE_URL, getDataWithToken, getUserData } from "../../../functions/function"
import { Link } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';


const OrderHistory = () => {
    const [search, setSearch] = useState('')
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true);


    useEffect(()=>{
        getUserData('/orders').
        then((res)=>{
            setOrders(res.data.results)
            setLoading(false);
        })
    },[])


    return ( 
        <DemoLayout setSearch={setSearch}>
            <div className=" body-main w-100  p-5">
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
                <h3>Order History</h3>
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
                    <h6 className="text-start">Total price : {item.total_price}</h6>
                    </div>            
                    )
                }
                </>
                }
            </div>
        </DemoLayout>
    )
}

export default OrderHistory