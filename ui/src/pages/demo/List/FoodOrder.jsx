import { useEffect, useState } from "react"
import DemoLayout from "../../../Layout/Demoproject"
import { BASE_URL, getDataWithToken, postDataWithToken } from "../../../functions/function"
import { Link, useNavigate } from "react-router-dom"
import Success from '../../../assets/images/success.png'
// import Button from 'react-bootstrap/Button';
// import Spinner from 'react-bootstrap/Spinner';

const calculateTotalPrice = (item, count) => {
  return item.price * count;
};

const FoodOrder = () => {
    const [search, setSearch] = useState('');
    const [active, setActive] = useState(false);
    const cardItems = localStorage.getItem('card');
    const [card, setCard] = useState(JSON.parse(cardItems));
    const [counts, setCounts] = useState(card?.map((item)=>item.count));
    const [count, setCount] = useState(0);
    const navigate = useNavigate();
    const [totalPrices, setTotalPrices] = useState(
      card?.map((item, index) => calculateTotalPrice(item, counts[index]))
    );
    
    
    useEffect(() => {
      localStorage.setItem('card', JSON.stringify(card));
    }, [card]);
  
    const handleIncrement = (index) => {
      const newCounts = [...counts];
      newCounts[index]++;
      setCounts(newCounts);
      updateTotalPrices(index, newCounts[index]);
      updateLocalStorage(index, newCounts[index]);
      setCount(count => count + 1);
    };
    

    const removeFromCard = (index) => {
        const newCard = [...card];
        newCard.splice(index, 1);
        setCard(newCard);
      
        const newCounts = [...counts];
        newCounts.splice(index, 1);
        setCounts(newCounts);
      
        const newTotalPrices = [...totalPrices];
        newTotalPrices.splice(index, 1);
        setTotalPrices(newTotalPrices);
      
        localStorage.setItem("card", JSON.stringify(newCard));
        setCount(count=>count+1)
      };
      
  
      const handleDecrement = (index) => {
        const newCounts = [...counts];
        if (newCounts[index] > 1) {
          newCounts[index]--;
          setCounts(newCounts);
          updateTotalPrices(index, newCounts[index]);
          updateLocalStorage(index, newCounts[index]);
          setCount(count => count + 1);
        } else {
          removeFromCard(index);
          setCount(count => count + 1);
        }
      };
      
  
    const updateLocalStorage = (index, count) => {
      const updatedCard = [...card];
      updatedCard[index].count = count;
      updatedCard[index].totalPrice = calculateTotalPrice(updatedCard[index], count);
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
      postDataWithToken(data, `/orders`)
        .then(() =>{
            setActive(true)
            setTimeout(()=>{
                setActive(false)
                navigate(`/`)
            },2000)
        })
        .then(() => localStorage.removeItem("card"));
    };

    // const [loading, setLoading] = useState(true);


    // if (loading) {
    //     return (
    //         <div className="container d-flex justify-content-center align-items-center py-5">
    //             <Button variant="warning" disabled>
    //                 <Spinner
    //                 as="span"
    //                 animation="grow"
    //                 size="sm"
    //                 role="status"
    //                 aria-hidden="true"
    //                 />
    //                 Loading...
    //             </Button>
    //         </div>
    //     )
    // }
    return ( 
        <DemoLayout count={count} setSearch={setSearch}>
            <div className=" body-main w-100 ">
                <div className="p-3 rounded-2 w-100">
                <h3 className="text-start">Food Order</h3>
                <table className="table mb-3 border">
                  <thead>
                    <tr>
                      <th scope="col">N</th>
                      <th scope="col">Name</th>
                      <th scope="col">Count</th>
                      <th scope="col">Price</th>
                      <th scope="col">Add Count</th>
                    </tr>
                  </thead>
                  <tbody>
                    {card?.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{counts[index]}</td>
                        <td>{calculateTotalPrice(item, counts[index])}</td>
                        <td className="btn-group" role="group" aria-label="Basic example">
                          <button
                            className="btn btn-info"
                            onClick={() => handleIncrement(index)}
                          >
                          <i className="fa-solid fa-plus"></i>
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDecrement(index)}
                          >
                            <i className="fa-solid fa-minus"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <h4>Total Price: {totalPrices?.reduce((acc, price) => acc + price, 0)}</h4>
                {card?.length>0?<button onClick={order} className="btn btn-warning float-end">
                  Order
                </button>:""}
                </div>
                {
                    active?
                    <div className="d-flex justify-content-center align-items-center w-100">
                    <img style={{width:"200px"}} src={Success} alt="" />
                    </div>:""
                }
            </div>
        </DemoLayout>
    )
}

export default FoodOrder