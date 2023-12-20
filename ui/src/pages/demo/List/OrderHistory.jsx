import { useEffect, useState } from "react"
import DemoLayout from "../../../Layout/Demoproject"
import { BASE_URL, getDataWithToken } from "../../../functions/function"
import { Link } from "react-router-dom"


const OrderHistory = () => {
    const [search, setSearch] = useState('')


    return ( 
        <DemoLayout setSearch={setSearch}>
            <div className=" body-main w-100 p-5">
                <h4>Order History</h4>
                <table className="table w-100">
                    <thead className="thead">
                        <tr className="table-warning">
                            <th>N</th>
                            <th>Name</th>
                            <th>Count</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>1</th>
                            <th>Burger</th>
                            <th>1</th>
                            <th>30000</th>
                        </tr>
                    </tbody>
                </table>
            </div>
        </DemoLayout>
    )
}

export default OrderHistory