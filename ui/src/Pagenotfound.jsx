import { Link } from "react-router-dom"
import Notfound from './assets/images/404.avif'

const Pagenotfound = () => {
    return (
        <div className="container d-flex flex-column justify-content-center align-items-center py-5">
            <h1 className="mb-5">Page Not Found!</h1>
            <img className="w-50" src={Notfound} alt="" />
            <Link to={'/'} className="btn btn-success rounded btn-lg">Back to home</Link>
        </div>
    )
}

export default Pagenotfound