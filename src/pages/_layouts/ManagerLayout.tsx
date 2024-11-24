
import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../../context/AuthContext";


interface ProtectedRouteProps {
  allowedRoles: string[];
}

export function ManagerLayout({ allowedRoles }: ProtectedRouteProps) {
  const { user, isLoading } = useUserContext();

  if (isLoading) {
    return 
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
