import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { getDataWithToken, postDataWithToken } from "../functions"

const Navbar = () => {
    const [user, setUser] = useState()
    const navigate = useNavigate()

    useEffect(()=>{
        getDataWithToken('/auth/user_profiles').
        then((res)=>
         {setUser(res)
        })
    },[])

    const signOut = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('role')
        localStorage.removeItem('card')
        navigate('/')
        window.location.reload()
    }

    return (
        <div className="w-100 bg-light p-3 d-flex justify-content-between align-items-center">
            <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
            <h1>Food-Delivery</h1>
          </a>
          <div class="dropdown">
            <a href="#" class="d-flex align-items-center link-dark text-decoration-none dropdown-toggle" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
              <img src={user?.avatar ? `https://api.prounity.uz/food-delivery${user?.avatar}`: "https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"} alt="" width="40" height="40" class="rounded-circle me-2" />
              <strong>{user?.first_name}</strong>
            </a>
            <ul class="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
              <Link style={{textDecoration:"none"}} to={'/user-profile'}><li><a class="dropdown-item" href="#">Profile</a></li></Link>
              <Link style={{textDecoration:"none"}} to={'/change-password'}><li><a class="dropdown-item" href="#">Change password</a></li></Link>
              <li><hr class="dropdown-divider" /></li>
              <li><button onClick={signOut} style={{border:"none", background:"none"}}>Sign out</button></li>
            </ul>
          </div>
        </div>
    )
}

export default Navbar