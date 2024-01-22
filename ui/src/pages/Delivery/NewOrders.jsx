import { useEffect, useState } from "react";
import DemoLayout from "../../Layout/Demoproject";
import { Link, useNavigate } from "react-router-dom";
import { getData, putData } from "../../Services/Services";
import Order from "../../assets/images/3500833.png";

const NewOrder = () => {
  const [search, setSearch] = useState("");
  const [active, setActive] = useState(false);
  const navigate = useNavigate();
  const [order, setOrder] = useState([]);

  useEffect(() => {
    getData(`/order/delivery/new`).then((res) => {
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
      <div className="w-100 body-main py-5 px-2">
        <div className="foods">
          {order?.map((item, index) => (
            <div key={index} className="food-item bg-white text-dark border-none">
              <Link className="w-100 d-flex justify-content-center">
                <img className="mb-2 food-img" src={Order} />
              </Link>
              <div className="w-100">
                <p className="text-center text-danger">{item.status.name}</p>
              </div>
              <div className="d-flex justify-content-between w-100 align-items-center">
                <button
                  onClick={() => receive(item.id)}
                  className={`btn btn-success border-none`}
                >
                  receive
                </button>
                <Link to={`/new-order-detail/${item.id}`} className={`btn btn-warning border-none`}>
                  <i className="fa-solid fa-eye"></i>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DemoLayout>
  );
};

export default NewOrder;

// <table key={index} className="table mb-3 border">
//   <thead>
//     <tr>
//       <th scope="col">N</th>
//       <th scope="col">Name</th>
//       <th scope="col">Count</th>
//       <th scope="col">image</th>
//       <th scope="col">Price</th>
//       <th scope="col">Action</th>
//     </tr>
//   </thead>
//   <tbody>
//     <tr className="align-middle">
//       <td>{index + 1}</td>
//       <td>
//         {item.food.map((i) => (
//           <p className="name-order-history">{i.name}</p>
//         ))}
//       </td>
//       <td>
//         {item.food.map((i) => (
//           <p className="count-order-history">{i.count}</p>
//         ))}
//       </td>
//       <td className="d-flex flex-column">
//         {item.food.map((i) => (
//           <div className="">
//             <img style={{ width: "50px", height:"100%" }} src={i.food_img} alt="" />
//           </div>
//         ))}
//       </td>
//       <td>
//         {item.food.map((i) => (
//           <p className="count-order-history">{i.price}</p>
//         ))}
//       </td>
//       <td>
//         <button
//           onClick={() => receive(item.id)}
//           className="btn btn-success"
//         >
//           receive
//         </button>
//       </td>
//     </tr>
//   </tbody>
// </table>
