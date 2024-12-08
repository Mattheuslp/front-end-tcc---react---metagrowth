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

export async function logout() {
    try {
        const session = await api.delete('/logout')
        localStorage.removeItem('token');
        window.location.replace('/auth/login');
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
        if (error.response.status === 409) {
            throw new Error("Já existe um usuário com este mesmo e-mail")
        }

        throw new Error("Houve uma falha ao registar o usuário, favor contatar o suporte")

    }
}

export async function updateUser(userId:string, formData: FormData) {
    try {

        const response = await api.patch(`/users/${userId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })

        return response
    } catch (error: any) {
        if (error.response.status === 404) {
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
            params: { userId }
        })

        return response.data
    } catch (error) {
        throw new Error("Usuário não encontrado")
    }
}


export async function deleteUser(userId: string) {
    try {
        await api.delete(`/users`, {
            params: { userId },
        });

        return {
            success: true,
            message: "Usuário deletado com sucesso!",
        };
    } catch (error: any) {
        if (error.response) {
            const status = error.response.status;

            if (status === 403) {
                throw new Error("Você não tem permissão para excluir este usuário.");
            }
            if (status === 404) {
                throw new Error("Usuário não encontrado.");
            }
            if (status === 409) {
                throw new Error("O usuário está vinculado a um time e não pode ser excluído.");
            }
        }

        throw new Error("Houve um erro ao deletar o usuário.");
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



export async function deleteTeam(teamId: string) {
    try {
        const response = await api.delete(`/teams/${teamId}`);

        return response.data;
    } catch (error: any) {
        if (error.response) {
            const { status } = error.response;

            if (status === 404) {
                throw new Error("Time não encontrado");
            }
        }

        throw new Error("Houve um erro ao deletar o time, contate o suporte");
    }
}


export interface CreateGoal {
    userId: string;
    title: string;
    startDate: string
    endDate: string
    description: string;
    isCompleted: boolean
}


export async function createGoal(data: CreateGoal) {
    try {
        const response = await api.post('/goals', data);
        return response;

    } catch (error: any) {
        if (error.response) {
            const { status, data } = error.response;

            if (status === 400 && data.message) {
                throw new Error("A data de inicio deve ser anterior à data de fim.");
            }
        }

        throw new Error("Houve uma falha ao criar uma meta, favor contatar o suporte");
    }
}

export async function fetchUsersByManagerId() {
    try {

        const response = await api.get('/fetchusers', {
            params: {
                managerId: true
            }
        })

        return response.data
    } catch (error: any) {

        if (error.response) {
            const { status, data } = error.response;

            if (status === 400 && data.message) {
                throw new Error(data.message);
            }
        }
        throw new Error("Houve um erro, contate o administrador do sistema")
    }
}

export async function fetchGoals(goalType: string) {
    try {

        const response = await api.get('/goals', {
            params: {goalType}
        })

        return response.data
    } catch (error: any) {


        throw new Error("Houve um erro, contate o administrador do sistema")
    }
}

export async function getGoalById(goalId: string) {
    try {

        const response = await api.get(`/goals/${goalId}`)

        return response.data
    } catch (error: any) {

        throw new Error("Houve um erro, contate o administrador do sistema")
    }
}

export interface updateGoal {
    description?: string
    endDate?: string
    startDate?: string
    isCompleted?: boolean
    title?: string
    userId?: string
}

export async function updateGoal(goalId: string, data: Partial<updateGoal>) {
    try {
        const response = await api.patch(`/goals/${goalId}`, data);

        return response.data;
    } catch (error: any) {
        if (error.response) {
            const { status } = error.response;

            if (status === 400 ) {
                throw new Error("A data de inicio deve ser anterior à data de fim.");
            }

        }

        throw new Error("Houve um erro ao atualizar o time, contate o suporte");
    }
}

export async function deleteGoal(goalId: string) {
    try {
        const response = await api.delete(`/goals/${goalId}`);

        return response.data;
    } catch (error: any) {

        throw new Error("Houve um erro ao deletar o time, contate o suporte");
    }
}


export async function getGoalsAchievedMetrics(isManagingTeam: boolean) {
    try {

        const response = await api.get('/goals/metrics',  {
            params: {
                metric: 'achieved',
                metricsByTeam: isManagingTeam,
            }
        })

        return response.data
    } catch (error: any) {

        throw new Error("Houve um erro, contate o administrador do sistema")
    }
}

export async function getGoalsTotalMetrics(isManagingTeam: boolean) {
    try {

        const response = await api.get('/goals/metrics',  {
            params: {
                metric: 'total',
                metricsByTeam: isManagingTeam,
            }
        })

        return response.data
    } catch (error: any) {

        throw new Error("Houve um erro, contate o administrador do sistema")
    }
}

export async function getGoalsPendingMetrics(isManagingTeam: boolean) {
    try {

        const response = await api.get('/goals/metrics',  {
            params: {
                metric: 'pending',
                metricsByTeam: isManagingTeam,
            }
        })

        return response.data
    } catch (error: any) {

        throw new Error("Houve um erro, contate o administrador do sistema")
    }
}



export async function getGoalsPercentageMetrics(isManagingTeam: boolean) {
    try {

        const response = await api.get('/goals/metrics',  {
            params: {
                metric: 'percentage',
                metricsByTeam: isManagingTeam,
            }
        })

        return response.data
    } catch (error: any) {

        throw new Error("Houve um erro, contate o administrador do sistema")
    }
}

export interface CreateFeedback {
    userId: string
    technicalSkill: number;
    resilience: number;
    sociability: number;
    description: string
}

export async function createFeedback(data: CreateFeedback) {
    try {
        const response = await api.post('/feedbacks', data);
        return response;

    } catch (error: any) {
        throw new Error("Houve uma falha ao criar uma meta, favor contatar o suporte");
    }
}

export interface updateFeedback {
    userId?: string
    technicalSkill?: number;
    resilience?: number;
    sociability?: number;
    description?: string
}

export async function updateFeedback(id: string, data: updateFeedback) {
    try {
        const response = await api.patch(`/feedbacks/${id}`, data);
        return response.data;

    } catch (error: any) {
        throw new Error("Houve uma falha ao criar uma meta, favor contatar o suporte");
    }
}

export async function deleteFeedback(id: string) {
    try {
        const response = await api.delete(`/feedbacks/${id}`);

        return response.data;
    } catch (error: any) {

        throw new Error("Houve um erro ao deletar um feedback, contate o suporte");
    }
}

export async function getFeedbackById(id: string) {
    try {

        const response = await api.get(`/feedbacks/${id}`)

        return response.data
    } catch (error: any) {

        throw new Error("Houve um erro, contate o administrador do sistema")
    }
}


export async function getAllFeedbacks(feedbackType: string) {
    try {

        const response = await api.get(`/feedbacks`, {
            params: {feedbackType}
        })

        return response.data
    } catch (error: any) {

        throw new Error("Houve um erro, contate o administrador do sistema")
    }
}

export async function getGoalsReport() {
    try {
        const response = await api.get('/goals/reports')

        return response.data
    } catch (error) {
        throw new Error("Houve um erro, contate o administrador do sistema")
    }
}