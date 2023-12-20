import './Demo.css'
import { useState } from 'react';

const DemoNavbar = ({ setshowSidebar, setSearch }) => {
  const [inputVal, setInputVal] = useState('')
  setSearch(inputVal)

    return (
      <div className="hrms-doc-navbar demo-navbar d-flex flex-column flex-md-row gap-3 align-items-center bg-white  justify-content-between px-md-5 py-3">
        <i
          className="fa-solid fa-bars position-absolute top-0 start-0 m-3 my-4 "
          onClick={() => setshowSidebar((prev) => !prev)}
        ></i>
        <div className="searchbar w-50 bg-light mx-auto py-1 px-2 rounded">
          <i className="fa-solid fa-magnifying-glass orange"></i>
          <input onChange={(e)=>setInputVal(e.target.value)} type="text" placeholder="What do you want eat today" className="px-2 py-1 w-75 bg-light" />
        </div>
        
      </div>
    );
  };
  
  export default DemoNavbar;
  