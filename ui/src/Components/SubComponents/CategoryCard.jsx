import { Link, useLocation } from "react-router-dom";

const CategoryCard = (props) => {
  const { id, name } = props;
  const location = useLocation();
  const currentUrl = location.pathname;

  return (
    <Link
      to={`${currentUrl === "/categories" ? "" : `/category/${id}`}`}
      className="text-dark border-none"
    >
      <div className="category-item bg-white">
        <i className="fa-solid fa-bowl-food text-orange"></i>
        <p className="name-category">{`${name.length > 8?`${name.slice(0,6)+"..."}`:name}`}</p>
      </div>
    </Link>
  );
};

export default CategoryCard;
