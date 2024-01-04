import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DemoLayout from "../../../Layout/Demoproject";
import { deleteData, getUserData } from "../../../Services/Services";
import Loader from "../../../Components/SubComponents/Loader";

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
        <Loader />
      ) : (
        <div className="body-main w-100 p-5">
          <div className="d-flex justify-content-between align-items-center">
            <h3>All Restaurants</h3>
            <Link to={"/add-restaurant"} className="text-orange">
              Add Restaurant
            </Link>
          </div>
          <div className="foods">
            {retaurant.map((item, index) => (
              <div key={index} className="restaurant-item">
                <div className="category-item bg-white">
                  <Link
                    className="text-dark border-none"
                    to={`/restaurant/${item.id}`}
                  >
                    <img
                      className="logo-restaurant"
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
