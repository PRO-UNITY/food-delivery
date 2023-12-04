
const RegisterAdmin = () => {
    return(
        <div className="container d-flex justify-content-center align-items-center py-5">
            <div className="card w-50">
                <div className="card-header bg-primary text-light">
                    <h1>Register</h1>
                </div>
                <div className="card-body">
                    <form>
                        <label className="mb-2 " htmlFor="">First-name</label>
                        <input className="form-control mb-2" type="text" />
                        <label className="mb-2" htmlFor="">First-name</label>
                        <input className="form-control mb-2" type="text" />
                        <label className="mb-2" htmlFor="">First-name</label>
                        <input className="form-control mb-2" type="text" />
                        <label className="mb-2" htmlFor="">First-name</label>
                        <input className="form-control mb-2" type="text" />
                        <button className="btn btn-primary">Register</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RegisterAdmin