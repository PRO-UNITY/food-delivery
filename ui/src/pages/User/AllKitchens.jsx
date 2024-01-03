import { useEffect, useState } from "react";
import DemoLayout from "../../Layout/Demoproject";
import { getDataWithToken } from "../../Functions/Function";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import PaginationCard from "../../CleanComponents/Pagination";
import KitchenCard from "../../CleanComponents/KitchenCard";

const AllKitchens = () => {
  const [kitchen, setKitchen] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    getDataWithToken(`/kitchen/`).then((res) => {
      const partKitchen = res.data.results;
      setKitchen(partKitchen);
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
          <h3 style={{ fontWeight: 700 }}>All Restaurants</h3>
          <div className="foods">
            {kitchen.map((item, index) => (
              <KitchenCard key={index} {...item} />
            ))}
          </div>
          <div className="w-100 d-flex justify-content-center">
            <PaginationCard
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
            />
          </div>
        </div>
      )}
    </DemoLayout>
  );
};

export default AllKitchens;
