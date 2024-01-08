import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TableDeliveries from "../../../Components/SubComponents/TableDeliveries";

const AddManagerToKitchen = () => {
  const [delivery, setDelivery] = useState([]);
  const [busyDelivery, setBusyDelivery] = useState([]);
  const [selectedItems, setSelectedItems] = useState({});
  const [selectedItems2, setSelectedItems2] = useState({});
  const { id } = useParams();
  const [status, setStatus] = useState(false);

  return (
    <div>
      <TableDeliveries
        delivery={delivery}
        setDelivery={setDelivery}
        busyDelivery={busyDelivery}
        setBusyDelivery={setBusyDelivery}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
        selectedItems2={selectedItems2}
        setSelectedItems2={setSelectedItems2}
        id={id}
        status={status}
        setStatus={setStatus}
      />
    </div>
  );
};

export default AddManagerToKitchen;
