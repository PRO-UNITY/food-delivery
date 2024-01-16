import { useEffect, useState } from "react";
import DemoLayout from "../../Layout/Demoproject";
import { useNavigate } from "react-router-dom";
import { getData, putData } from "../../Services/Services";

const NewOrder = () => {
  const [search, setSearch] = useState("");
  const [active, setActive] = useState(false);
  const navigate = useNavigate();
  const [order, setOrder] = useState([]);

  useEffect(() => {
    getData(`/order/delivery/active`).then((res) => {
      console.log(res.results);
      setOrder(res.results);
    });
  }, [active]);

  const receive = (id) => {
    const data = {
      status: 2,
      is_delivery: true,
    };
    putData(data,`/order/${id}/delivery/accept`).then((res)=>setActive(!active));
  };

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
            {order?.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.foods.map((i) => i.name)}</td>
                <td>{item.foods.map((i) => i.count)}</td>
                <td>
                  <img
                    style={{ width: "50px" }}
                    src={item.foods.map((i) => i.food_img)}
                    alt=""
                  />
                </td>
                <td>
                  <button onClick={()=>receive(item.id)} className="btn btn-success">receive</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DemoLayout>
  );
};

export default NewOrder;
