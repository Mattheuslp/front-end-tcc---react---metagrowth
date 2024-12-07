import { Link } from "react-router-dom";
import { ProfileSummary } from "../../../components/ProfileSummary";
import { Switch } from "../../../components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table";
import { GoalsAchievedCard } from "./GoalsAchievedCard";
import { PendingCard } from "./PendingCard";
import { ResultCard } from "./ResultCard";
import { TotalOfGoalsCard } from "./TotalOfGoalsCard";
import { FaRegEdit } from "react-icons/fa";
import { IoMdOpen } from "react-icons/io";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../../../components/ui/alert-dialog";
import { Button } from "../../../components/ui/button";
import { MdDeleteForever } from "react-icons/md";
import { useUserContext } from "../../../context/AuthContext";
import { useDeleteGoal, useFetchGoals, useUpdateGoal } from "../../../lib/react-query/querysAndMuations";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { TabsContent } from "../../../components/ui/tabs";

export function GoalsManagerContent() {

    const { data: initialGoals = [] } = useFetchGoals('manager');
    const { mutateAsync: deleteGoal } = useDeleteGoal();
    const { mutateAsync: updateGoal } = useUpdateGoal();
    const { user } = useUserContext();
   
    const [goals, setGoals] = useState(initialGoals);
  
    useEffect(() => {
      setGoals(initialGoals);
    }, [initialGoals]);
  
    const handleGoalDelete = async (goalId: string) => {
      try {
        await deleteGoal(goalId);
        setGoals((prevGoals: any) =>
          prevGoals.filter((goal: any) => goal.id !== goalId)
        );
        toast.success("Meta excluída com sucesso!");
      } catch (error: any) {
        toast.error(error.message || "Erro ao excluir a meta");
      }
    };
  
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
        <TabsContent value="manager" className="pt-10">
            <section className="flex gap-5 items-center justify-between">
                <GoalsAchievedCard user={user}/>
                <TotalOfGoalsCard user={user}/>
                <PendingCard user={user}/>
                <ResultCard user={user}/>
            </section>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[250px] border-b-4 border-primary-darkGray">
                            Colaboradorr
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
                                        {user.role === "MANAGER" ? (
                                            <FaRegEdit size={25} className="cursor-pointer" />
                                        ) : (
                                            <IoMdOpen size={25} className="cursor-pointer" />
                                        )}
                                    </Link>
                                    {user.role === "MANAGER" ? (
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button className="mt-[-4px]">
                                                    <MdDeleteForever
                                                        size={25}
                                                        className="cursor-pointer "
                                                    />
                                                </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        Essa ação não pode ser desfeita. Isso vai remover os
                                                        dados de forma permanente em nossos servidores.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                    <AlertDialogAction
                                                        onClick={() => handleGoalDelete(goal.id)}
                                                    >
                                                        Continuar
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    ) : (
                                        <span></span>
                                    )}
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TabsContent>
    )
}