import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DemoLayout from "../../Layout/Demoproject";
import { getData } from "../../Services/Services";
import PaginationCard from "../../Components/SubComponents/Pagination";
import FoodCard from "../../Components/SubComponents/FoodCard";

const Dashboard = () => {
  const [card, setCard] = useState([]);
  const [food, setFood] = useState([]);
  const [search, setSearch] = useState("");
  const [counter, setCounter] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    getData(`/foods/favourites?page=${currentPage}`).then((res) => {
      setFood(res.results);
      const residual = res.count % 10;
      const pages = (res.count - residual) / 10;
      setTotalPages(pages % 2 == 0 && pages === 1 ? pages : pages + 1);
    });
  }, [counter, currentPage]);

  return (
    <DemoLayout setSearch={setSearch} counter={counter}>
      <div className="w-100 body-main  p-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3>Favourite Foods</h3>
        </div>
        {localStorage.getItem("token") ? (
          <>
            {food.length > 0 ? (
              <div className="foods">
                {food?.map((item, index) => (
                  <FoodCard
                    key={index}
                    {...item.food}
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
              <h6>
                No any favourite foods{" "}
                <Link className="text-orange" to={"/dashboard"}>
                  add food
                </Link>
              </h6>
            )}
          </>
        ) : (
          <h6>
            No any favourite foods, For adding to favourite please{" "}
            <Link className="text-orange" to={"/login"}>
              login
            </Link>
          </h6>
        )}
      </div>
    </DemoLayout>
  );
};

export default Dashboard;
