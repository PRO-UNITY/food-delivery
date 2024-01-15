import { Link } from "react-router-dom";

const MoreButton = (props) => {
  const { count, item } = props;
  return (
    <Link
      to={`${
        item === "category"
          ? "/allcategories"
          : item === "kitchen"
          ? "/allkitchens"
          : ""
      }`}
      className="text-dark border-none"
    >
      <div className="category-item bg-orange">
        <p className="count-item">{count}+</p>
      </div>
    </Link>
  );
};

export default MoreButton;
