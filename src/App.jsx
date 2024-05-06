import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet } from "react-router-dom"
import './App.sass'
import { auth } from './actions/user'
import { Navbar } from "./components/navbar/Navbar"

export const App = props => {
   const dispatch = useDispatch()
   useEffect(() => {
      dispatch(auth())
   })

   return <div className="app">
      <div className='header'>
         <Navbar />
      </div>
      <div className="content">
         <Outlet />
      </div>
      <div className="footer">footer</div>
   </div>
}