import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Landing from './pages/vistorSide/landing.jsx';
import StepperPage from './pages/stepper/stepperPage.jsx';
import Layout from './pages/vistorSide/layoute.jsx'
import Editor from './pages/panelSide/editor.jsx'
import { LoginPage } from './pages/authSide/LoginPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    children: [
      { path: '', element: <Landing/> },
      { path: 'editor', element: <Editor /> },
      { path: 'login', element : <LoginPage/>}
    ]
  },
  { path: '/stepper', element: <StepperPage /> },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);