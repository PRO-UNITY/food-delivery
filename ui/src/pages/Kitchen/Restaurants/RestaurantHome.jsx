import { useEffect, useState } from "react";
import DemoLayout from "../../../Layout/Demoproject";
import { deleteData, getUserData } from "../../../Functions/Function";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { Link } from "react-router-dom";

const RestaurantHome = () => {
  const [retaurant, setRetaurant] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [isactive, setIsactive] = useState(false);

  useEffect(() => {
    getUserData(`/kitchen/`).then((res) => {
      setRetaurant(res);
      setLoading(false);
    });
  }, [isactive]);

  const deleteRestaurant = (id) => {
    deleteData(`/kitchen/${id}`).then(() => setIsactive((p) => !p));
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
            <h3 style={{ fontWeight: 700 }}>All Restaurants</h3>
            <Link to={"/add-restaurant"} className="orange">
              Add Restaurant
            </Link>
          </div>
          <div className="foods">
            {retaurant.map((item, index) => (
              <div key={index} className="restaurant-item">
                <div className="category-item bg-white">
                  <Link
                    className="text-dark"
                    style={{ textDecoration: "none" }}
                    to={`/restaurant/${item.id}`}
                  >
                    <img
                      style={{
                        width: "35px",
                        height: "35px",
                        borderRadius: "10px",
                      }}
                      src={`${
                        item?.logo
                          ? item?.logo
                          : "https://www.freeiconspng.com/uploads/food-icon-7.png"
                      }`}
                    />
                    <p className="name-category p-0 m-0 grey">{item?.name}</p>
                  </Link>
                </div>
                <button
                  onClick={() => deleteRestaurant(item.id)}
                  className="trash"
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </DemoLayout>
  );
};

export default RestaurantHome;
