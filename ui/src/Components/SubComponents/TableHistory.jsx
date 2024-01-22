import { Link } from "react-router-dom";

const TableHistory = (props) => {
  const { id, food, total_price, index, status } = props;
  return (
    <div className="py-3 w-100">
      <table className="table w-100">
        <thead className="thead">
          <tr className="table-warning">
            <th>{index+1}</th>
            <th>Name</th>
            <th>Count</th>
            <th>Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr className="align-middle">
            <th>
              {food.map((i, index) => (
                <p key={index}>{index + 1}</p>
              ))}
            </th>
            <th>
              {food.map((i, index) => (
                <p key={index}>{i.name.length>10?`${i.name.slice(0,6)}...`:i.name}</p>
              ))}
            </th>
            <th>
              {food.map((i, index) => (
                <p key={index}>{i.count}</p>
              ))}
            </th>
            <th>
              {food.map((i, index) => (
                <p key={index}>{i.price}</p>
              ))}
            </th>
            <th className="text-danger">
                <p key={index}>{status.name}</p>
            </th>
          </tr>
        </tbody>
      </table>
      <div className="d-flex w-100 justify-content-between">
        <h6 className="text-start">Total price : {total_price}</h6>
        <Link
          to={`${id}`}
          className="text-orange text-center mb-1 btn-none"
        >
          viev order-history
        </Link>
      </div>
    </div>
  );
};

export default TableHistory;
