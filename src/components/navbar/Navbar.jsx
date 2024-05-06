import navbar_logo from '../../assets/img/navbar_logo.png'
import './Navbar.sass'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../reducers/userReducer'

export const Navbar = props => {
   const isAuth = useSelector(state => state.user.isAuth)
   const dispatch = useDispatch()
   return <>
      <div className="navbar">
         <img src={navbar_logo} alt="navbar_logo" className="navbar_logo"></img>
         <div className="navbar_title"> <Link>My Cloud Disk</Link></div>
         {!isAuth && <div className="navbar_login"><Link to={'login'}>login</Link></div>}
         {!isAuth && <div className="navbar_registration"><Link to={'registration'}>registration</Link></div>}
         {isAuth && <div onClick={() => dispatch(logout())}>logout</div>}
      </div>
   </>
}