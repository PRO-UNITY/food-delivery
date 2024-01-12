import { useEffect, useState } from "react";
import { Link, Outlet, useOutlet } from "react-router-dom";
import DemoLayout from "../../../Layout/Demoproject";
import { getData } from "../../../Services/Services";
import PaginationCard from "../../../Components/SubComponents/Pagination";
import Loader from "../../../Components/SubComponents/Loader";
import CardUser from "../../../Components/SubComponents/CardUser";

const KitchenManagerHome = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isactive, setIsactive] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const outlet = useOutlet();

  useEffect(() => {
    getData(`/managers?/page=${currentPage}`).then((res) => {
      setDeliveries(res.results);
      const residual = res.count % 10;
      const pages = (res.count - residual) / 10;
      setTotalPages(pages % 2 == 0 && pages === 1 ? pages : pages + 1);
      setLoading(false);
    });
  }, [isactive, currentPage]);

  return (
    <DemoLayout setSearch={setSearch}>
      {loading ? (
        <Loader />
      ) : (
        <div className="body-main w-100 p-5">
          {outlet ? (
            <Outlet />
          ) : (
            <>
              <div className="d-flex justify-content-between align-items-center">
                <h3>All Suppliers</h3>
                <Link to={"add"} className="text-orange">
                  Add Manager
                </Link>
              </div>
              <div className="foods">
                {deliveries?.map((item, index) => (
                  <CardUser
                    key={index}
                    {...item}
                    isactive={isactive}
                    setIsactive={setIsactive}
                  />
                ))}
                <div className="w-100 d-flex justify-content-center">
                  <PaginationCard
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalPages={totalPages}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </DemoLayout>
  );
};

export default KitchenManagerHome;
