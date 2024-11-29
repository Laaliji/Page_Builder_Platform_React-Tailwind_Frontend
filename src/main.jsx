import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Layout from './pages/vistorSide/layoute.jsx'
import Landing from './pages/vistorSide/landing.jsx'
import Editor from './pages/panelSide/editor.jsx'
import UserDashBoardLayout from './pages/userSide/layout'
import Home from './pages/userSide/Home'
import Projects from './pages/userSide/Projects'
import Account from './pages/userSide/Account'

const router = createBrowserRouter([
  { 
    path : '/' , 
    element : <Layout/> , 
    children: [
      { path: '/' , element : <Landing/> },
      {},
      {}
    ] 
  },

  { path : '/editor' , element : <Editor /> },
  
  { 
    path : '/dash/user', 
    element : <UserDashBoardLayout />, 
    children: [
      { path : 'home' , element : <Home /> },
      { path : 'projects' , element : <Projects /> },
      { path : 'account' , element : <Account /> },
    ]
  }
]) 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
