import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Landing from './pages/vistorSide/landing.jsx';
import StepperPage from './pages/stepper/stepperPage.jsx';
import Layout from './pages/vistorSide/layoute.jsx';
import {LoginPage} from './pages/authSide/LoginPage.jsx';
import {SignupPage} from './pages/authSide/SignupPage.jsx';

const router = createBrowserRouter([

  { path: '/', element: <Landing /> },
  { path: '/stepper', element: <StepperPage /> },
  { path: '/login', element : <LoginPage/>},
  { path: '/signup', element : <SignupPage/>},
]);

  { 
    path : '/' ;
    element : <Layout/> ;
    children: [
      { path: '/' , element : <Landing/> },

      
    ] 
  }


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
