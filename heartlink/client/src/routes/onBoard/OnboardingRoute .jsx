import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export const OnboardingRoute = () => {
  const { user } = useAuth();
  const location = useLocation();
  const isVerified = user?.data?.isVerified;

  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
  if (isVerified) return <Navigate to="/dashboard" replace />;

  return <Outlet />;
};
