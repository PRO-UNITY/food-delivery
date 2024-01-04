import { useEffect, useState } from "react";
import DemoLayout from "../../Layout/Demoproject";
import { getDataWithToken } from "../../Services/Services";
import PaginationCard from "../../Components/SubComponents/Pagination";
import KitchenCard from "../../Components/SubComponents/KitchenCard";
import Loader from "../../Components/SubComponents/Loader";

const AllKitchens = () => {
  const [kitchen, setKitchen] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    getDataWithToken(`/kitchen/`).then((res) => {
      const partKitchen = res.data.results;
      const residual = res.data.count % 10;
      const pages = (res.data.count - residual) / 10;
      setTotalPages(pages % 2 == 0 && pages === 1 ? pages : pages + 1);
      setKitchen(partKitchen);
      setLoading(false);
    });
  }, []);

  return (
    <DemoLayout setSearch={setSearch}>
      {loading ? (
        <Loader />
      ) : (
        <div className="body-main w-100 p-5">
          <h3>All Restaurants</h3>
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
