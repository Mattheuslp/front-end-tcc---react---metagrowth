import { useMutation } from "@tanstack/react-query";
import { signIn } from "../../api";


export const useSignIn = () => {
    return useMutation({
        mutationFn: ({ email, password }: { email: string; password: string }) => signIn({ email, password })
    })
}