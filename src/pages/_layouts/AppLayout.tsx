
import { Outlet,Navigate } from "react-router-dom";
import { useUserContext } from "../../context/AuthContext";


export function AppLayout() {
    const {isAuthenticated, isLoading} = useUserContext()

    if(isLoading) {
        return
    }

    return (
        <>
            {isAuthenticated ? (
                <Outlet />
            ) : (
                <Navigate to="/login" />
            )}
         
        </>
    )
}