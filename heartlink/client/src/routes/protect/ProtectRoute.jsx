import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export const ProtectedRoute = ({ redirectTo = "/login" }) => {
  const { user } = useAuth();
  const location = useLocation();
  const isVerified = user?.data?.isVerified;


  if (!user)
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  if (!isVerified)
    return (
      <Navigate to="/user/info/question" state={{ from: location }} replace />
    );
  
  

  return <Outlet />;
};