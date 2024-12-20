import { Link } from "react-router-dom";
import { ProfileSummary } from "../../../components/ProfileSummary";
import { Switch } from "../../../components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table";
import { GoalsAchievedCard } from "./GoalsAchievedCard";
import { PendingCard } from "./PendingCard";
import { ResultCard } from "./ResultCard";
import { TotalOfGoalsCard } from "./TotalOfGoalsCard";
import { IoMdOpen } from "react-icons/io";
import { useUserContext } from "../../../context/AuthContext";
import { useFetchGoals, useUpdateGoal } from "../../../lib/react-query/querysAndMuations";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { TabsContent } from "../../../components/ui/tabs";

export function GoalsMemberContent() {

    const { data: initialGoals = [] } = useFetchGoals('member');
    const { mutateAsync: updateGoal } = useUpdateGoal();
    const { user } = useUserContext();

    const [goals, setGoals] = useState(initialGoals);

    useEffect(() => {
        setGoals(initialGoals);
    }, [initialGoals]);


    const handleGoalCompletionToggle = async (
        goalId: string,
        isCompleted: boolean
    ) => {
        setGoals((prevGoals: any) =>
            prevGoals.map((goal: any) =>
                goal.id === goalId ? { ...goal, isCompleted } : goal
            )
        );

        try {
            await updateGoal({ goalId, data: { isCompleted } });
            toast.success(
                `Meta atualizada para ${isCompleted ? "concluída" : "não concluída"}`
            );
        } catch (error: any) {
            setGoals((prevGoals: any) =>
                prevGoals.map((goal: any) =>
                    goal.id === goalId ? { ...goal, isCompleted: !isCompleted } : goal
                )
            );
            toast.error(error.message || "Erro ao atualizar a meta");
        }
    };

    return (
        <TabsContent value="member" className="pt-10" >
            <section className="flex gap-5 items-center justify-between">
                <GoalsAchievedCard />
                <TotalOfGoalsCard />
                <PendingCard />
                <ResultCard />
            </section>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[250px] border-b-4 border-primary-darkGray">
                            Colaborador
                        </TableHead>
                        <TableHead className="w-[300px] border-b-4 border-primary-darkGray">
                            Título
                        </TableHead>
                        <TableHead className="w-[140px] border-b-4 border-primary-darkGray">
                            Data de início
                        </TableHead>
                        <TableHead className="w-[140px] border-b-4 border-primary-darkGray">
                            Data de fim
                        </TableHead>
                        <TableHead className="w-[140px] border-b-4 border-primary-darkGray">
                            Conclusão
                        </TableHead>
                        {user.role === "MANAGER" ? (
                            <TableHead className="w-[140px] border-b-4 border-primary-darkGray"></TableHead>
                        ) : (
                            <TableHead className="w-[140px] border-b-4 border-primary-darkGray"></TableHead>
                        )}
                    </TableRow>
                </TableHeader>
                <TableBody className="text-red-50">
                    {goals.map((goal: any) => (
                        <TableRow key={goal.id}>
                            <TableCell>
                                <ProfileSummary
                                    imageUrl={goal.user.imageUrl}
                                    name={goal.user.name}
                                    role={goal.user.role || "Colaborador"}
                                />
                            </TableCell>
                            <TableCell>{goal.title}</TableCell>
                            <TableCell>
                                {new Date(goal.startDate).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                                {new Date(goal.endDate).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                                <Switch
                                    checked={goal.isCompleted}
                                    onCheckedChange={(value) =>
                                        handleGoalCompletionToggle(goal.id, value)
                                    }
                                />
                            </TableCell>
                            <TableCell>
                                <div className="flex gap-2">
                                    <Link to={`/edicao/goal/${goal.id}/${user.id}`}>
                                        <IoMdOpen size={25} className="cursor-pointer" />
                                    </Link>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TabsContent>
    )
}