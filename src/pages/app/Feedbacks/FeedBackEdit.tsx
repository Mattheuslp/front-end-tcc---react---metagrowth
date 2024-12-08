import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";
import avatar from "../../../assets/avatar.png";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { StarRate } from "../../../components/StarRate";
import { IoIosSave } from "react-icons/io";
import { ButtonIcon } from "../../../components/ButtonIcon";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useGetFeedbackById, useUpdateFeedback } from "../../../lib/react-query/querysAndMuations";
import { useUserContext } from "../../../context/AuthContext";

const feedbackSchema = z.object({
    technicalSkill: z.number().min(1).max(5, "A avaliação deve ser entre 1 e 5."),
    resilience: z.number().min(1).max(5, "A avaliação deve ser entre 1 e 5."),
    sociability: z.number().min(1).max(5, "A avaliação deve ser entre 1 e 5."),
    description: z.string().min(1, "A descrição do feedback é obrigatória."),
});

type FeedbackFormData = z.infer<typeof feedbackSchema>;

export function FeedbackEdit() {
    const { feedbackId } = useParams<{ feedbackId: string }>();
    const { data: feedback, isLoading } = useGetFeedbackById(feedbackId!);
    const { mutateAsync: updateFeedback } = useUpdateFeedback();
    const { user } = useUserContext();

    const isMember = user?.role === "MEMBER";
    const isFeedbackOwner = user?.id === feedback?.userId; 

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<FeedbackFormData>({
        resolver: zodResolver(feedbackSchema),
    });

    useEffect(() => {
        if (feedback) {
            setValue("technicalSkill", feedback.technicalSkill);
            setValue("resilience", feedback.resilience);
            setValue("sociability", feedback.sociability);
            setValue("description", feedback.description);
        }
    }, [feedback, setValue]);

    const handleFeedbackUpdate = async (data: FeedbackFormData) => {
        try {
            if (feedbackId) {
                await updateFeedback({ id: feedbackId, data });
            }
            toast.success("Feedback atualizado com sucesso!");
        } catch (error: any) {
            toast.error(error.message || "Erro ao atualizar o feedback");
        }
    };

    if (isLoading) {
        return <p>Carregando...</p>;
    }

    const isDisabled = isMember || isFeedbackOwner; 

    return (
        <main className="p-5">
            <div className="bg-black p-5 rounded-lg">
                {!isDisabled && (
                    <h1 className="text-primary-yellowNeon text-3xl mb-4">Editar Feedback</h1>
                )}
                <div className="bg-primary-darkGray w-full h-[1px] mb-5"></div>
                <form
                    onSubmit={handleSubmit(handleFeedbackUpdate)}
                    className="flex flex-col gap-5 bg-primary-darkGray p-5 rounded-2xl"
                >
                    <div className="flex gap-5 items-center">
                        <Avatar className="h-20 w-20">
                            <AvatarImage src={feedback?.user?.imageUrl || ""} />
                            <AvatarFallback asChild>
                                <img src={avatar} alt="avatar" className="bg-primary-darkGray" />
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col gap-2 flex-1">
                            <Label>Colaborador</Label>
                            <Input
                                type="text"
                                value={feedback?.user?.name || ""}
                                readOnly
                                className="rounded-full bg-gray-300"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Turma</Label>
                            <Input
                                type="text"
                                value={feedback?.user?.team?.name || ""}
                                readOnly
                                className="rounded-full bg-gray-300"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Função</Label>
                            <Input
                                type="text"
                                value={feedback?.user?.role || ""}
                                readOnly
                                className="rounded-full bg-gray-300"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Matrícula</Label>
                            <Input
                                type="text"
                                value={feedback?.user?.enrollment || ""}
                                readOnly
                                className="rounded-full bg-gray-300"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <Label htmlFor="description">Descrição</Label>
                        <Textarea
                            id="description"
                            {...register("description")}
                            className="rounded-lg bg-white"
                            disabled={isDisabled}
                        />
                        {errors.description && (
                            <span className="text-red-500">{errors.description.message}</span>
                        )}
                    </div>

                    <div className="flex flex-col gap-4">
                        <div>
                            <h1>Competência técnica</h1>
                            <StarRate
                                value={watch("technicalSkill")}
                                onChange={(value) =>
                                    setValue("technicalSkill", value, { shouldValidate: true })
                                }
                                disabled={isDisabled}
                            />
                            {errors.technicalSkill && (
                                <span className="text-red-500">{errors.technicalSkill.message}</span>
                            )}
                        </div>
                        <div>
                            <h1>Resiliência</h1>
                            <StarRate
                                value={watch("resilience")}
                                onChange={(value) =>
                                    setValue("resilience", value, { shouldValidate: true })
                                }
                                disabled={isDisabled}
                            />
                            {errors.resilience && (
                                <span className="text-red-500">{errors.resilience.message}</span>
                            )}
                        </div>
                        <div>
                            <h1>Sociabilidade</h1>
                            <StarRate
                                value={watch("sociability")}
                                onChange={(value) =>
                                    setValue("sociability", value, { shouldValidate: true })
                                }
                                disabled={isDisabled}
                            />
                            {errors.sociability && (
                                <span className="text-red-500">{errors.sociability.message}</span>
                            )}
                        </div>
                    </div>

                    {!isDisabled && (
                        <div className="flex justify-end">
                            <ButtonIcon icon={IoIosSave} text="Salvar" type="submit" />
                        </div>
                    )}
                </form>
            </div>
        </main>
    );
}
