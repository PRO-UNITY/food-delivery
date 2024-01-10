import { Link } from "react-router-dom";
import IconFood from '../../assets/images/iconfood.png'

const KitchenCard = (props) => {
  const { id, name, logo } = props;
  return (
    <Link
      to={`/kitchen/${id}`}
      className="text-dark border-none"
    >
      <div className="category-item bg-white">
        <img
          src={`${
            logo ? logo : IconFood
          }`}
        />
        <p className="name-category grey">{name}</p>
      </div>
    </Link>
  );
};

export default KitchenCard;
