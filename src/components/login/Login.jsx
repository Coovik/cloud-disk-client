import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../actions/user'
import { Input } from '../../utils/input/Input'
import './Login.sass'
import { useNavigate } from 'react-router-dom'


export const Login = props => {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const isAuth = useSelector(store => store.user.isAuth)
   useEffect(() => {
      if (isAuth) {
         navigate('/')
      }
   }, [isAuth])

   return <div className='login'>
      <div className='login_header'>Войти</div>
      <Input type='text' value={email} setValue={setEmail} placeholder='Email' />
      <Input type='password' value={password} setValue={setPassword} placeholder='Password' />
      <button className="login_btn" onClick={() => dispatch(login(email, password))} >Войти</button>
   </div>
}