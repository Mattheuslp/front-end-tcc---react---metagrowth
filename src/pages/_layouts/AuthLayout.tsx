
import { Outlet, Navigate } from "react-router-dom";
import { useUserContext } from "../../context/AuthContext";


export function AuthLayout() {
    const { isAuthenticated, isLoading } = useUserContext()

    if (isLoading) {
        return
    }

    return (
        <>
            {isAuthenticated ? (
                <Navigate to="/" />
            ) : (
                <Outlet />
            )}
        </>
    )
}