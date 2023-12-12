import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getDataWithToken, EditWithFormData } from "../../../../functions";

const AddManagerToKitchen = () => {
    const [selectedItems, setSelectedItems] = useState({});
    const [selectedItems2, setSelectedItems2] = useState({});
    const [manager, setManager] = useState([])
    const [busyManager, setBusyManager] = useState([])
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getDataWithToken(`/authen/manager_kitchen_create/${id}`)
            .then((res) => setManager(res.no_active));
    }, []);

    useEffect(() => {
        getDataWithToken(`/authen/manager_kitchen_create/${id}`)
            .then((res) => {
                setBusyManager(res.delivery[0].delivery);
            });
    }, []);

    const handleCheckboxChange = (id) => {
        setSelectedItems((prevSelectedItems) => ({
            ...prevSelectedItems,
            [id]: !prevSelectedItems[id],
        }));
    };

    const handleCheckboxChange2 = (id) => {
        setSelectedItems2((prevSelectedItems2) => ({
            ...prevSelectedItems2,
            [id]: !prevSelectedItems2[id],
        }));
    };

    const handleAddDeliver = () => {
        const formData = new FormData();
    
        manager.forEach((item) => {
            if (selectedItems[item.id]) {
                formData.append("delivery", item.id);
            }
        });
    
        busyManager.forEach((item) => {
            formData.append("delivery", item.id);
        });
    
        // for (let pair of formData.entries()) {
        //     console.log(pair[0] + ": " + pair[1]);
        // }
    
        EditWithFormData(`/delivery/create_kitchen_delivery/${id}`, formData)
            .then((res) => navigate('/home/main'));
    };

    const handleAddDeliver2 = () => {
        const formData = new FormData();
    
        busyManager.forEach((item) => {
            if (!selectedItems2[item.id]) {
                formData.append("delivery", item.id);
            }
        });
    
        // for (let pair of formData.entries()) {
        //     console.log(pair[0] + ": " + pair[1]);
        // }
    
        EditWithFormData(`/delivery/create_kitchen_delivery/${id}`, formData)
            .then((res) => navigate('/home/main'));
    };
    

    return (
        <div className="d-flex flex-column justify-content-start align-items-start gap-2 w-100 vh-100 p-1">
            <div className="border p-3 rounded-2 w-100">
                <h4>Managers</h4>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">N</th>
                            <th scope="col">Full name</th>
                            <th scope="col">Username</th>
                            <th scope="col">Select</th>
                        </tr>
                    </thead>
                    <tbody>
                        {manager?.map((item, index) => (
                            <tr className="align-middle" key={item.id}>
                                <th>{index + 1}</th>
                                <td>{item.id}</td>
                                <td>{`${item.first_name} ${item.last_name}`}</td>
                                <td>{item.username}</td>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={selectedItems[item.id] || false}
                                        onChange={() => handleCheckboxChange(item.id)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button onClick={handleAddDeliver} className="btn btn-outline-primary float-end">add deliver</button>
            </div>
            <div className="border p-3 rounded-2 w-100">
                <h4>Deliveries of this restaurant</h4>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">N</th>
                            <th scope="col">Full name</th>
                            <th scope="col">Username</th>
                            <th scope="col">Select</th>
                        </tr>
                    </thead>
                    <tbody>
                        {busyManager?.map((item, index) => (
                            <tr className="align-middle" key={item.id}>
                                <th>{index + 1}</th>
                                <td>{item.id}</td>
                                <td>{`${item.first_name} ${item.last_name}`}</td>
                                <td>{item.username}</td>
                                <td>
                                    <input
                                        type="checkbox" 
                                        checked={selectedItems2[item.id] || false}
                                        onChange={() => handleCheckboxChange2(item.id)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button onClick={handleAddDeliver2} className="btn btn-outline-primary float-end">add deliver</button>
            </div>
        </div>
    );
}

export default AddManagerToKitchen;


