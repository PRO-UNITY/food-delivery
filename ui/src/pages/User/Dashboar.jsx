import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DemoLayout from "../../Layout/Demoproject";
import { getData, getKitchen } from "../../Services/Services";
import FoodCard from "../../Components/SubComponents/FoodCard";
import KitchenCard from "../../Components/SubComponents/KitchenCard";
import CategoryCard from "../../Components/SubComponents/CategoryCard";
import PaginationCard from "../../Components/SubComponents/Pagination";
import Loader from "../../Components/SubComponents/Loader";

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
    getData(`/kitchen/category`).then((res) => {
      setCategory(res.results);
      setLoading(false);
    });
  }, [isactive]);

  useEffect(() => {
    getKitchen(`/kitchen/`).then((res) => {
      const partKitchen = res.results;
      setKitchen(partKitchen);
      setLoading(false);
    });
  }, [isactive]);

  useEffect(() => {
    getData(`/foods/?name=${search}`).then((res) => {
      setSearchFoods(res.data.results);
      const residual = res.data.count % 10;
      const pages = (res.data.count - residual) / 10;
      setTotalPages(pages % 2 == 0 && pages === 1 ? pages : pages + 1);
    });
  }, [search, counter, token]);

  useEffect(() => {
    getData(`/foods/`).then((res) => {
      const partFood = res.data.results;
      const residual = res.data.count % 10;
      const pages = (res.data.count - residual) / 10;
      setTotalPages(pages % 2 == 0 && pages === 1 ? pages : pages + 1);
      setFood(partFood);
      setLoading(false);
    });
  }, [token, counter]);

  return (
    <DemoLayout setSearch={setSearch} counter={counter}>
      {loading ? (
        <Loader />
      ) : (
        <div className="w-100 body-main  px-5 py-1">
          {search != "" ? (
            <div className="foods">
              {searchFoods?.map((item, index) => (
                <FoodCard
                  key={index}
                  {...item}
                  setCounter={setCounter}
                  counter={counter}
                />
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
                <p className="big-text-vaucher">
                  Det Discount Vaucher <br /> Up To 20%
                </p>
                <p className="mini-text-vaucher">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.{" "}
                  <br /> Neque reiciendis sit doloremque aliquam{" "}
                </p>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h3>Category</h3>
                <Link to={"/allcategories"} className="text-link">
                  View All <i className="fa-solid fa-angle-right"></i>
                </Link>
              </div>
              <div className="categories w-100 mb-3">
                {category.map((item, index) => (
                  <CategoryCard key={index} {...item} />
                ))}
              </div>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h3>Restaurants</h3>
                <Link to={"/allkitchens"} className="text-link">
                  View All <i className="fa-solid fa-angle-right"></i>
                </Link>
              </div>
              <div className="categories w-100 mb-3">
                {kitchen.map((item, index) => (
                  <KitchenCard key={index} {...item} />
                ))}
              </div>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h3>Popular Foods</h3>
                <Link to={"/allfoods"} className="text-link">
                  View All <i className="fa-solid fa-angle-right"></i>
                </Link>
              </div>
              <div className="foods">
                {food.map((item, index) => (
                  <FoodCard
                    key={index}
                    {...item}
                    setCounter={setCounter}
                    counter={counter}
                  />
                ))}
              </div>
              <div className="w-100 d-flex justify-content-center">
                <PaginationCard
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  totalPages={totalPages}
                />
              </div>
            </>
          )}
        </div>
      )}
    </DemoLayout>
  );
};

export default Dashboard;
