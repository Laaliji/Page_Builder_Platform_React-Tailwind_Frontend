import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Landing from './pages/vistorSide/landing.jsx';
import StepperPage from './pages/stepper/stepperPage.jsx';

const router = createBrowserRouter([
<<<<<<< HEAD
  { path: '/home', element: <Landing /> },
  { path: '/stepper', element: <StepperPage /> },
]);
=======
  { 
    path : '/' , 
    element : <Layout/> , 
    children: [
      { path: '/' , element : <Landing/> },
      {},
      {}
    ] 
  },
  {

  }
])
>>>>>>> 7005623a57a6de2ce381711ad2788fdace2a42d1

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
