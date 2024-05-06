import './Registration.sass'
import { useEffect, useState } from "react"
import { Input } from "../../utils/input/Input"
import { registration } from '../../actions/user'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export const Registration = props => {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const isAuth = useSelector(state => state.user.isAuth)
   const navigate = useNavigate()
   useEffect(() => {
      if (isAuth) {
         navigate('/')
      }
   }, [isAuth])

   return <div className='registration'>
      <div className='registration_header'>Регистрация</div>
      <Input type='text' value={email} setValue={setEmail} placeholder='Email' />
      <Input type='password' value={password} setValue={setPassword} placeholder='Password' />
      <button className="registration_btn" onClick={() => registration(email, password)}>Регистрация</button>
   </div>
}