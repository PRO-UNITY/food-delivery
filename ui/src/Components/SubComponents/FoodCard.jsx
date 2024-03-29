import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { deleteData, postData } from "../../Services/Services";
import StarRating from "./StarsRating";
import IconFood from "../../assets/images/iconfood.png";

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
    setShow,
    kitchen,
  } = props;
  const token = localStorage.getItem("token");
  const location = useLocation();
  const currentUrl = location.pathname;
  const [card, setCard] = useState(
    JSON.parse(localStorage.getItem("card")) || []
  );

  const addToFavourite = (item) => {
    const data = {
      food: item.id,
      is_favorite: true,
    };
    postData(data, `/foods/favourites`);
    setCounter((counter) => counter + 1);
  };

  const removeItemFavoutite = (item) => {
    deleteData(`/foods/favourite/${item.id}`);
    setCounter((counter) => counter + 1);
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

  const handleShow = () => setShow(true);

  return (
    <div className="food-item bg-white shadow text-dark">
      <Link
        to={`/food-detail/${id}`}
        className="w-100 d-flex justify-content-center"
      >
        <img
          className="mb-2 food-img"
          src={`${food_img ? food_img : IconFood}`}
        />
      </Link>
      <StarRating numStars={5} />
      <div className="d-flex justify-content-between w-100 align-items-center">
        <div>
          <p className="m-0">{`${
            name.length > 10 ? `${name.slice(0, 8) + "..."}` : name
          }`}</p>
          <span style={{ fontSize: "14px" }} className="text-secondary">
            {kitchen.name}
          </span>
          <p style={{ fontWeight: 800 }}>
            <span className="text-orange">$</span>
            {price}
          </p>
        </div>
        {localStorage.getItem("role") ? (
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
            {currentUrl === "/favourite" ? (
              <button onClick={handleShow} className="btn-favourite red">
                <i className="fa-solid fa-trash"></i>
              </button>
            ) : (
              <>
                {favorite ? (
                  <button
                    onClick={() => removeItemFavoutite(props)}
                    className="btn-favourite text-orange"
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
