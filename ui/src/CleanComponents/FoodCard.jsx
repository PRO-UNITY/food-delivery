import { Link } from "react-router-dom";
import { deleteData, postDataWithToken } from "../Functions/Function";
import { useState, useEffect } from "react";

const FoodCard = (props) => {
  const {
    id,
    food_img,
    name,
    price,
    favorite,
    setCounter,
    setIsActive,
    counter,
  } = props;
  const token = localStorage.getItem("token");
  const [card, setCard] = useState(
    JSON.parse(localStorage.getItem("card")) || []
  );  

  const addToFavourite = (item) => {
    const data = {
      food: item.id,
      is_favorite: true,
    };
    postDataWithToken(data, `/foods/favourites`);
    setIsActive((p) => !p);
  };

  const removeItemFavoutite = (item) => {
    deleteData(`/foods/favourite/${item.id}`);
    setIsActive((p) => !p);
  };

  const addToCard = (item) => {
    const card = JSON.parse(localStorage.getItem("card")) || [];
    const updatedCard = [...card, { ...item, count: 1 }];
    localStorage.setItem("card", JSON.stringify(updatedCard));
    setCounter((counter) => counter + 1);
    setCard(updatedCard);
  };

  useEffect(() => {
    const savedCard = JSON.parse(localStorage.getItem("card")) || [];
    setCard(savedCard);
  }, []);

  return (
    <div
      className="food-item bg-white  text-dark"
      style={{ textDecoration: "none" }}
    >
      <Link
        to={`/food-detail/${id}`}
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
          src={`${
            food_img
              ? food_img
              : "https://www.freeiconspng.com/uploads/food-icon-7.png"
          }`}
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
            {name}
          </p>
          <p style={{ fontWeight: 800 }}>
            <span className="orange">$</span>
            {price}
          </p>
        </div>
        {localStorage.getItem("role") !== "undefined" ? (
          <button
            disabled={card.some((cartItem) => cartItem.id === id)}
            onClick={() => addToCard(props)}
            className={`${
              card.some((cartItem) => cartItem.id === id)
                ? "btn-add bg-green"
                : "btn-add bg-orange"
            }`}
          >
            <i
              className={`${
                card.some((cartItem) => cartItem.id === id)
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
        {token ? (
          <>
            {favorite ? (
              <button
                onClick={() => removeItemFavoutite(props)}
                className="btn-favourite orange"
              >
                <i className="fa-solid fa-heart"></i>
              </button>
            ) : (
              <button
                onClick={() => addToFavourite(props)}
                className="btn-favourite grey"
              >
                <i className="fa-solid fa-heart"></i>
              </button>
            )}
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default FoodCard;
