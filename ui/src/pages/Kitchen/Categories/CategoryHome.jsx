import { useEffect, useState } from "react";
import DemoLayout from "../../../Layout/Demoproject";
import { deleteData, getUserData } from "../../../Functions/Function";
import Button from "react-bootstrap/Button";
import Pagination from "react-bootstrap/Pagination";
import Spinner from "react-bootstrap/Spinner";
import { Link } from "react-router-dom";

const CategoryHome = () => {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getUserData(`/kitchen/category`).then((res) => {
      setCategory(res);
      setLoading(false);
    });
  }, []);

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
            <h3 style={{ fontWeight: 700 }}>All Categories</h3>
          </div>
          <div className="foods">
            {category.map((item, index) => (
              <div key={index} className="restaurant-item">
                <div className="category-item bg-white">
                  <div className="text-dark" style={{ textDecoration: "none" }}>
                    <i
                      style={{ fontSize: "25px" }}
                      className="fa-solid fa-bowl-food orange"
                    ></i>
                    <p className="name-category p-0 m-0 grey">{item?.name}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </DemoLayout>
  );
};

export default CategoryHome;
