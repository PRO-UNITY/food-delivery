import { useState, useEffect } from "react";
import { postDataWithToken } from "../../../functions";
import { useNavigate } from "react-router-dom";

const calculateTotalPrice = (item, count) => {
    return item.price * count;
};

const Card = () => {
  const cardItems = localStorage.getItem("card");
  const [card, setCard] = useState(JSON.parse(cardItems));
  const [counts, setCounts] = useState(Array(card?.length).fill(1));
  const navigate = useNavigate();
  const [totalPrices, setTotalPrices] = useState(
    card?.map((item, index) => calculateTotalPrice(item, counts[index]))
  );
  
console.log(totalPrices);

  useEffect(() => {
    localStorage.setItem("card", JSON.stringify(card));
  }, [card]);

  const handleIncrement = (index) => {
    const newCounts = [...counts];
    newCounts[index]++;
    setCounts(newCounts);
    updateTotalPrices(index, newCounts[index]);
    updateLocalStorage(index, newCounts[index]);
  };

  const handleDecrement = (index) => {
    const newCounts = [...counts];
    if (newCounts[index] > 1) {
      newCounts[index]--;
      setCounts(newCounts);
      updateTotalPrices(index, newCounts[index]);
      updateLocalStorage(index, newCounts[index]);
    } else {
      const newCard = [...card];
      newCard.splice(index, 1);
      setCard(newCard);
      setCounts(newCounts.filter((_, i) => i !== index));
      updateTotalPrices(index, 0);
      updateLocalStorage(index, 0);
    }
  };

  const updateLocalStorage = (index, count) => {
    const updatedCard = [...card];
    updatedCard[index].count = count;
    setCard(updatedCard);
  };

  const updateTotalPrices = (index, count) => {
    const newTotalPrices = [...totalPrices];
    newTotalPrices[index] = calculateTotalPrice(card[index], count);
    setTotalPrices(newTotalPrices);
  };

  

  const order = () => {
    const data = {
      status: 1,
      address: "buxoro",
      total_price : totalPrices?.reduce((acc, price) => acc + price, 0),
      foods: card.map((item, index) => ({
        ...item,
        count: counts[index],
        totalPrice: totalPrices[index],
      })),
      kitchen: card[0].kitchen_id,
    };
    postDataWithToken(data, `/delivery/send_order`)
      .then(() => navigate(`/home/main`))
      .then(() => localStorage.removeItem("card"));
  };

  return (
    <div className="d-flex justify-content-start align-items-start gap-2 w-100 vh-100 p-1">
      <div className="p-3 rounded-2 w-100">
        <h3 className="text-start">Categories</h3>
        <table className="table mb-3 border">
          <thead>
            <tr>
              <th scope="col">N</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Kitchen_id</th>
              <th scope="col">Count</th>
              <th scope="col">Item Price</th>
              <th scope="col">Total Price</th>
            </tr>
          </thead>
          <tbody>
            {card?.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.kitchen_id}</td>
                <td>{counts[index]}</td>
                <td>{calculateTotalPrice(item, counts[index])}</td>
                <td>
                  <button
                    className="btn btn-success"
                    onClick={() => handleIncrement(index)}
                  >
                    +
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDecrement(index)}
                  >
                    -
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <h4>Total Price: {totalPrices?.reduce((acc, price) => acc + price, 0)}</h4>
        <button onClick={order} className="btn btn-primary float-end">
          Order
        </button>
      </div>
    </div>
  );
};

export default Card;
