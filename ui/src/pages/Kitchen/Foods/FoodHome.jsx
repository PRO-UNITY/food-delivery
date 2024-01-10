import { useEffect, useState } from "react";
import { Link, useOutlet } from "react-router-dom";
import DemoLayout from "../../../Layout/Demoproject";
import { getUserData } from "../../../Services/Services";
import PaginationCard from "../../../Components/SubComponents/Pagination";
import Loader from "../../../Components/SubComponents/Loader";
import KitchenFood from "../../../Components/SubComponents/KitchenFood";
import { Outlet } from "react-router-dom";

const FoodHome = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isactive, setIsactive] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const outlet = useOutlet();

  useEffect(() => {
    getUserData(`/foods/`).then((res) => {
      setFoods(res.data.results);
      const residual = res.data.count % 10;
      const pages = (res.data.count - residual) / 10;
      setTotalPages(pages % 2 == 0 && pages === 1 ? pages : pages + 1);
      setLoading(false);
    });
  }, [isactive]);

  return (
    <DemoLayout setSearch={setSearch}>
      {loading ? (
        <Loader />
      ) : (
        <div className="body-main w-100 p-5">
          {outlet ? (
            <Outlet />
          ) : (
            <>
              <div className="d-flex justify-content-between align-items-center">
                <h3>All Foods</h3>
                <Link to={"add"} className="text-orange">
                  Add Food
                </Link>
              </div>
              <div className="foods">
                {foods.map((item, index) => (
                  <KitchenFood
                    {...item}
                    key={index}
                    setIsactive={setIsactive}
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

export default FoodHome;
