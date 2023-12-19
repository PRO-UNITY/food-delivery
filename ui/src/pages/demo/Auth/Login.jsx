import { Link } from "react-router-dom"


const Login = () => {
    return (
        <div className="container w-100 d-flex justify-content-center align-items-center py-5">
            <div className="card shadow">
                <div className="card-header bg-warning">
                    <h3>Login</h3>
                </div>
                <form>
                    <div className="card-body">
                        <form>
                            <label>Username</label>
                            <input type="text" placeholder="andrey1" className="mb-2 form-control" />
                            <label>Password</label>
                            <input type="password" placeholder="********" className="mb-2 form-control" />
                        </form>
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex gap-2 align-items-center">
                            <p className="p-0 m-0">have you not account</p><Link to={'/register'} className="my-2 " type="button">Register</Link>
                            </div>
                            <Link to={'/'} className="btn btn-warning float-end my-2">Login</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login