import { useEffect, useState } from "react";
import DemoLayout from "../../../Layout/Demoproject";
import { getData } from "../../../Services/Services";
import Loader from "../../../Components/SubComponents/Loader";
import CategoryCard from "../../../Components/SubComponents/CategoryCard";
import PaginationCard from "../../../Components/SubComponents/Pagination";

const CategoryHome = () => {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    getData(`/kitchen/category?page=${currentPage}`).then((res) => {
      setCategory(res.results);
      const residual = res.count % 10;
      const pages = (res.count - residual) / 10;
      setTotalPages(pages % 2 == 0 && pages === 1 ? pages : pages + 1);
      setLoading(false);
    });
  }, [currentPage]);

  return (
    <DemoLayout setSearch={setSearch}>
      {loading ? (
        <Loader />
      ) : (
        <div className="body-main w-100 py-5 px-2">
          <div className="d-flex justify-content-between align-items-center">
            <h3>All Categories</h3>
          </div>
          <div className="foods">
            {category.map((item, index) => (
              <CategoryCard {...item} key={index} />
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

export default CategoryHome;
