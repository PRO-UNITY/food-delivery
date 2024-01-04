import { Link } from "react-router-dom";

const KitchenCard = (props) => {
  const { id, name, logo } = props;
  return (
    <Link
      to={`/kitchen/${id}`}
      className="text-dark"
      style={{ textDecoration: "none" }}
    >
      <div className="category-item bg-white">
        <img
          style={{ width: "35px", height: "35px", borderRadius: "10px" }}
          src={`${
            logo ? logo : "https://www.freeiconspng.com/uploads/food-icon-7.png"
          }`}
        />
        <p className="name-category p-0 m-0  grey">{name}</p>
      </div>
    </Link>
  );
};

export default KitchenCard;
