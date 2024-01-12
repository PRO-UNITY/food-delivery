import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DemoLayout from "../../../Layout/Demoproject";
import { getData } from "../../../Services/Services";
import FoodCard from "../../../Components/SubComponents/FoodCard";
import PaginationCard from "../../../Components/SubComponents/Pagination";
import Loader from "../../../Components/SubComponents/Loader";

const CategoryDetails = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const { id } = useParams();
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    getData(`/foods/category/${id}?page=${currentPage}`).then((res) => {
      setFoods(res.data.results);
      const residual = res.data.count % 10;
      const pages = (res.data.count - residual) / 10;
      setTotalPages(pages % 2 == 0 && pages === 1 ? pages : pages + 1);
      setLoading(false);
    });
  }, [id, currentPage]);

  return (
    <DemoLayout setSearch={setSearch} counter={counter}>
      {loading ? (
        <Loader />
      ) : (
        <div className="body-main w-100 p-5">
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

export default CategoryDetails;
