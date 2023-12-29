import { useEffect, useState } from "react";
import DemoLayout from "../../../Layout/Demoproject";
import { getDataWithToken, getUserData } from "../../../functions/function";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import FoodCard from "../../../CleanComponents/FoodCard";
import KitchenCard from "../../../CleanComponents/KitchenCard";
import CategoryCard from "../../../CleanComponents/CategoryCard";
import PaginationCard from "../../../CleanComponents/Pagination";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState([]);
  const [kitchen, setKitchen] = useState([]);
  const [food, setFood] = useState([]);
  const [search, setSearch] = useState("");
  const [searchFoods, setSearchFoods] = useState([]);
  const [card, setCard] = useState([]);
  const [counter, setCounter] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const token = localStorage.getItem("token");
  const [isactive, setIsActive] = useState(false);

  useEffect(() => {
    getDataWithToken(`/kitchen/category`).then((res) => {
      setCategory(res);
      setLoading(false);
    });
  }, [isactive]);

  useEffect(() => {
    getDataWithToken(`/kitchen/`).then((res) => {
      const partKitchen = res.data.results.slice(0, 7);
      setKitchen(partKitchen);
      setLoading(false);
    });
  }, [isactive]);

  useEffect(() => {
    const func = token ? getUserData : getDataWithToken;
    func(`/foods/?name=${search}`).then((res) => {
      setSearchFoods(res.data.results);
      const residual = res.data.count % 10;
      const pages = (res.data.count - residual) / 10;
      setTotalPages(pages % 2 == 0 && pages === 1 ? pages : pages + 1);
    });
  }, [search, isactive, token]);

  useEffect(() => {
    const func = token ? getUserData : getDataWithToken;
    func(`/foods/`).then((res) => {
      const partFood = res.data.results.slice(0, 3);
      setFood(partFood);
      setLoading(false);
    });
  }, [token, isactive]);

  const addToFavourite = (item) => {
    const data = {
      food: item.id,
      is_favorite: true,
    };
    postDataWithToken(data, `/foods/favourites`);
    setIsActive((p) => !p);
  };

  const removeItemFavoutite = (item) => {
    deleteData(`/foods/favourite/${item.id}`);
    setIsActive((p) => !p);
  };



  return (
    <DemoLayout setSearch={setSearch} counter={counter}>
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
        <div className="w-100 body-main  px-5 py-1">
          {search != "" ? (
            <div className="foods">
              {searchFoods?.map((item, index) => (
              <FoodCard key={index} {...item} setCount={setCount} count={count}/>
              ))}
              <div className="w-100 d-flex justify-content-center">
                <PaginationCard
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  totalPages={totalPages}
                />
              </div>
            </div>
          ) : (
            <>
              <div className="vaucher d-flex flex-column justify-content-center align-items-start p-4 mb-4">
                <p className="text-white big-text-vaucher">
                  Det Discount Vaucher <br /> Up To 20%
                </p>
                <p className="text-white mini-text-vaucher">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.{" "}
                  <br /> Neque reiciendis sit doloremque aliquam{" "}
                </p>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 style={{ fontWeight: "bold" }}>Category</h3>
                <Link
                  to={"/allcategories"}
                  style={{ fontWeight: 600, textDecoration: "none" }}
                  className="orange text-center mb-1 btn-none"
                >
                  View All <i className="fa-solid fa-angle-right"></i>
                </Link>
              </div>
              <div className="categories w-100 mb-3">
                {category.map((item, index) => (
                  <CategoryCard key={index} {...item} />
                ))}
              </div>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 style={{ fontWeight: "bold" }}>Restaurants</h3>
                <Link
                  to={"/allkitchens"}
                  style={{ fontWeight: 600, textDecoration: "none" }}
                  className="orange text-center mb-1 btn-none"
                >
                  View All <i className="fa-solid fa-angle-right"></i>
                </Link>
              </div>
              <div className="categories w-100 mb-3">
                {kitchen.map((item, index) => (
                  <KitchenCard key={index} {...item} />
                ))}
              </div>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 style={{ fontWeight: "bold" }}>Popular Foods</h3>
                <Link
                  to={"/allfoods"}
                  style={{ fontWeight: 600, textDecoration: "none" }}
                  className="orange text-center mb-1 btn-none"
                >
                  View All <i className="fa-solid fa-angle-right"></i>
                </Link>
              </div>
              <div className="foods">
                {food.map((item, index) => (
                  <FoodCard key={index} {...item} setCounter={setCounter} counter={counter}/>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </DemoLayout>
  );
};

export default Dashboard;
