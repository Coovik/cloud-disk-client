import axios from 'axios'
import { setUser } from '../reducers/userReducer'

const instance = axios.create({
   baseURL: 'http://localhost:4000/api/auth/',
})

export const registration = async (email, password) => {
   try {
      const res = await instance.post(`registration`, {
         email,
         password
      })
      alert(res.data.message)
   } catch (e) {
      alert(e)
   }
}
export const login = (email, password) => {
   return async dispatch => {
      try {
         const res = await instance.post(`login`,
            {
               email,
               password
            })
         dispatch(setUser(res.data.user))
         localStorage.setItem('token', res.data.token)
      } catch (e) {
         alert(e)
      }
   }
}
export const auth = () => {
   return async dispatch => {
      try {
         const res = await instance.get(`auth`,
            { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } }
         )
         dispatch(setUser(res.data.user))
         localStorage.setItem('token', res.data.token)
      } catch (e) {
         localStorage.removeItem('token')
      }
   }
}