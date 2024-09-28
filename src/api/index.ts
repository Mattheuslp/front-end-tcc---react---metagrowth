import { api } from "../lib/axios";

export async function signIn({ email, password }: { email: string; password: string; }) {
    try {
        const session = await api.post('/sessions', {
            email, password
        })

        return session
    } catch (error) {
        throw new Error('Ocorreu um erro ao realizar o login, por favor tente novamente')
    }
}