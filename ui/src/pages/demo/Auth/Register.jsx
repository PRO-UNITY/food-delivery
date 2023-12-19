import { Link } from "react-router-dom"

const Register = () => {
    return (
        <div className="container w-100 d-flex justify-content-center align-items-center py-5">
            <div className="card shadow">
                <div className="card-header bg-warning">
                    <h3>Register</h3>
                </div>
                <form>
                    <div className="card-body">
                        <div className="w-100 d-flex justify-content-between gap-2 mb-3">
                            <div className="w-50">
                            <label htmlFor="">Firstname</label>
                            <input placeholder="Andrey" className="w-100 form-control" type="text" />
                            </div>
                            <div className="w-50">
                            <label htmlFor="">Lastname</label>
                            <input placeholder="Molodsov" className="w-100 form-control" type="text" />
                            </div>
                        </div>
                        <div className="w-100 d-flex justify-content-between gap-2 mb-3">
                            <div className="w-50">
                            <label htmlFor="">Email</label>
                            <input placeholder="example@gmail.com" className="w-100 form-control" type="email" />
                            </div>
                            <div className="w-50">
                            <label htmlFor="">Username</label>
                            <input placeholder="Andrey1" className="w-100 form-control" type="text" />
                            </div>
                        </div>
                        <div className="w-100 d-flex justify-content-between gap-2 ">
                            <div className="w-50">
                            <label htmlFor="">Password</label>
                            <input placeholder="********" className="w-100 form-control" type="text" />
                            </div>
                            <div className="w-50">
                            <label htmlFor="">Confirm_password</label>
                            <input placeholder="********" className="w-100 form-control" type="text" />
                            </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex gap-2 align-items-center">
                            <p className="p-0 m-0">have you an account</p><Link to={'/login'} className="my-2 " type="button">Login</Link>
                            </div>
                            <button className="btn btn-warning float-end my-2">Register</button>
                        </div>                    
                        </div>
                </form>
            </div>
        </div>
    )
}

export default Register