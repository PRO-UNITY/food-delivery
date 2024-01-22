import { useState } from "react";
import DemoLayout from "../../Layout/Demoproject";
import Success from "../../assets/images/success.png";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const [search, setSearch] = useState("");
  const [active, setActive] = useState(false);
  const navigate = useNavigate();

  const order = (e) => {
    e.preventDefault();
    setActive(true);
    localStorage.removeItem("card");
    setTimeout(() => {
      setActive(false);
      navigate(`/dashboard`);
    }, 2000);
  };
  return (
    <DemoLayout setSearch={setSearch}>
      <div className=" body-main w-100 py-5 px-2d-flex justify-content-center align-items-start">
        {active ? (
          <div className="d-flex justify-content-center align-items-center w-100">
            <img className="succesOrder" src={Success} alt="" />
          </div>
        ) : (
          <form onSubmit={order} className="card-payment bg-white shadow p-3">
            <label className="mb-2">Type your number of cart</label>
            <input
              placeholder="0000 0000 0000 0000"
              type="number"
              className="form-control w-100"
              required
            />
            <label className="mb-2">Type your date of cart</label>
            <input
              placeholder="00 00"
              type="text"
              className="form-control w-25"
              required
            />
            <label className="mb-2">How much do you want pay?</label>
            <div className="d-flex w-100 gap-2">
              <input
                placeholder=""
                type="text"
                className="form-control w-75"
                required
              />
              <button className="btn btn-warning w-25">pay</button>
            </div>
          </form>
        )}
      </div>
    </DemoLayout>
  );
};

export default Payment;
