import { createBrowserRouter } from 'react-router-dom'
import { AppLayout } from './pages/_layouts/AppLayout'
import { AuthLayout } from './pages/_layouts/AuthLayout'
import { Signin } from './pages/auth/Sign-in'
import { Home } from './pages/app/home/Home'


export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: '/', element: <Home /> },
    ],
  },

  {
    path: '/',
    element: <AuthLayout />,
    children: [
      { path: '/login', element: <Signin /> },
    ],
  },

])
