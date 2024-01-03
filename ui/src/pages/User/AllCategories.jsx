import { useEffect, useState } from "react";
import DemoLayout from "../../Layout/Demoproject";
import { getDataWithToken } from "../../Functions/Function";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import CategoryCard from "../../CleanComponents/CategoryCard";

const AllCategories = () => {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getDataWithToken(`/kitchen/category`).then((res) => {
      setCategory(res);
      setLoading(false);
    });
  }, []);

  return (
    <DemoLayout setSearch={setSearch}>
      {loading ? (
        <div className="container body-main d-flex justify-content-center align-items-center py-5">
          <Button variant="warning" disabled>
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            Loading...
          </Button>
        </div>
      ) : (
        <div className="body-main w-100 p-5">
          <h3 style={{ fontWeight: 700 }}>All Foods</h3>
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
