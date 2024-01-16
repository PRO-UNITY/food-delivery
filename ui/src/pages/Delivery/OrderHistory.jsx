import { useEffect, useState } from "react";
import DemoLayout from "../../Layout/Demoproject";
import { getData } from "../../Services/Services";

const OrderHistoryDeliver = () => {
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState([]);

  useEffect(() => {
    getData(`/order/history/delivery`).then((res) => {
      console.log(res.results);
      setOrder(res.results);
    });
  }, []);

  return (
    <DemoLayout setSearch={setSearch}>
      <div className=" body-main w-100 p-5 d-flex justify-content-center align-items-start">
        <table className="table mb-3 border">
          <thead>
            <tr>
              <th scope="col">N</th>
              <th scope="col">Name</th>
              <th scope="col">Count</th>
              <th scope="col">Price</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>

          </tbody>
        </table>
      </div>
    </DemoLayout>
  );
};

export default OrderHistoryDeliver;
