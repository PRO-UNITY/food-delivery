import { Link, useLocation } from "react-router-dom";

const CategoryCard = (props) => {
  const { id, name, img } = props;
  const location = useLocation();
  const currentUrl = location.pathname;

  return (
    <Link
      to={`${currentUrl === "/categories" ? "" : `/category/${id}`}`}
      className="text-dark border-none"
    >
      <div className="category-item bg-white">
        <img style={{width:"35px", height:"35px", objectFit:"contein"}} src={img} alt="" />
        <p className="name-category">{`${name.length > 8?`${name.slice(0,6)+"..."}`:name}`}</p>
      </div>
    </Link>
  );
};

export default CategoryCard;
