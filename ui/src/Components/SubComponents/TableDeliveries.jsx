import { useLocation, useParams } from "react-router-dom";
import { EditWithFormData, getData } from "../../Services/Services";
import { useEffect } from "react";

const TableDeliveries = (props) => {
  const {
    delivery,
    setDelivery,
    busyDelivery,
    setBusyDelivery,
    selectedItems,
    setSelectedItems,
    selectedItems2,
    setSelectedItems2,
    id,
    status,
    setStatus,
  } = props;
  const location = useLocation();
  const currentUrl = location.pathname;
  const urlManager = `/restaurant/${id}/add-manager`;
  // const urlDelivery = `/restaurant/${id}/add-supplier`;

  useEffect(() => {
    getData(
      `${
        currentUrl === urlManager
          ? `/kitchen/manager/add/${id}`
          : `/kitchen/deliveryman/add/${id}`
      }`
    ).then((res) => {
      setDelivery(res.no_active_employe);
    });
  }, [status]);

  useEffect(() => {
    getData(
      `${
        currentUrl === urlManager
          ? `/kitchen/manager/add/${id}`
          : `/kitchen/deliveryman/add/${id}`
      }`
    ).then((res) => {
      setBusyDelivery(res.active_employe[0].employes);
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

    EditWithFormData(
      `${
        currentUrl === urlManager
          ? `/kitchen/manager/add/${id}`
          : `/kitchen/deliveryman/add/${id}`
      }`,
      formData
    ).then(() => setStatus(!status));
  };

  const handleAddDeliver2 = () => {
    const formData = new FormData();
    busyDelivery.forEach((item) => {
      if (!selectedItems2[item.id]) {
        formData.append("employes", item.id);
      }
    });

    EditWithFormData(
      `${
        currentUrl === urlManager
          ? `/kitchen/manager/add/${id}`
          : `/kitchen/deliveryman/add/${id}`
      }`,
      formData
    ).then(() => setStatus(!status));
  };

  return (
    <div className="d-flex flex-column justify-content-start align-items-start gap-2 w-100 vh-100 p-1">
      <h3>{`${
        currentUrl === urlManager
          ? "Add Manager to your kitchen"
          : "Add Supplier to your kitchen"
      }`}</h3>
      <div className="border p-3 rounded-2 w-100">
        <h4>{`${currentUrl === urlManager ? "Managers" : "Suppliers"}`}</h4>
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
          {`${currentUrl === urlManager ? "add manager" : "add supplier"}`}
        </button>
      </div>
      <div className="border p-3 rounded-2 w-100">
        <h4>
          {`${
            currentUrl === urlManager
              ? "Managers of this restaurant"
              : "Suppliers of this restaurant"
          }`}
        </h4>
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
          {`${currentUrl === urlManager ? "add manager" : "add supplier"}`}
        </button>
      </div>
    </div>
  );
};

export default TableDeliveries;
