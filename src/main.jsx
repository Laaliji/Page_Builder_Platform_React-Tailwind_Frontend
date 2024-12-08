import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';  // Import Provider
import store from './store/store.js';      // Import your Redux store
import Landing from './pages/vistorSide/landing.jsx';
import Editor from './pages/panelSide/editor.jsx';
import UserDashBoardLayout from './pages/userSide/layout';
import Home from './pages/userSide/Home';
import Projects from './pages/userSide/Projects';
import Account from './pages/userSide/Account';
import StepperPage from './pages/stepper/stepperPage.jsx';
import Layout from './pages/vistorSide/layoute.jsx';
import { LoginPage } from './pages/authSide/LoginPage.jsx';
import { SignupPage } from './pages/authSide/SignupPage.jsx';

const router = createBrowserRouter([
  { 
    path : '/', 
    element : <Layout/> , 
    children: [
      { path: '/' , element : <Landing/> },
    ] 
  },
  { path: '/editor' , element: <Editor /> },
  { path: 'stepper', element: <StepperPage /> },
  { path: 'login', element: <LoginPage /> },
  { path: 'signup', element: <SignupPage /> },
  
  { 
    path : '/dash/user', 
    element : <UserDashBoardLayout />, 
    children: [
      { path: 'home' , element : <Home /> },
      { path: 'projects' , element : <Projects /> },
      { path: 'account' , element : <Account /> },
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>  {/* Wrap your RouterProvider with Provider */}
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
