import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DemoLayout from "../../../Layout/Demoproject";
import {
  getDataWithToken,
  getUserData,
} from "../../../Services/Services";
import KitchenCategoryCard from "../../../Components/SubComponents/KitchenCategoryDetail";
import PaginationCard from "../../../Components/SubComponents/Pagination";
import FoodCard from "../../../Components/SubComponents/FoodCard";
import Loader from "../../../Components/SubComponents/Loader";

const KitchenDetails = () => {
  const [foods, setFoods] = useState([]);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [card, setCard] = useState([]);
  const [data, setData] = useState({});
  const { id } = useParams();
  const { category_id } = useParams();
  const { kitchen_id } = useParams();
  const token = localStorage.getItem("token");
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const func = token ? getUserData : getDataWithToken;
    func(`/kitchen/${id}/foods?page=${currentPage}`).then((res) => {
      setFoods(res.data.results);
      const residual = res.data.count % 10;
      const pages = (res.data.count - residual) / 10;
      setTotalPages(pages % 2 == 0 && pages === 1 ? pages : pages + 1);
      setLoading(false);
    });
  }, [id, currentPage, counter]);

  useEffect(() => {
    console.log("res");
    getDataWithToken(`/kitchen/${id}/categories`).then((res) => {
      setCategory(res);
      console.log(res);
    });
  }, []);

  useEffect(() => {
    getDataWithToken(`/kitchen/${id}`).then((res) => {
      setData(res);
    });
  }, []);

  useEffect(() => {
    getDataWithToken(`/kitchen/${id}`).then((res) => {
      setData(res);
    });
  }, []);

  useEffect(() => {
    const func = token ? getUserData : getDataWithToken;
    func(
      `/kitchen/category/${category_id}/food/${kitchen_id}?page=${currentPage}`
    ).then((res) => {
      setFoods(res.data.results);
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
          <h3>About {data?.name}</h3>

          <div className="order-history">
            <div className="img-order-history p-3">
              <img className="img-restaurant" src={data?.logo} alt="" />
            </div>
            <div className="title-order-history">
              <ul className="list-group w-100">
                <li className="list-group-item">Name : {data?.name}</li>
                <li className="list-group-item">
                  Description : {data?.description}
                </li>
                <li className="list-group-item">
                  Open time : {data?.open_time}
                </li>
                <li className="list-group-item">
                  Close time : {data?.close_time}
                </li>
              </ul>
            </div>
          </div>

          <h4>Categories of {data?.name}</h4>
          <div className="categories w-100 mb-3">
            {category?.map((item, index) => (
              <KitchenCategoryCard key={index} {...item} />
            ))}
          </div>
          <hr />
          <h4>Foods of {data?.name}</h4>

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

export default KitchenDetails;
