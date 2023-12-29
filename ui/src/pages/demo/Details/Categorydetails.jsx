import { useEffect, useState } from "react";
import DemoLayout from "../../../Layout/Demoproject";
import { getDataWithToken, BASE_URL } from "../../../functions/function";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Pagination from "react-bootstrap/Pagination";
import Spinner from "react-bootstrap/Spinner";
import { Link } from "react-router-dom";
import FoodCard from "../../../CleanComponents/FoodCard";

const CategoryDetails = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const { id } = useParams();
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    getDataWithToken(`/foods/category/${id}?page=${currentPage}`).then(
      (res) => {
        setFoods(res.data.results);
        const residual = res.data.count % 10;
        const pages = (res.data.count - residual) / 10;
        setTotalPages(pages % 2 == 0 && pages === 1 ? pages : pages + 1);
        setLoading(false);
      }
    );
  }, [id, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleNextPage = () => {
    if (currentPage <= 1) {
      setCurrentPage(currentPage + 1);
    }
    console.log(currentPage);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
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
            <Pagination className="mt-4">
              <Pagination.Prev
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              />
              {[...Array(totalPages).keys()].map((page) => (
                <Pagination.Item
                  key={page + 1}
                  active={page + 1 === currentPage}
                  onClick={() => handlePageChange(page + 1)}
                >
                  {page + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              />
            </Pagination>
          </div>
        </div>
      )}
    </DemoLayout>
  );
};

export default CategoryDetails;
