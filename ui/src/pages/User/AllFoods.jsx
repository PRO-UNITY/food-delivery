import { useEffect, useState } from "react";
import DemoLayout from "../../Layout/Demoproject";
import { getDataWithToken, getUserData } from "../../Functions/Function";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import PaginationCard from "../../CleanComponents/Pagination";
import FoodCard from "../../CleanComponents/FoodCard";

const AllFoods = () => {
  const [food, setFood] = useState([]);
  const [searchFood, setSearchFood] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [card, setCard] = useState([]);
  const [counter, setCounter] = useState(0);
  const [isactive, setIsActive] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    getDataWithToken(`/foods/`).then((res) => {
      const partFood = res.data.results;
      const residual = res.data.count % 10;
      const pages = (res.data.count - residual) / 10;
      setTotalPages(pages % 2 == 0 && pages === 1 ? pages : pages + 1);
      setFood(partFood);
      setLoading(false);
    });
  }, [currentPage]);

  useEffect(() => {
    const func = token ? getUserData : getDataWithToken;
    func(`/foods/`).then((res) => {
      const partFood = res.data.results;
      setFood(partFood);
      console.log(res.data.results);
      setLoading(false);
    });
  }, [token, isactive]);

  useEffect(() => {
    getDataWithToken(`/foods/?name=${search}`).then((res) => {
      setSearchFood(res.data.results);
    });
  }, [search]);

  return (
    <DemoLayout setSearch={setSearch}>
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
        <>
          {search != "" ? (
            <div className="body-main w-100 p-5">
              {searchFood.length > 0 ? (
                <h3 style={{ fontWeight: 700 }}>Foods by your search</h3>
              ) : (
                <h3 style={{ fontWeight: 700 }}>No any food by your search</h3>
              )}
              <div className="foods">
                {searchFood?.map((item, index) => (
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
            </div>
          ) : (
            <div className="body-main w-100 p-5">
              <h3 style={{ fontWeight: 700 }}>All Foods</h3>
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
            </div>
          )}
        </>
      )}
    </DemoLayout>
  );
};

export default AllFoods;
