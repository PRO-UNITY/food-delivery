

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
                        <button className="btn btn-warning float-end my-2">register</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login