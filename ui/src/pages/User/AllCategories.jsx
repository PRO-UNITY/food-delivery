import { useEffect, useState } from "react";
import DemoLayout from "../../Layout/Demoproject";
import { getData } from "../../Services/Services";
import CategoryCard from "../../Components/SubComponents/CategoryCard";
import Loader from "../../Components/SubComponents/Loader";
import PaginationCard from "../../Components/SubComponents/Pagination";

const AllCategories = () => {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    getData(`/kitchen/category`).then((res) => {
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
        <div className="body-main w-100 p-5">
          <h3>All Categories</h3>
          <div className="foods">
            {category.map((item, index) => (
              <CategoryCard key={index} {...item} />
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

export default AllCategories;
