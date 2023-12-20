import { useEffect, useState } from "react"
import DemoLayout from "../../../Layout/Demoproject"
import { BASE_URL, getDataWithToken } from "../../../functions/function"
import { Link } from "react-router-dom"
// import Button from 'react-bootstrap/Button';
// import Spinner from 'react-bootstrap/Spinner';

const FoodOrder = () => {
    const [search, setSearch] = useState('')

    // const [loading, setLoading] = useState(true);


    // if (loading) {
    //     return (
    //         <div className="container d-flex justify-content-center align-items-center py-5">
    //             <Button variant="warning" disabled>
    //                 <Spinner
    //                 as="span"
    //                 animation="grow"
    //                 size="sm"
    //                 role="status"
    //                 aria-hidden="true"
    //                 />
    //                 Loading...
    //             </Button>
    //         </div>
    //     )
    // }
    return ( 
        <DemoLayout setSearch={setSearch}>
            <div className=" body-main w-100 p-5">
                <h4>Food Order</h4>
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

export default FoodOrder