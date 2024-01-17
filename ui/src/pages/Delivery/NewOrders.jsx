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
      setOrder(res.results);
    });
  }, [active]);

  const receive = (id) => {
    const data = {
      status: 2,
      is_delivery: true,
    };
    putData(data, `/order/${id}/delivery/accept`).then((res) =>
      setActive(!active)
    );
  };

  return (
    <DemoLayout setSearch={setSearch}>
      <div className=" body-main w-100 p-5 d-flex flex-column justify-content-start align-items-start">
        {order?.map((item, index) => (
          <table key={index} className="table mb-3 border">
            <thead>
              <tr>
                <th scope="col">N</th>
                <th scope="col">Name</th>
                <th scope="col">Count</th>
                <th scope="col">image</th>
                <th scope="col">Price</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="align-middle">
                <td>{index + 1}</td>
                <td>
                  {item.foods.map((i) => (
                    <p className="name-order-history">{i.name}</p>
                  ))}
                </td>
                <td>
                  {item.foods.map((i) => (
                    <p className="count-order-history">{i.count}</p>
                  ))}
                </td>
                <td className="d-flex flex-column">
                  {item.foods.map((i) => (
                    <img style={{ width: "50px" }} src={i.food_img} alt="" />
                  ))}
                </td>
                <td>
                  {item.foods.map((i) => (
                    <p className="count-order-history">{i.price}</p>
                  ))}
                </td>
                <td>
                  <button
                    onClick={() => receive(item.id)}
                    className="btn btn-success"
                  >
                    receive
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        ))}
      </div>
    </DemoLayout>
  );
};

export default NewOrder;
