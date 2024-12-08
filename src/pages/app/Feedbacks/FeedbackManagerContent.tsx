import { Link } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table";
import { ProfileSummary } from "../../../components/ProfileSummary";
import { FaRegEdit } from "react-icons/fa";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../../../components/ui/alert-dialog";
import { Button } from "../../../components/ui/button";
import { MdDeleteForever } from "react-icons/md";
import { useUserContext } from "../../../context/AuthContext";
import { useDeleteFeedback, useGetAllFeedback } from "../../../lib/react-query/querysAndMuations";
import toast from "react-hot-toast";
import { TabsContent } from "../../../components/ui/tabs";

export function FeedbackManagerContent() {
    const { data: feedback = [] } = useGetAllFeedback('manager');
    const { mutateAsync: deleteFeedback } = useDeleteFeedback()
    const { user } = useUserContext();

    const handleFeedbackDelete = async (feedbackId: string) => {
        try {
            await deleteFeedback(feedbackId);
            toast.success("Feedback excluído com sucesso!");
        } catch (error: any) {
            toast.error(error.message || "Erro ao excluir o feedback");
        }
    };

    return (
        <TabsContent value="manager">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="border-b-4 border-primary-darkGray">
                            Colaborador
                        </TableHead>
                        {user.role === "MANAGER" && (
                            <TableHead className="w-[140px] border-b-4 border-primary-darkGray">
                                Gestão
                            </TableHead>
                        )}
                    </TableRow>
                </TableHeader>
                <TableBody className="text-red-50">
                    {feedback.map((fb: any) => (
                        <TableRow key={fb.id}>
                            <TableCell>
                                <Link to={`/edicao/feedback/${fb.id}/${user.id}`}>
                                    <ProfileSummary
                                        imageUrl={fb.user.imageUrl}
                                        name={fb.user.name}
                                        role={fb.user.role || "Colaborador"}
                                    />
                                </Link>
                            </TableCell>
                            {user.role === "MANAGER" && (
                                <TableCell>

                                    <div className="flex gap-2">
                                        <Link to={`/edicao/feedback/${fb.id}/${user.id}`}>
                                            <FaRegEdit
                                                size={25}
                                                className="cursor-pointer "
                                            />
                                        </Link>
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button className="mt-[-4px]">
                                                    <MdDeleteForever size={25} className="cursor-pointer p-0" />
                                                </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        Essa ação não pode ser desfeita. Isso vai remover os dados de forma permanente em nossos servidores.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                    <AlertDialogAction
                                                        onClick={() => handleFeedbackDelete(fb.id)}
                                                    >
                                                        Continuar
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </div>
                                </TableCell>
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TabsContent>

    )
}