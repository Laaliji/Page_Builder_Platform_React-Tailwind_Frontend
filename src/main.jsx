import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/vistorSide/layoute.jsx";
import LayoutAdmin from "./pages/admin/layoute.jsx";
import Landing from "./pages/vistorSide/landing.jsx";
import Editor from "./pages/panelSide/editor.jsx";
import Admin from "./pages/admin/dashboard.jsx";

import Profil from "./pages/admin/profil.jsx";
import RecentComments from "./pages/admin/RecentComments.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [{ path: "/", element: <Landing /> }, {}, {}],
  },
  { path: "/editor", element: <Editor /> },
  {
    path: "/",
    element: <LayoutAdmin />,
    children: [{ path: "/admin", element: <Admin /> }, {}, {}],
  },
  {
    path: "/",
    element: <LayoutAdmin />,
    children: [{ path: "/profil", element: <Profil /> }, {}, {}],
  },
  {
    path: "/",
    element: <LayoutAdmin />,
    children: [
      { path: "/RecentComments", element: <RecentComments /> },
      {},
      {},
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
