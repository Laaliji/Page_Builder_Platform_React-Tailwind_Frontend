import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Layout from './pages/vistorSide/layoute.jsx'
import Landing from './pages/vistorSide/landing.jsx'

const router = createBrowserRouter([
  { 
    path : '/' , 
    element : <Layout/> , 
    children: [
      { path: '/home' , element : <Landing/> },
      {},
      {}
    ] 
  },
  {

  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
