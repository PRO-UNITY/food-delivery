import { useEffect, useState } from "react";
import DemoLayout from "../../Layout/Demoproject";
import { getData } from "../../Services/Services";
import { useParams } from "react-router-dom";

const NewOrderDetail = () => {
  const [search, setSearch] = useState("");
  const [detail, setDetail] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getData(`/order/${id}/delivery/accept`).then((res) => {
      setDetail(res.food);
    });
  }, []);

  return (
    <DemoLayout setSearch={setSearch}>
      <div className="w-100 body-main py-5 px-2">
        {detail?.map((item, index) => (
          <div key={index} className="shadow w-100 rounded bg-white mb-1 p-4 d-flex align-items-center gap-2">
            <div className="w-50">
              <img className="w-100 rounded" src={item.food_img} alt="" />
            </div>
            <div className="w-50">
              <h5>N : {index + 1}</h5>
              <h5>Count : {item.count}</h5>
              <h5>Name : {item.name}</h5>
              <h5>Description : {item.description}</h5>
              <h5>Price : {item.price}</h5>
            </div>
          </div>
        ))}
      </div>
    </DemoLayout>
  );
};

export default NewOrderDetail;
