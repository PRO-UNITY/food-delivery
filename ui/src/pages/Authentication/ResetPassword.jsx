import { useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { newPasswordComplete } from "../../Services/Services"

const ResetPassword = () => {
    const navigate = useNavigate()
    const [password, setPassword] = useState('')
    const {uidb64, token} = useParams()

    const reset = (e) => {
        e.preventDefault()
        const data = {
            uidb64,
            token,
            password
        }
        newPasswordComplete(data).then(()=>navigate('/login'))
    }

    return(
        <div className="container d-flex justify-content-center align-items-center py-5">
            <div className="card w-50">
                <div className="card-header bg-warning"><h3>For new password</h3></div>
                <div className="card-body">
                    <form onSubmit={reset}>
                    <div className="text-start"><label>Type your password</label></div>
                    <input onChange={(e)=> setPassword(e.target.value)} placeholder="password" className="form-control mb-2" type="text" />
                    <button className="btn btn-warning float-end my-2">send</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword