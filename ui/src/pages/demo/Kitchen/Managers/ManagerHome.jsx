import { useEffect, useState } from "react";
import DemoLayout from "../../../../Layout/Demoproject";
import { deleteData, getUserData, putData } from "../../../../functions/function";
import Button from "react-bootstrap/Button";
import Pagination from "react-bootstrap/Pagination";
import Spinner from "react-bootstrap/Spinner";
import { Link } from "react-router-dom";
import Supplier from "../../../../assets/images/supplier.png";
import PaginationCard from "../../../../CleanComponents/Pagination";

const KitchenManagerHome = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isactive, setIsactive] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getUserData(`/managers`).then((res) => {
      setDeliveries(res.data.results);
      const residual = res.data.count % 10;
      const pages = (res.data.count - residual) / 10;
      setTotalPages(pages % 2 == 0 && pages === 1 ? pages : pages + 1);
      console.log(res);
      setLoading(false);
    });
  }, [isactive, currentPage]);

  const deleteDelivery = (id) => {
    deleteData(`/manager/${id}`).then(() => setIsactive((p) => !p));
  };

  const statusFalse = (item) => {
    const status = {
      active_profile: false,
    };
    putData(status, `/deliveryman/${item.id}`);
    setIsactive(!isactive);
  };

  const statusTrue = (item) => {
    const status = {
      active_profile: true,
    };
    putData(status, `/deliveryman/${item.id}`);
    setIsactive(!isactive);
  };

  return (
    <DemoLayout setSearch={setSearch}>
      {loading ? (
        <div className="container body-main d-flex justify-content-center align-items-center py-5">
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
        <div className="body-main w-100 p-5">
          <div className="d-flex justify-content-between align-items-center">
            <h3 style={{ fontWeight: 700 }}>All Suppliers</h3>
            <Link to={"/add-manager"} className="orange">
              Add Supplier
            </Link>
          </div>
          <div className="foods">
            {deliveries?.map((item, index) => (
              <div
                key={index}
                className="food-item bg-white  text-dark"
                style={{ textDecoration: "none" }}
              >
                <Link
                  to={`/delivery-detail/${item.id}`}
                  className="w-100 d-flex justify-content-center"
                >
                  <img
                    className="mb-2"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "contain",
                      borderRadius: "20px",
                    }}
                    src={`${item?.food_img ? item?.food_img : Supplier}`}
                  />
                </Link>
                <div className="w-100">
                  <p className="text-center">{item.username}</p>
                  {item.active_profile ? (
                      <button
                        onClick={() => statusFalse(item)}
                        className="btn-none w-100"
                      >
                        <p className="text-center text-success">avtive</p>
                      </button>
                    ) : (
                      <button
                        onClick={() => statusTrue(item)}
                        className="btn-none w-100"
                      >
                        <p className="text-center text-danger">no active</p>
                      </button>
                    )}
                </div>
                <div className="d-flex justify-content-between w-100 align-items-center">
                  <Link
                    style={{ textDecoration: "none" }}
                    to={`/manager/${item.id}`}
                    className={`btn btn-success`}
                  >
                    <i className="fa-solid fa-eye"></i> &nbsp; more
                  </Link>
                  <button
                    onClick={() => deleteDelivery(item.id)}
                    className="btn btn-danger"
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
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
          </div>
        </div>
      )}
    </DemoLayout>
  );
};

export default KitchenManagerHome;
