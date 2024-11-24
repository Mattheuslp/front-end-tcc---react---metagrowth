import { ProfileSummary } from "../../../components/ProfileSummary";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table";
import { ButtonIcon } from "../../../components/ButtonIcon";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { Dialog, DialogTrigger } from "../../../components/ui/dialog";
import { FeedbackCreate } from "./FeedbackCreate";
import { useDeleteFeedback, useGetAllFeedback } from "../../../lib/react-query/querysAndMuations";
import { useUserContext } from "../../../context/AuthContext";
import { MdDeleteForever } from "react-icons/md";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction } from "../../../components/ui/alert-dialog";
import { Button } from "../../../components/ui/button";
import toast from "react-hot-toast";
import logoFeedback from '../../../assets/logoFeedback.png'
import { Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";

export function Feedbacks() {
    const { data: feedback = [] } = useGetAllFeedback();
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
        <main className="flex gap-5 px-20 pt-10" style={{ height: "calc(100vh - 6rem)" }}>
            <section className="flex flex-col items-center w-56">
                <div className="flex items-center justify-end h-16 w-16">
                    <img src={logoFeedback} alt="" />
                    <h1 className="text-primary-yellowNeon font-bold">Feedbacks</h1>
                </div>
                <div className="bg-primary-yellowNeon w-full h-1"></div>
            </section>
            <div className="bg-primary-yellowNeon h-auto w-1"></div>
            <section className="w-full mt-8">
                <div className="flex justify-between">
                    <h1 className="text-primary-yellowNeon font-bold text-3xl">Feedbacks</h1>
                    <Dialog>
                        <DialogTrigger>
                            <ButtonIcon icon={IoChatboxEllipsesOutline} text="Novo feedback" />
                        </DialogTrigger>
                        <FeedbackCreate />
                    </Dialog>
                </div>
                <div className="bg-primary-yellowNeon w-full h-1 mt-5"></div>

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
                                    <Link to={`/edicao/feedback/${fb.id}`}>
                                        <ProfileSummary
                                            imageUrl={fb.user.imageUrl}
                                            name={fb.user.name}
                                            position={fb.user.role || "Colaborador"}
                                        />
                                    </Link>
                                </TableCell>
                                {user.role === "MANAGER" && (
                                    <TableCell>

                                        <div className="flex gap-2">
                                            <Link to={`/edicao/feedback/${fb.id}`}>
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
            </section>
        </main>
    );
}
