import { useEffect, useState } from 'react'
import './Demo.css'
import { BASE_URL, getUserData } from '../../functions/function'
import { Link, useNavigate } from 'react-router-dom'

const Profile = ({ showProfile, count }) => {
    const [user, setUser] = useState(null);
    const [card, setCard] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        getUserData('/user').
        then((res)=>setUser(res))
    },[])

    const logOut = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('role')
        localStorage.removeItem('card')
        navigate('/')
        window.location.reload()
    }

    

    useEffect(()=>{
        const data = JSON.parse(localStorage.getItem('card'))
        setCard(data)
    },[count])

    return (
        <div className={`w-100 bg-white py-4 px-4 profile  ${showProfile && "show"}`}>
            <div className="d-flex justify-content-end align-items-center mb-4">
                {
                    user?.avatar ?
                    <div className='d-flex gap-2 align-items-center'>
                        <Link to={localStorage.getItem('role')=="admins"?'/admin':"/"} className="btn-none ">
                        <img style={{width:"50px", height:"50px", objectFit:"cover", borderRadius:"20%"}} src={`${user?.avatar ? BASE_URL+user.avatar : "https://plus.unsplash.com/premium_photo-1683121366070-5ceb7e007a97?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"}`} alt="" />
                        </Link>
                        <button onClick={logOut} className='btn btn-outline-danger'>Log-out</button>
                    </div> : 
                    <div className="d-flex gap-1">
                        <Link to={'/register'} className='btn-sign-in bg-orange'>Sign-up</Link>
                        <Link to={'/login'} className='btn-sign-in bg-orange'>Sign-in</Link>
                    </div>
                }      
            </div>
            <h4 style={{fontWeight:700}}>Your Balance</h4>
            <div className="card-balance gap-3 mb-3">
                <div className="balance-item bg-light w-50 rounded px-2 py-2">
                    <p className="m-0 p-0" style={{fontSize:"14px", fontWeight:400}}>Balance</p>
                    <p className="m-0 p-0" style={{fontSize:"20px", fontWeight:800}}>$12.00</p>
                </div>
                <div className="w-50 d-flex">
                <div className="w-50 top-up">
                    <button className="btn-none bg-white rounded px-3 py-2 mb-2">
                    <i className="fa-solid fa-arrow-up"></i>
                    </button>
                    <p style={{fontSize:"10px"}} className="text-white mx-1 mb-0">Top Up</p>
                </div>
                <div className="w-50 top-up">
                    <button className="btn-none bg-white rounded px-3 py-2 mb-2">
                    <i className="fa-solid fa-arrow-down"></i>
                    </button>
                    <p style={{fontSize:"10px"}} className="text-white mx-1 mb-0">Transfer</p>
                </div>
                </div>
            </div>
            <h6 className="text-secondary">Your Address</h6>
            <div className="d-flex justify-content-between align-items-center mb-2">
                <p style={{fontWeight:"700"}} className="p-0 m-0"><i className="fa-solid fa-location-dot orange"></i> Elm Street, 23</p>
                <button className="btn-outline">Change</button>
            </div>
            <p className="text-secondary">Lorem ipsum dolor, sit amet dolor consectetur adipisicing elit.</p>
            <div className="d-flex gap-3 mb-3">
                <div className="btn btn-outline-secondary btn-sm">Add Details</div>
                <div className="btn btn-outline-secondary btn-sm">Add Details</div>
            </div>
            <h5 style={{fontWeight:700}} className="mb-3">Order Menu</h5>
            {
                card?.map((item, index)=>
                    <div key={index} className="orders">
                        <div className="card-order d-flex align-items-center justify-content-between mb-3">
                            <div className="d-flex gap-2">
                            <img style={{width:"50px", height:"50px"}} src={`${BASE_URL+item?.food_img}`} alt="" />
                            <div>
                                <p style={{fontWeight:"bold"}} className="m-0 p-0">{item?.name}</p>
                                <p style={{fontSize:"12px",}} className="m-0 p-0 text-secondary">x{item?.count}</p>
                            </div>
                            </div>
                            <p style={{fontWeight:"bold"}} className="mx-2">+<span className="orange">{item?.price}</span>$</p>
                        </div>
                    </div>
                )
            }
            <hr />
            <div className="d-flex justify-content-between align-items-center">
                <p style={{fontSize:"10px"}}>service</p>
                <p style={{fontWeight:"bold"}} className="mx-2">+<span className="orange">$</span>5.59</p>
            </div>
            <div className="d-flex justify-content-between align-items-center">
                <p>Total</p>
                <p style={{fontWeight:"bold"}} className="mx-2"><span className="orange">$</span></p>
            </div>
            <button className="btn btn-warning w-100 text-light">Checkout</button>
        </div>
    )
}

export default Profile