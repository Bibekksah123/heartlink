import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

// Public pages
import Home from "../../pages/Home/Home";
import Login from "../../pages/Login/Login";
import Register from "../../pages/Register/Register";

// Protected pages
import DashLayout from "../../pages/Dashboard/DashLayout";
import Dashboard from "../../components/Feature/dashboard/Dashboard";
import Matches from "../../pages/Matches/Matches";
import Chat from "../../pages/Chat/Chat";
import ProfileInfo from "../../pages/profile/Profile";

// Error pages
import NotFound from "../../pages/notfound/NotFound";

// routes
import { PublicRoute } from "../publicRoute/PublicRoute";
import { ProtectedRoute } from "../protect/ProtectRoute";
import { OnboardingRoute } from "../onBoard/OnboardingRoute ";
import Setting from "../../pages/Setting/Setting";
import SecurityCard from "../../components/Feature/auth/PasswordChange";
import DatingQuestions from "../../components/Feature/users/Question";
import Contact from "../../components/Feature/contact/Contact";
import TermsAndConditions from "../../components/Feature/legal-docs/LegalTerms";


export const Router = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },

      // Public only (redirect if already logged in)
      {
        element: <PublicRoute />,
        children: [
          { path: "login", element: <Login /> },
          { path: "register", element: <Register /> },
        ],
      },

      // Onboarding only (must be logged in but NOT yet verified)
      {
        element: <OnboardingRoute />,
        children: [
          { path: "user/info/question", element: <DatingQuestions /> },
        ],
      },

      // Protected (must be logged in AND verified)
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <DashLayout />,
            children: [
              { path: "dashboard", element: <Dashboard /> },
              { path: "matches", element: <Matches /> },
              { path: "chat", element: <Chat /> },
              { path: "profile", element: <ProfileInfo /> },
              { path: "settings", element: <Setting /> },
              { path: "changepassword", element: <SecurityCard /> },
              { path: "contact", element: <Contact /> },
              { path: "termsandcondition", element: <TermsAndConditions /> },
            ],
          },
        ],
      },


      { path: "*", element: <NotFound /> },
    ],
  },
]);

export const AppRouter = () => <RouterProvider router={Router} />;