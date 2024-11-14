import { api } from "../lib/axios";
import { removeEmptyFields } from "../utils/removeEmptyFields";

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

export async function logout() {
    try {
        const session = await api.delete('/logout')
        localStorage.removeItem('token');
        window.location.replace('/login'); 
        return session
    } catch (error) {
        throw new Error('Ocorreu um erro ao te deslogar, por favor tente novamente')
    }
}

export interface User {
    name: string;
    email: string;
    password: string;
    admission_date?: Date;
    bio?: string;
    certifications?: string;
    education?: string;
    enrollment?: string;
    phone?: string;
    role?: 'MANAGER' | 'MEMBER' 
    teamID?: string;
}

export async function createUser(formData: FormData) {
    try {
      

        const response = await api.post('/users', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
              },
        })

        return response
    } catch (error: any) {
        if(error.response.status === 409) {
            throw new Error("Já existe um usuário com este mesmo e-mail")
        }

        throw new Error("Houve uma falha ao registar o usuário, favor contatar o suporte")
       
    }
}

export async function updateUser(formData: FormData) {
    try {

        const response = await api.patch('/users/update', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
              },
        })

        return response
    } catch (error: any) {
        if(error.response.status === 404) {
            throw new Error("Usuário não encontrado")
        }

        throw new Error("Houve uma falha ao registar o usuário, favor contatar o suporte")
       
    }
}

export async function fetchUser() {
    try {
        const response = await api.get('/fetchusers')

        return response.data
    } catch (error) {
        throw new Error("Não foi possivel buscar os usuários")
    }
}

export async function getUserById(userId: string) {
    try {
        console.log('oi')

        const response = await api.get('/fetchusers', {
            params: {userId}
        })
   
        return response.data
    } catch (error) {
        throw new Error("Usuário não encontrado")
    }
}


export async function deleteUser(userId: string) {
    try {
   
        const response = await api.delete(`/users`, {
            params: { userId } 
        });
   
        return response.data
    } catch (error) {
        throw new Error("Houve um erro ao deletar o usuário")
    }
}


export async function fetchUsersWithoutTeams() {
    try {

        const response = await api.get('/fetchusers', {
            params: {
                noTeam: true
            }
        })
   
        return response.data
    } catch (error) {
        throw new Error("Houve um errro, contate o administrador do sistema")
    }
}

export async function fetchUsersNotManagingTeams() {
    try {

        const response = await api.get('/fetchusers', {
            params: {
                notManagingTeam: true
            }
        })
   
        return response.data
    } catch (error) {
        throw new Error("Houve um errro, contate o administrador do sistema")
    }
}

export async function fetchTeamById(teamId: string) {

    try {

        const response = await api.get('/teams', {
            params: {
                teamId
            }
        })
   
        return response.data
    } catch (error) {
        throw new Error("Houve um erro, contate o administrador do sistema")
    }
}

export interface Team {
    name: string;
    managerId: string;
    userIds: string[];
}

export async function createTeam(team: Team) {
    try {
        const response = await api.post('/teams', team);
        return response;
    } catch (error: any) {
        if (error.response) {
            const { status, data } = error.response;
      
            if (status === 409 && data.message) {
                if (data.message.includes("Usuário já é gestor de outra equipe")) {
                    throw new Error("Usuário já é gestor de outra equipe");
                }
                
                if (data.message.includes("Já existe um time com esse mesmo nome")) {
                    throw new Error("Já existe um time com esse mesmo nome");
                }
            }

            if (status === 400 && data.message === "Validation error") {
                throw new Error("Erro de validação nos dados do time");
            }
        }


        throw new Error("Houve uma falha ao registrar o time, favor contatar o suporte");
    }
}


export async function fetchTeams() {
    try {

        const response = await api.get('/teams')
   
        return response.data
    } catch (error) {
        throw new Error("Houve um errro, contate o administrador do sistema")
    }
}


export interface UpdateTeamData {
    name?: string;
    managerId: string;
    userIds?: string[];
}

export async function updateTeam(teamId: string, teamData: UpdateTeamData) {
    try {
        const response = await api.patch(`/teams/${teamId}`, teamData);

        return response.data;
    } catch (error: any) {
        if (error.response) {
            const { status, data } = error.response;
            
            if (status === 400 && data.message === "Validation error") {
                throw new Error("Erro de validação nos dados do time");
            }

            if (status === 404) {
                throw new Error("Time não encontrado");
            }
        }

        throw new Error("Houve um erro ao atualizar o time, contate o suporte");
    }
}