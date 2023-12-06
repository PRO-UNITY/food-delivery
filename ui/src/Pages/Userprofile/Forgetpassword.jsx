import { useRef } from "react"
import { useNavigate } from "react-router-dom"

const Forgetpassword = () => {
    const navigate = useNavigate()
    const emailRef = useRef()

    


    return(
        <div className="container d-flex justify-content-center align-items-center py-5">
            <div className="card w-50">
                <div className="card-header text-light bg-primary"><h3>Change password</h3></div>
                <div className="card-body">
                    <form>
                    <input placeholder="example@gmail.com" className="form-control mb-2" type="email" />
                    <button className="btn btn-primary">send</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Forgetpassword