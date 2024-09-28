
import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../lib/axios";


export const INITIAL_USER = {
    id: '',
    name: '',
    email: '',
}

const INITIAL_STATE = {
    user: INITIAL_USER,
    isLoading: false,
    isAuthenticated: false,
    loadUser: async () => false as boolean,
}


const AuthContext = createContext(INITIAL_STATE)

export function AuthProvider({children}: {children: React.ReactNode}) {
    const [user, setUser] = useState(INITIAL_USER)
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
  
    useEffect(() => {
        const token = localStorage.getItem('token')
        if(token) {
            loadUser()
        } else {
           setIsLoading(false);
        }
    }, [])

    async function loadUser() {
        try {
            setIsLoading(true);

            const token = localStorage.getItem('token')
            if(!token) return false

            const {data} = await api.get('/getUser')
    
            setUser(data.user);
            setIsAuthenticated(true);
            return true
         
        } catch (error) {
            setUser(INITIAL_USER)
            setIsAuthenticated(false);
            return false
        } finally {
            setIsLoading(false);
        }
    }   

    const value = {
        user,
        loadUser,
        isLoading,
        isAuthenticated
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export const useUserContext = () => useContext(AuthContext)

