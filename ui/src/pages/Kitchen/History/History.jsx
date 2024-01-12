import { useEffect, useState } from "react";
import DemoLayout from "../../../Layout/Demoproject";
import PaginationCard from "../../../Components/SubComponents/Pagination";
import { getData } from "../../../Services/Services";
import Loader from "../../../Components/SubComponents/Loader";
import TableHistory from "../../../Components/SubComponents/TableHistory";
import { Outlet, useOutlet } from "react-router-dom";

const History = () => {
  const [search, setSearch] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const outlet = useOutlet();

  useEffect(() => {
    getData(`/order/kitchen/history?page=${currentPage}`).then((res) => {
      setOrders(res.results);
      const residual = res.count % 10;
      const pages = (res.count - residual) / 10;
      setTotalPages(pages % 2 == 0 && pages === 1 ? pages : pages + 1);
      setLoading(false);
    });
  }, [currentPage]);

  return (
    <DemoLayout setSearch={setSearch}>
      <div className="body-main w-100  p-5">
        {outlet ? (
          <Outlet />
        ) : (
          <>
            <h3 className="mb-3">Order History</h3>
            {loading ? (
              <Loader />
            ) : (
              <>
                {orders?.map((item, index) => (
                  <TableHistory key={item.id} {...item} index={index} />
                ))}
                <div className="w-100 d-flex justify-content-center">
                  <PaginationCard
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalPages={totalPages}
                  />
                </div>
              </>
            )}
          </>
        )}
      </div>
    </DemoLayout>
  );
};

export default History;
