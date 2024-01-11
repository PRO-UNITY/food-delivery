import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DemoLayout from "../../../Layout/Demoproject";
import { getDataWithToken, getUserData } from "../../../Services/Services";
import FoodCard from "../../../Components/SubComponents/FoodCard";
import Loader from "../../../Components/SubComponents/Loader";
import PaginationCard from "../../../Components/SubComponents/Pagination";

const KitchenCategoryDetail = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [counter, setCounter] = useState(0);
  const [search, setSearch] = useState("");
  const { category_id } = useParams();
  const { kitchen_id } = useParams();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const func = token ? getUserData : getDataWithToken;
    func(
      `/kitchen/category/${category_id}/food/${kitchen_id}?page=${currentPage}`
    ).then((res) => {
      setFoods(res.data.results);
      console.log(res.data.results);
      const residual = res.data.count % 10;
      const pages = (res.data.count - residual) / 10;
      setTotalPages(pages % 2 == 0 && pages === 1 ? pages : pages + 1);
      setLoading(false);
    });
  }, [currentPage, counter, token]);

  return (
    <DemoLayout setSearch={setSearch} counter={counter}>
      {loading ? (
        <Loader />
      ) : (
        <div className="body-main w-100 p-5">
          <h3>Foods by Category</h3>
          <div className="foods">
            {foods.map((item, index) => (
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
        </div>
      )}
    </DemoLayout>
  );
};

export default KitchenCategoryDetail;
