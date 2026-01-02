import { createBrowserRouter } from "react-router-dom";
import ViewExcel from "../pages/ViewExcel.jsx";
import Homepage from "../pages/Homepage.jsx";
import Login from "../pages/Login.jsx";
import CardPage from "../pages/CardPage.jsx";
import TermsAndConditions from "../pages/TermsAndConditions.jsx";
import PrivacyPolicy from "../pages/PrivacyPolicy.jsx";

export const routes = createBrowserRouter([
  { path: "/", element: <Homepage /> },
  { path: "/login", element: <Login /> }, 
  { path: "/managexcel", element: <ViewExcel /> },
  { path: "/card/:id", element: <CardPage /> },
  { path: "/terms-and-conditions", element: <TermsAndConditions/>},
  { path: "/privacy-policy", element: <PrivacyPolicy/> }
]);