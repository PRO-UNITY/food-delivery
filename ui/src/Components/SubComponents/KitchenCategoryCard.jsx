import { Link, useParams } from "react-router-dom";

export const KitchenCategoryCard = (props) => {
  const { id } = useParams();
  const { name, categories } = props;
  return (
    <Link
      to={`/kitchen/category/${categories.id}/food/${id}`}
      className="text-dark"
      style={{ textDecoration: "none" }}
    >
      <div className="category-item bg-white">
        <i className="fa-solid fa-bowl-food text-orange"></i>
        <p className="name-category grey">
          {categories?.name} x{categories?.food_count}
        </p>
      </div>
    </Link>
  );
};
