import { useParams, Outlet, Navigate } from "react-router-dom";
import { useUserContext } from "../../context/AuthContext";

export function MemberLayout() {
    const { userId } = useParams<{ userId: string }>();
    const { user } = useUserContext();

    
    if (!user) {
        return <Navigate to="/auth/login" replace />;
    }

    
    if (user.role === "MEMBER" && user.id !== userId) {
        return <Navigate to="/" replace />;
    }

    
    return <Outlet />;
}
