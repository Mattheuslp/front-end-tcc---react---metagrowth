import { useMutation, useQuery } from "@tanstack/react-query";
import { createTeam, createUser, deleteUser, fetchTeamById, fetchTeams, fetchUser, fetchUsersNotManagingTeams, fetchUsersWithoutTeams, getUserById, logout, signIn, Team, updateTeam, UpdateTeamData, updateUser} from "../../api";
import { queryClient } from "./reactQuery";


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

export const useCreateUser = () => {
    return useMutation({
        mutationFn: (user: FormData) => createUser(user),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['fetchUsers']
              })
        }
    })
}

export const useUpdateUser = () => {
    return useMutation({
        mutationFn: (user: FormData) => updateUser(user),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['updateUsers']
              })
        }
    })
}

export const useFetchUsers = () => {
    return  useQuery({
        queryKey: ['fetchUsers'],
        queryFn: () => fetchUser(),
    });
}

export const useGetUserById = (id?: string) => {
    return useQuery({
        queryKey: ['fetchUser', id],
        queryFn: () => {
            if (id) {
                return getUserById(id);
            }
            return Promise.reject('User ID is not defined');
        },
        enabled: !!id, 
    });
}

export const useDeleteUser = () => {
    return useMutation({
        mutationFn: (userId: string) => deleteUser(userId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['fetchUsers']
              })
        }
    })
}

export const useFetchUserWithouTeams = () => {
    return useQuery({
        queryKey: ['fetchUserWithouTeams'],
        queryFn: () => fetchUsersWithoutTeams()
    });
}

export const useFetchUsersNotManagingTeams = () => {
    return useQuery({
        queryKey: ['fetchUserNotManagingTeams'],
        queryFn: () => fetchUsersNotManagingTeams()
    });
}



export const useCreateTeam = () => {
    return useMutation({
        mutationFn: (team: Team) => createTeam(team),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['fetchTeams']
              })
        }
    })
}

export const useFetchTeams = () => {
    return useQuery({
        queryKey: ['fetchTeams'],
        queryFn: () => fetchTeams()
    });
}

export const useFetchTeamById = (teamId?: string) => {
    return useQuery({
        queryKey: ['fetchTeamById', teamId],
        queryFn: () => {
            if (teamId) {
                return fetchTeamById(teamId);
            }
            return Promise.reject('User ID is not defined');
        },
        enabled: !!teamId
    });
}

export const useUpdateTeam = () => {
    return useMutation({
        mutationFn: ({teamId, teamData}: {teamId: string, teamData: UpdateTeamData}) => updateTeam(teamId, teamData),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['fetchTeams']
              })
        }
    })
}