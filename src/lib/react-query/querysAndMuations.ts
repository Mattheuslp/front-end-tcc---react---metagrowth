import { useMutation, useQuery } from "@tanstack/react-query";
import { CreateFeedback, createFeedback, CreateGoal, createGoal, createTeam, createUser, deleteFeedback, deleteGoal, deleteTeam, deleteUser, fetchGoals, fetchTeamById, fetchTeams, fetchUser, fetchUsersByManagerId, fetchUsersNotManagingTeams, fetchUsersWithoutTeams, getAllFeedbacks, getFeedbackById, getGoalById, getGoalsAchievedMetrics, getGoalsPendingMetrics, getGoalsPercentageMetrics, getGoalsReport, getGoalsTotalMetrics, getUserById, logout, signIn, Team, updateFeedback, updateGoal, updateTeam, UpdateTeamData, updateUser } from "../../api";
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
        mutationFn: ({ userId, user }: { userId: string, user: FormData }) => updateUser(userId, user),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['fetchUsers']
            })
        }
    })
}

export const useFetchUsers = () => {
    return useQuery({
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
            return Promise.reject('Id do usuário não está definido');
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

export const useFetchUsersByManagerId = () => {
    return useQuery({
        queryKey: ['fetchUserByManagerId'],
        queryFn: () => fetchUsersByManagerId()
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
            return Promise.reject('Id do usuário não está definido');
        },
        enabled: !!teamId
    });
}

export const useUpdateTeam = () => {
    return useMutation({
        mutationFn: ({ teamId, teamData }: { teamId: string, teamData: UpdateTeamData }) => updateTeam(teamId, teamData),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['fetchTeams']
            })
        }
    })
}

export const useDeleteTeam = () => {
    return useMutation({
        mutationFn: (teamId: string) => deleteTeam(teamId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['fetchTeams']
            })
        }
    })
}


export const useCreateGoal = () => {
    return useMutation({
        mutationFn: (data: CreateGoal) => createGoal(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['fetchGoals'] });
            queryClient.invalidateQueries({ queryKey: ['GetGoalsAchievedMetric'] });
            queryClient.invalidateQueries({ queryKey: ['GetGoalsTotalMetric'] });
            queryClient.invalidateQueries({ queryKey: ['GetGoalsPendingMetric'] });
        },
    });
};

export const useFetchGoals = () => {
    return useQuery({
        queryKey: ['fetchGoals'],
        queryFn: () => fetchGoals(),
    });
}

export const useGetGoalById = (goalId: string) => {
    return useQuery({
        queryKey: ['getGoalById', goalId],
        queryFn: () => {
            if (goalId) {
                return getGoalById(goalId);
            }
            return Promise.reject('Id da meta não está definido');
        },
        enabled: !!goalId,
    });
}

export const useUpdateGoal = () => {
    return useMutation({
        mutationFn: ({ goalId, data }: { goalId: string, data: Partial<updateGoal> }) => updateGoal(goalId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['GetGoalsAchievedMetric'] });
            queryClient.invalidateQueries({ queryKey: ['GetGoalsTotalMetric'] });
            queryClient.invalidateQueries({ queryKey: ['GetGoalsPendingMetric'] });
            queryClient.invalidateQueries({ queryKey: ['GetGoalsPercentageMetric'] });
        },
    })
}

export const useDeleteGoal = () => {
    return useMutation({
        mutationFn: (goalId: string) => deleteGoal(goalId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['fetchGoals']
            })
        }
    })
}

export const useGetGoalsAchievedMetrics = () => {
    return useQuery({
        queryKey: ['GetGoalsAchievedMetric'],
        queryFn: () => getGoalsAchievedMetrics(),
    });
}

export const useGetGoalsTotalMetrics = () => {
    return useQuery({
        queryKey: ['GetGoalsTotalMetric'],
        queryFn: () => getGoalsTotalMetrics(),
    });
}

export const useGetGoalsPendingMetrics = () => {
    return useQuery({
        queryKey: ['GetGoalsPendingMetric'],
        queryFn: () => getGoalsPendingMetrics(),
    });
}

export const useGetGoalsPercentageMetrics = () => {
    return useQuery({
        queryKey: ['GetGoalsPercentageMetric'],
        queryFn: () => getGoalsPercentageMetrics(),
    });
}


export const useCreateFeedback = () => {
    return useMutation({
        mutationFn: (data: CreateFeedback) => createFeedback(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['fetchFeedbacks'] });
            queryClient.invalidateQueries({ queryKey: ['getFeedback'] });
        },
    });
};

export const useGetAllFeedback = () => {
    return useQuery({
        queryKey: ['GetAllFeedbacks'],
        queryFn: () => getAllFeedbacks(),
    });
}

export const useGetFeedbackById = (id: string) => {
    return useQuery({
        queryKey: ['getFeedback', id],
        queryFn: () => {
            if (id) {
                return getFeedbackById(id);
            }
            return Promise.reject('Id do feedback não está definido');
        },
        enabled: !!id,
    });
}

export const useDeleteFeedback = () => {
    return useMutation({
        mutationFn: (id: string) => deleteFeedback(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['GetAllFeedbacks']
            })
        }
    })
}

export const useUpdateFeedback = () => {
    return useMutation({
        mutationFn: ({ id, data }: { id: string, data: updateFeedback }) => updateFeedback(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['GetAllFeedbacks'] });
        },
    })
}

export const useGetGoalsReport = () => {
    return useQuery({
        queryKey: ['GetGoalsReport'],
        queryFn: () => getGoalsReport(),
    });
}