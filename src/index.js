import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { App } from './App'
import { Disk } from './components/disk/Disk'
import { Login } from './components/login/Login'
import { Registration } from './components/registration/Registration'
import { store } from './reducers'

const router = createBrowserRouter([
   {
      path: '/',
      element: <App />,
      children: [
         {
            path: '/',
            element: <Disk />,
         },
         {
            path: 'login',
            element: <Login />,
         },
         {
            path: 'registration',
            element: <Registration />
         },
      ],
   },
])

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
   <Provider store={store}>
      <RouterProvider router={router} />
   </Provider>
)

