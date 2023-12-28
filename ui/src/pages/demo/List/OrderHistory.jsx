import { useEffect, useState } from "react";
import DemoLayout from "../../../Layout/Demoproject";
import { getUserData } from "../../../functions/function";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import PaginationCard from "../../../CleanComponents/Pagination";

const OrderHistory = () => {
  const [search, setSearch] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const token = localStorage.getItem("token");

  useEffect(() => {
    getUserData(`/orders?page=${currentPage}`).then((res) => {
      setOrders(res.data.results);
      const residual = res.data.count % 10;
      const pages = (res.data.count - residual) / 10;
      setTotalPages(pages % 2 == 0 && pages === 1 ? pages : pages + 1);
      setLoading(false);
    });
  }, [currentPage]);

  return (
    <DemoLayout setSearch={setSearch}>
      <div className=" body-main w-100  p-5">
        <h3 className="mb-3">Order History</h3>
        {token ? (
          <>
            {loading ? (
              <div className="container w-100 body-main d-flex justify-content-center align-items-center py-5">
                <Button variant="warning" disabled>
                  <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  Loading...
                </Button>
              </div>
            ) : (
              <>
                {orders?.map((item, index) => (
                  <div key={index} className="py-3 w-100">
                    <table className="table w-100">
                      <thead className="thead">
                        <tr className="table-warning">
                          <th>{index + 1}</th>
                          <th>Name</th>
                          <th>Count</th>
                          <th>Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="align-middle">
                          <th>
                            {item.foods.map((i, index) => (
                              <p key={index}>{index + 1}</p>
                            ))}
                          </th>
                          <th>
                            {item.foods.map((i, index) => (
                              <p key={index}>{i.name}</p>
                            ))}
                          </th>
                          <th>
                            {item.foods.map((i, index) => (
                              <p key={index}>{i.count}</p>
                            ))}
                          </th>
                          <th>
                            {item.foods.map((i, index) => (
                              <p key={index}>{i.price}</p>
                            ))}
                          </th>
                        </tr>
                      </tbody>
                    </table>
                    <div className="d-flex w-100 justify-content-between">
                      <h6 className="text-start">
                        Total price : {item.total_price}
                      </h6>
                      <Link
                        to={`/order-history/${item.id}`}
                        className="orange text-center mb-1 btn-none"
                      >
                        viev order-history
                      </Link>
                    </div>
                  </div>
                ))}
                <div className="w-100 d-flex justify-content-center">
                  <PaginationCard
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalPages={totalPages}
                  />
                </div>
              </>
            )}
          </>
        ) : (
          <h6>
            No any order-history{" "}
            <Link className="orange" to={"/login"}>
              login
            </Link>
          </h6>
        )}
      </div>
    </DemoLayout>
  );
};

export default OrderHistory;
