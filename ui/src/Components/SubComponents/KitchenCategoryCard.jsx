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
        <i
          style={{ fontSize: "25px" }}
          className="fa-solid fa-bowl-food text-orange"
        ></i>
        <p className="name-category p-0 m-0 grey">
          {categories?.name} x{categories?.food_count}
        </p>
      </div>
    </Link>
  );
};
