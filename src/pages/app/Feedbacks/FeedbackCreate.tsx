import { ButtonIcon } from "../../../components/ButtonIcon";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";
import { DialogContent, DialogHeader, DialogTitle } from "../../../components/ui/dialog";
import { IoIosSave } from "react-icons/io";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import avatar from "../../../assets/avatar.png";
import { Textarea } from "../../../components/ui/textarea";
import { StarRate } from "../../../components/StarRate";
import { useCreateFeedback, useFetchUsersByManagerId } from "../../../lib/react-query/querysAndMuations";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

const feedbackSchema = z.object({
    userId: z.string().min(1, "Selecione um colaborador."),
    technicalSkill: z.number().min(1).max(5, "A avaliação deve ser entre 1 e 5."),
    resilience: z.number().min(1).max(5, "A avaliação deve ser entre 1 e 5."),
    sociability: z.number().min(1).max(5, "A avaliação deve ser entre 1 e 5."),
    description: z.string().min(1, "A descrição do feedback é obrigatória."),
});

type FeedbackFormData = z.infer<typeof feedbackSchema>;

export function FeedbackCreate() {
    const { mutateAsync: createFeedback } = useCreateFeedback();
    const { data: usersByManagerId } = useFetchUsersByManagerId();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        watch,
    } = useForm<FeedbackFormData>({
        resolver: zodResolver(feedbackSchema),
    });

    const selectedUserId = watch("userId");
    const currentUser = usersByManagerId?.find((user: any) => user.id === selectedUserId);

    const handleFeedbackCreate = async (data: FeedbackFormData) => {
        try {
            console.log("Form data:", data)
            await createFeedback(data);
            toast.success("Feedback criado com sucesso!");
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    return (
        <DialogContent className="bg-black">
            <DialogHeader className="flex flex-col gap-2">
                <DialogTitle className="text-primary-yellowNeon">Novo Feedback</DialogTitle>
                <div className="bg-primary-darkGray w-full h-[1px]"></div>
            </DialogHeader>
            <form
                onSubmit={handleSubmit(handleFeedbackCreate)}
                className="flex flex-col justify-center gap-3 mt-1 p-5 bg-primary-darkGray rounded-2xl"
            >
                <div className="flex justify-end">
                    <ButtonIcon icon={IoIosSave} text="Salvar" type="submit" />
                </div>

                <div className="flex gap-5">
                    <Avatar className="h-20 w-20">
                        <AvatarImage src={currentUser?.imageUrl || ""} />
                        <AvatarFallback asChild>
                            <img src={avatar} alt="avatar" className="bg-primary-darkGray" />
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-2 flex-1">
                        <Label htmlFor="userId">Colaborador</Label>
                        <select
                            id="userId"
                            {...register("userId")}
                            className="rounded-full bg-white h-9"
                            defaultValue=""
                        >
                            <option value="" disabled>
                                Selecione um colaborador
                            </option>
                            {usersByManagerId?.map((user: any) => (
                                <option key={user.id} value={user.id}>
                                    {user.name}
                                </option>
                            ))}
                        </select>
                        {errors.userId && <span className="text-red-500">{errors.userId.message}</span>}
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="class">Turma</Label>
                        <Input
                            id="class"
                            type="text"
                            value={currentUser?.team?.name || ""}
                            readOnly
                            className="rounded-full bg-white"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="role">Função</Label>
                        <Input
                            id="role"
                            type="text"
                            value={currentUser?.role || ""}
                            readOnly
                            className="rounded-full bg-white"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="registration">Matrícula</Label>
                        <Input
                            id="registration"
                            type="text"
                            value={currentUser?.enrollment || ""}
                            readOnly
                            className="rounded-full bg-white"
                        />
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="flex-1">
                        <Label htmlFor="description">Descreva o feedback</Label>
                        <Textarea
                            id="description"
                            {...register("description")}
                            className="h-60 rounded-2xl bg-white"
                        />
                        {errors.description && (
                            <span className="text-red-500">{errors.description.message}</span>
                        )}
                    </div>
                    <div className="flex flex-col gap-3 font-semibold">
                        <div>
                            <h1>Competência técnica</h1>
                            <StarRate
                                value={watch("technicalSkill")}
                                onChange={(value) => setValue("technicalSkill", value, { shouldValidate: true })}
                            />
                            {errors.technicalSkill && (
                                <span className="text-red-500">{errors.technicalSkill.message}</span>
                            )}
                        </div>
                        <div>
                            <h1>Resiliência</h1>
                            <StarRate
                                value={watch("resilience")}
                                onChange={(value) => setValue("resilience", value, { shouldValidate: true })}
                            />
                            {errors.resilience && (
                                <span className="text-red-500">{errors.resilience.message}</span>
                            )}
                        </div>
                        <div>
                            <h1>Sociabilidade</h1>
                            <StarRate
                                value={watch("sociability")}
                                onChange={(value) => setValue("sociability", value, { shouldValidate: true })}
                            />
                            {errors.sociability && (
                                <span className="text-red-500">{errors.sociability.message}</span>
                            )}
                        </div>
                    </div>
                </div>
            </form>
        </DialogContent>
    );
}
