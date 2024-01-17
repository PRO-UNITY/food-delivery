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
      {order?.map((item, index) => (
          <table key={index} className="table mb-3 border">
            <thead>
              <tr>
                <th scope="col">N</th>
                <th scope="col">Name</th>
                <th scope="col">Count</th>
                <th scope="col">Image</th>
                <th scope="col">Price</th>
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
              </tr>
            </tbody>
          </table>
        ))}
      </div>
    </DemoLayout>
  );
};

export default OrderHistoryDeliver;
