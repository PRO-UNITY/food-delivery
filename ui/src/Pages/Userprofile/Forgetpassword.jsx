import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { postData } from "../../functions"

const Forgetpassword = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')


    const postEmail = (e) => {
        e.preventDefault()
        postData({email:email},'/auth/request_password_rest_email')
        
    }

    


    return(
        <div className="container d-flex justify-content-center align-items-center py-5">
            <div className="card w-50">
                <div className="card-header text-light bg-primary"><h3>Change password</h3></div>
                <div className="card-body">
                    <form onSubmit={postEmail}>
                    <div className="text-start"><label>Type your new email</label></div>
                    <input onChange={(e)=>setEmail(e.target.value)} placeholder="example@gmail.com" className="form-control mb-2" type="email" />
                    <button className="btn btn-primary">send</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Forgetpassword