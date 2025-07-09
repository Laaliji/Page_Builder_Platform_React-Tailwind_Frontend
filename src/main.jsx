import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux"; 
import store from "./store/store.js"; 
import Landing from "./pages/vistorSide/landing.jsx";
import Editor from "./pages/panelSide/editor.jsx";
import UserDashBoardLayout from "./pages/userSide/layout";
import Home from "./pages/userSide/Home";
import Projects from "./pages/userSide/Projects";
import Account from "./pages/userSide/Account";
import StepperPage from "./pages/stepper/stepperPage.jsx";
import Layout from "./pages/vistorSide/layoute.jsx";
import { LoginPage } from "./pages/authSide/LoginPage.jsx";
import { SignupPage } from "./pages/authSide/SignupPage.jsx";
import { Toaster } from "@/components/ui/toaster";
import Share from "./pages/vistorSide/share";
import { ToastProvider } from "@/hooks/use-toast.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [{ path: "/", element: <Landing /> }],
  },
  { path: "/share/:id", element: <Share /> },
  { 
    path: "/project/:id", 
    element: (
      <ProtectedRoute>
        <Editor />
      </ProtectedRoute>
    ) 
  },
  { 
    path: "stepper", 
    element: (
      <ProtectedRoute>
        <StepperPage />
      </ProtectedRoute>
    ) 
  },
  { path: "login", element: <LoginPage /> },
  { path: "signup", element: <SignupPage /> },

  {
    path: "/dash/user",
    element: (
      <ProtectedRoute>
        <UserDashBoardLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "", element: <Navigate to="home" replace /> }, // Default redirect
      { path: "home", element: <Home /> },
      { path: "projects", element: <Projects /> },
      { path: "account", element: <Account /> },
    ],
  },
  { path: "/userSide/projects", element: <Navigate to="/dash/user/projects" replace /> },
  // Add a catch-all redirect for authenticated users
  { path: "*", element: <Navigate to="/" replace /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ToastProvider>
        <RouterProvider router={router} />
        <Toaster />
      </ToastProvider>
    </Provider>
  </StrictMode>
);
