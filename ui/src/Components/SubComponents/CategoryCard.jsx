import { Link, useLocation } from "react-router-dom";

const CategoryCard = (props) => {
  const { id, name } = props;
  const location = useLocation();
  const currentUrl = location.pathname;

  return (
    <Link
      to={`${currentUrl ==="/categories"? "":`/kitchen/category/${id}`}`}
      className="text-dark"
      style={{ textDecoration: "none" }}
    >
      <div className="category-item bg-white">
        <i
          style={{ fontSize: "25px" }}
          className="fa-solid fa-bowl-food text-orange"
        ></i>
        <p className="name-category p-0 m-0 grey">{name}</p>
      </div>
    </Link>
  );
};

export default CategoryCard;
