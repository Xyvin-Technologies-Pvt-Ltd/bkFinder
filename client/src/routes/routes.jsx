import { createBrowserRouter } from "react-router-dom";
import ViewExcel from "../pages/ViewExcel.jsx";
import Homepage from "../pages/Homepage.jsx";
import Login from "../pages/Login.jsx";
import CardPage from "../pages/CardPage.jsx";
import TermsPage from "../pages/TermsPage.jsx";
import PrivacyPage from "../pages/PrivacyPage.jsx";
import GroupTicketsPage from "../pages/GroupTicketsPage.jsx";

export const routes = createBrowserRouter([
  { path: "/", element: <Homepage /> },
  { path: "/login", element: <Login /> }, 
  { path: "/managexcel", element: <ViewExcel /> },
  { path: "/card/:id", element: <CardPage /> },
  { path: "/group-tickets/:groupId", element: <GroupTicketsPage /> },
  { path: "/terms", element: <TermsPage /> },
  { path: "/privacy", element: <PrivacyPage /> },

]);