import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { postData } from "../../Services/Services"

const ForgetPassword = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [alertMessage, setAlertMessage] = useState('')


    const postEmail = async (e) => {
        e.preventDefault()
        const response = await postData({email:email},'/auth/password/reset')
        try {
        if (response.success) {
                 setAlertMessage({ text: 'Password reset email sent successfully. check your email !', type: 'success' });
             } else {
                 setAlertMessage({ text: `Error sending password reset email. ${response.error}.`, type: 'danger' });
             }
         } catch (error) {
             setAlertMessage({ text: 'Error sending password reset email. Please try again.', type: 'danger' });
         }

    }

    return(
        <div className="container flex-column d-flex justify-content-center align-items-center py-5">
            {alertMessage && (
                    <div className={`alert alert-${alertMessage.type} mb-3`} role="alert">
                        {alertMessage.text}
                    </div>
                )}

            <div className="card w-50">
                <div className="card-header bg-orange"><h3>Change password</h3></div>
                <div className="card-body">
                    <form onSubmit={postEmail}>
                    <div className="text-start"><label>Type your new email</label></div>
                    <input required onChange={(e)=>setEmail(e.target.value)} placeholder="example@gmail.com" className="form-control mb-2" type="email" />
                    <button className="btn btn-warning float-end my-2">send</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ForgetPassword