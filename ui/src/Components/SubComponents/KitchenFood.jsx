import { Link } from "react-router-dom";
import StarRating from "./StarsRating";
import IconFood from '../../assets/images/iconfood.png'

const KitchenFood = (props) => {
  const { id, food_img, price, name, setIsactive } = props;

  const deleteFood = (id) => {
    deleteData(`/foods/${id}`).then(() => setIsactive((p) => !p));
  };

  return (
    <div
      className="food-item bg-white  text-dark"
      style={{ textDecoration: "none" }}
    >
      <div className="w-100 d-flex justify-content-center">
        <img
          className="mb-2 food-img"
          src={`${
            food_img
              ? food_img
              : IconFood
          }`}
        />
      </div>
      <StarRating numStars={5} />
      <div className="d-flex justify-content-between w-100 align-items-center">
        <div>
          <p className="kitchen-food-name">
            {name}
          </p>
          <p className="kitchen-food-price">
            <span className="text-orange">$</span>
            {price}
          </p>
        </div>
        <Link to={`${id}`} className={`btn-add bg-green border-none`}>
          <i className="fa-solid fa-eye"></i>
        </Link>
      </div>
      <div className="sale">
        <div className="d-flex justify-content-center align-items-center px-2 text-white sale-percent">
          15% Off
        </div>
        <button
          onClick={() => deleteFood(id)}
          className="btn-favourite text-danger"
        >
          <i className="fa-solid fa-trash"></i>
        </button>
      </div>
    </div>
  );
};

export default KitchenFood;
