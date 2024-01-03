import { useEffect, useState } from "react";
import DemoLayout from "../../Layout/Demoproject";
import { deleteData, getUserData } from "../../Functions/Function";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Pagination from "react-bootstrap/Pagination";

const Dashboard = () => {
  const [card, setCard] = useState([]);
  const [food, setFood] = useState([]);
  const [search, setSearch] = useState("");
  const [isactive, setIsActive] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    getUserData(`/foods/favourites`).then((res) => {
      setFood(res.data.results);
      const residual = res.data.count % 10;
      const pages = (res.data.count - residual) / 10;
      setTotalPages(pages % 2 == 0 && pages === 1 ? pages : pages + 1);
    });
  }, [isactive, currentPage]);

  const addToCard = (item) => {
    const updatedCard = [...card, { ...item, count: 1 }];
    const totalPrice = updatedCard.reduce((acc, curr) => acc + curr.price, 0);

    localStorage.setItem("card", JSON.stringify(updatedCard));
    setCard(updatedCard);
  };

  useEffect(() => {
    const savedCard = JSON.parse(localStorage.getItem("card")) || [];
    setCard(savedCard);
  }, []);

  const removeItemFavoutite = (id) => {
    deleteData(`/foods/favourite/${id}`);
    setIsActive((p) => !p);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleNextPage = () => {
    if (currentPage <= 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <DemoLayout setSearch={setSearch}>
      <div className="w-100 body-main  p-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3>Favourite Foods</h3>
        </div>
        {localStorage.getItem("token") ? (
          <>
            {food.length > 0 ? (
              <div className="foods">
                {food?.map((item, index) => (
                  <div
                    key={index}
                    className="food-item bg-white  text-dark"
                    style={{ textDecoration: "none" }}
                  >
                    <Link
                      to={`/food-detail/${item.food.id}`}
                      className="w-100 d-flex justify-content-center"
                    >
                      <img
                        className="mb-2"
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "contain",
                          borderRadius: "20px",
                        }}
                        src={item?.food.food_img}
                      />
                    </Link>
                    <div className="mb-2">
                      <i className="fa-solid fa-star orange"></i>
                      <i className="fa-solid fa-star orange"></i>
                      <i className="fa-solid fa-star orange"></i>
                      <i className="fa-solid fa-star orange"></i>
                      <i className="fa-solid fa-star orange"></i>
                    </div>
                    <div className="d-flex justify-content-between w-100 align-items-center">
                      <div>
                        <p style={{ fontWeight: 500 }} className="p-0 m-0">
                          {item?.food.name}
                        </p>
                        <p style={{ fontWeight: 800 }}>
                          <span className="orange">$</span>
                          {item?.food.price}
                        </p>
                      </div>
                      {localStorage.getItem("role") !== "undefined" ? (
                        <button
                          disabled={card.some(
                            (cartItem) => cartItem.id === item.id
                          )}
                          onClick={() => addToCard(item)}
                          className={`${
                            card.some((cartItem) => cartItem.id === item.id)
                              ? "btn-add bg-green"
                              : "btn-add bg-orange"
                          }`}
                        >
                          <i
                            className={`${
                              card.some((cartItem) => cartItem.id === item.id)
                                ? "fa-solid fa-check"
                                : "fa-solid fa-plus"
                            }`}
                          ></i>
                        </button>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="sale">
                      <div className="d-flex justify-content-center align-items-center px-2 text-white sale-percent">
                        15% Off
                      </div>
                      <button
                        onClick={() => removeItemFavoutite(item.food.id)}
                        style={{ color: "rgb(247, 69, 69)" }}
                        className="btn-favourite"
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </div>
                ))}
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
            ) : (
              <h6>
                No any favourite foods{" "}
                <Link className="orange" to={"/dashboard"}>
                  add food
                </Link>
              </h6>
            )}
          </>
        ) : (
          <h6>
            No any favourite foods, For adding to favourite please{" "}
            <Link className="orange" to={"/login"}>
              login
            </Link>
          </h6>
        )}
      </div>
    </DemoLayout>
  );
};

export default Dashboard;
