import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Landing from './pages/vistorSide/landing.jsx';
import StepperPage from './pages/stepper/stepperPage.jsx';

const router = createBrowserRouter([
  { path: '/home', element: <Landing /> },
  { path: '/stepper', element: <StepperPage /> },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
