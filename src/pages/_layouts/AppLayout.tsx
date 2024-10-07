
import { Outlet, Navigate } from "react-router-dom";
import { useUserContext } from "../../context/AuthContext";
import { Header } from "../../components/Header";



export function AppLayout() {
    const { isAuthenticated, isLoading } = useUserContext()

    if (isLoading) {
        return
    }

    return (
        <>
            {isAuthenticated ? (
                <>
                    <Header />
                    <Outlet/>
                </>

            ) : (
                <Navigate to="/login" />
            )}

        </>
    )
}