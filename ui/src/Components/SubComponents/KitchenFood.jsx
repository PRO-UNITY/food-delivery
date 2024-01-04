import { Link } from "react-router-dom";

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
        <i className="fa-solid fa-star text-orange"></i>
        <i className="fa-solid fa-star text-orange"></i>
        <i className="fa-solid fa-star text-orange"></i>
        <i className="fa-solid fa-star text-orange"></i>
        <i className="fa-solid fa-star text-orange"></i>
      </div>
      <div className="d-flex justify-content-between w-100 align-items-center">
        <div>
          <p style={{ fontWeight: 500 }} className="p-0 m-0">
            {name}
          </p>
          <p style={{ fontWeight: 800 }}>
            <span className="text-orange">$</span>
            {price}
          </p>
        </div>
        <Link
          style={{ textDecoration: "none" }}
          to={`/food/${id}`}
          className={`btn-add bg-green`}
        >
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
