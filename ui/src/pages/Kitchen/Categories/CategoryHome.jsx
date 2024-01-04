import { useEffect, useState } from "react";
import DemoLayout from "../../../Layout/Demoproject";
import { getUserData } from "../../../Services/Services";
import Loader from "../../../Components/SubComponents/Loader";
import CategoryCard from "../../../Components/SubComponents/CategoryCard";

const CategoryHome = () => {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getUserData(`/kitchen/category`).then((res) => {
      setCategory(res);
      setLoading(false);
    });
  }, []);

  return (
    <DemoLayout setSearch={setSearch}>
      {loading ? (
        <Loader />
      ) : (
        <div className="body-main w-100 p-5">
          <div className="d-flex justify-content-between align-items-center">
            <h3>All Categories</h3>
          </div>
          <div className="foods">
            {category.map((item, index) => (
              <CategoryCard {...item} key={index} />
            ))}
          </div>
        </div>
      )}
    </DemoLayout>
  );
};

export default CategoryHome;
