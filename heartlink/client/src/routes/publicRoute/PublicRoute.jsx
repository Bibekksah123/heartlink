import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export const PublicRoute = ({ redirectTo = "/dashboard" }) => {
  const { user } = useAuth();
  const location = useLocation();
  const isVerified = user?.data?.isVerified;


  if (user && !isVerified)
    return (
      <Navigate to="/user/info/question" state={{ from: location }} replace />
    );
  if (user) return <Navigate to={redirectTo} replace />;

  return <Outlet />;
};