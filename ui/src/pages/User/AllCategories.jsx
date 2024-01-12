import { useEffect, useState } from "react";
import DemoLayout from "../../Layout/Demoproject";
import { getData } from "../../Services/Services";
import CategoryCard from "../../Components/SubComponents/CategoryCard";
import Loader from "../../Components/SubComponents/Loader";

const AllCategories = () => {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getData(`/kitchen/category`).then((res) => {
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
          <h3>All Categories</h3>
          <div className="foods">
            {category.map((item, index) => (
              <CategoryCard key={index} {...item} />
            ))}
          </div>
        </div>
      )}
    </DemoLayout>
  );
};

export default AllCategories;
