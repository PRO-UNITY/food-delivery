import { useEffect, useState } from "react";
import { Link, useOutlet } from "react-router-dom";
import DemoLayout from "../../../Layout/Demoproject";
import { getData } from "../../../Services/Services";
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
    getData(`/foods/?page=${currentPage}`).then((res) => {
      setFoods(res.results);
      console.log(res);
      const residual = res.count % 10;
      const pages = (res.count - residual) / 10;
      setTotalPages(pages % 2 == 0 && pages === 1 ? pages : pages + 1);
      setLoading(false);
    });
  }, [isactive, currentPage]);

  return (
    <DemoLayout setSearch={setSearch}>
      {loading ? (
        <Loader />
      ) : (
        <div className="body-main w-100 py-5 px-2">
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
                    isactive={isactive}
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
