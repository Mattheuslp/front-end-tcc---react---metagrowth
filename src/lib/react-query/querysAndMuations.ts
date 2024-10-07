import { useMutation } from "@tanstack/react-query";
import { logout, signIn } from "../../api";


export const useSignIn = () => {
    return useMutation({
        mutationFn: ({ email, password }: { email: string; password: string }) => signIn({ email, password })
    })
}

export const useLogout = () => {
    return useMutation({
        mutationFn: () => logout()
    })
}