import { Link } from "react-router-dom"

const RegisterRestaurant = () => {
    return(
        <div className="container d-flex justify-content-center align-items-center py-5">
    <div className="card w-50">
        <div className="card-header bg-primary text-light">
            <h1>Register</h1>
        </div>
        <div className="card-body">
            <form className="text-align-start">
                <input placeholder="firstname" className="form-control mb-2" type="text" />
                <input placeholder="lastname" className="form-control mb-2" type="text" />
                <input placeholder="username" className="form-control mb-2" type="text" />
                <input placeholder="email" className="form-control mb-2" type="text" />
                <input placeholder="password" className="form-control mb-2" type="text" />
                <input placeholder="repassword" className="form-control mb-2" type="text" />
                <div className="d-flex gap-2 justify-content-between align-items-center">
                <div className="d-flex gap-2">
                    <Link to={'/'}>Sign-in</Link>
                    <Link to={'/sign-up-user'}>User Register</Link>
                </div>
                <button className="btn btn-primary">Sign-in</button>
                </div>
            </form>
        </div>
    </div>
</div>

    )
}

export default RegisterRestaurant