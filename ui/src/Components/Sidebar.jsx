import { Link ,Outlet} from "react-router-dom"

const Sidebar = () => {
    return (
        <div className="d-flex justify-content-start align-items-center w-100">
        <div class="d-flex flex-column flex-shrink-0 p-3 bg-light vh-100" style={{width:"280px"}}>
          <ul class="nav nav-pills flex-column mb-auto">
            <Link to={'/home/main'}>
                <li class="nav-item">
                <a href="#" class="nav-link active text-start" aria-current="page">
                    Home
                </a>
                </li>
            </Link>
            {/* <li>
              <a href="#" class="nav-link text-start">
                Customers
              </a>
            </li> */}
          </ul>
          
        </div>
        <div className="w-100">
        <Outlet/>
        </div>
        </div>
        
    )
}

export default Sidebar