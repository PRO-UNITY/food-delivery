import { Link } from "react-router-dom";

const CategoryCard = (props) => {
  const { id, name } = props;
  return (
    <Link
      to={`/category/${id}`}
      className="text-dark"
      style={{ textDecoration: "none" }}
    >
      <div className="category-item bg-white">
        <i
          style={{ fontSize: "25px" }}
          className="fa-solid fa-bowl-food orange"
        ></i>
        <p className="name-category p-0 m-0 grey">{name}</p>
      </div>
    </Link>
  );
};

export default CategoryCard;
