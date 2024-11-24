import { ProfileSummary } from "../../../components/ProfileSummary";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table";
import { PendingCard } from "./PendingCard";
import { GoalsAchievedCard } from "./GoalsAchievedCard";
import { TotalOfGoalsCard } from "./TotalOfGoalsCard";
import { ResultCard } from "./ResultCard";
import { GoGoal } from "react-icons/go";
import { MdDeleteForever } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { Switch } from "./../../../components/ui/switch";
import { Dialog, DialogTrigger } from "./../../../components/ui/dialog";
import { GoalCreate } from "./GoalCreate";
import { ButtonIcon } from "../../../components/ButtonIcon";
import { useDeleteGoal, useFetchGoals, useUpdateGoal } from "../../../lib/react-query/querysAndMuations";
import { Link } from "react-router-dom";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../../../components/ui/alert-dialog";
import { Button } from "../../../components/ui/button";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";

export function Goals() {
    const { data: initialGoals = [] } = useFetchGoals();
    const { mutateAsync: deleteGoal } = useDeleteGoal();
    const { mutateAsync: updateGoal } = useUpdateGoal();


    const [goals, setGoals] = useState(initialGoals);


    useEffect(() => {
        setGoals(initialGoals);
    }, [initialGoals]);

    const handleGoalDelete = async (goalId: string) => {
        try {
            await deleteGoal(goalId);
            setGoals((prevGoals: any) => prevGoals.filter((goal: any) => goal.id !== goalId));
            toast.success("Meta excluída com sucesso!");
        } catch (error: any) {
            toast.error(error.message || "Erro ao excluir a meta");
        }
    };

    const handleGoalCompletionToggle = async (goalId: string, isCompleted: boolean) => {

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
        <div className="flex flex-col gap-20 px-10">

            <div className="flex flex-col gap-3 pt-10">
                <div className="flex justify-between">
                    <h1 className="text-primary-yellowNeon font-bold text-3xl">
                        METAS
                    </h1>
                    <div className="flex justify-end">
                        <Dialog>
                            <DialogTrigger>
                                <ButtonIcon icon={GoGoal} text="Nova meta" />
                            </DialogTrigger>
                            <GoalCreate />
                        </Dialog>
                    </div>

                </div>
                <div className="bg-primary-darkGray w-full h-1"></div>
            </div>


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
                        <TableHead className="w-[140px] border-b-4 border-primary-darkGray">
                            Gestão
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="text-red-50">
                    {goals.map((goal: any) => (
                        <TableRow key={goal.id}>
                            <TableCell>
                                <ProfileSummary
                                    imageUrl={goal.user.imageUrl}
                                    name={goal.user.name}
                                    position={goal.user.role || "Colaborador"}
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
                                    <Link to={`/edicao/goal/${goal.id}`}>
                                        <FaRegEdit
                                            size={25}
                                            className="cursor-pointer"
                                        />
                                    </Link>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button>
                                                <MdDeleteForever
                                                    size={25}
                                                    className="cursor-pointer"
                                                />
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>
                                                    Você tem certeza?
                                                </AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Essa ação não pode ser
                                                    desfeita. Isso vai remover os
                                                    dados de forma permanente em
                                                    nossos servidores.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>
                                                    Cancelar
                                                </AlertDialogCancel>
                                                <AlertDialogAction
                                                    onClick={() =>
                                                        handleGoalDelete(goal.id)
                                                    }
                                                >
                                                    Continuar
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
