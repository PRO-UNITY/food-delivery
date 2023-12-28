import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getUserData, EditWithFormData } from "../../../../functions/function";
import DemoLayout from "../../../../Layout/Demoproject";

const AddManagerToKitchen = () => {
  const [search, setSearch] = useState("");
  const [delivery, setDelivery] = useState([]);
  const [busyDelivery, setBusyDelivery] = useState([]);
  const [selectedItems, setSelectedItems] = useState({});
  const [selectedItems2, setSelectedItems2] = useState({});
  const { id } = useParams();
  const [status, setStatus] = useState(false)

  useEffect(() => {
    getUserData(`/kitchen/manager/add/${id}`).then((res) => {
      setDelivery(res.no_active_employe);
      console.log(res);
    });
  }, [status]);

  useEffect(() => {
    getUserData(`/kitchen/manager/add/${id}`).then((res) => {
      setBusyDelivery(res.active_employe[0].employes);
      console.log(res.active_employe[0].employes);
    });
  }, [status]);

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

    delivery.forEach((item) => {
      if (selectedItems[item.id]) {
        formData.append("employes", item.id);
      }
    });

    busyDelivery.forEach((item) => {
      formData.append("employes", item.id);
    });

    EditWithFormData(`/kitchen/manager/add/${id}`, formData).then(()=>setStatus(!status));
  };

  const handleAddDeliver2 = () => {
    console.log(busyDelivery);
    console.log(selectedItems2);
    const formData = new FormData();
    busyDelivery.forEach((item) => {
      if (!selectedItems2[item.id]) {
        formData.append("employes", item.id);
      }
    });
    

    EditWithFormData(`/kitchen/manager/add/${id}`, formData).then(()=>setStatus(!status));
  };

  return (
    <DemoLayout setSearch={setSearch}>
      <div className="body-main w-100 p-5">
        <div className="d-flex flex-column justify-content-start align-items-start gap-2 w-100 vh-100 p-1">
          <div className="border p-3 rounded-2 w-100">
            <h4>Deliveries</h4>
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
                {delivery?.map((item, index) => (
                  <tr className="align-middle" key={item.id}>
                    <th>{index + 1}</th>
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
            <button
              onClick={handleAddDeliver}
              className="btn btn-outline-primary float-end"
            >
              add deliver
            </button>
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
                {busyDelivery?.map((item, index) => (
                  <tr className="align-middle" key={item.id}>
                    <th>{index + 1}</th>
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
            <button
              onClick={handleAddDeliver2}
              className="btn btn-outline-primary float-end"
            >
              add deliver
            </button>
          </div>
        </div>
      </div>
    </DemoLayout>
  );
};

export default AddManagerToKitchen;
