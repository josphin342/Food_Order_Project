import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../layout/Loader";

const ProtectedRoute = ({ children, roles }) => {
  const { isAuthenticated, authChecked, user } = useSelector((state) => state.user);
  const location = useLocation();

  if (!authChecked) return <Loader />;
  if (!isAuthenticated) return <Navigate to="/users/login" replace state={{ from: location.pathname }} />;
  if (roles && !roles.includes(user?.role)) return <Navigate to="/" replace />;
  return children;
};

export default ProtectedRoute;
