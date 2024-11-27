import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./../../../components/ui/dialog";
import avatar from "../../../assets/avatar.png";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { Switch } from "../../../components/ui/switch";
import { Textarea } from "../../../components/ui/textarea";
import { IoIosSave } from "react-icons/io";
import { ButtonIcon } from "../../../components/ButtonIcon";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useCreateGoal,
  useFetchUsersByManagerId,
} from "../../../lib/react-query/querysAndMuations";
import toast from "react-hot-toast";

const goalSchema = z.object({
  userId: z.string().min(1, "Selecione um colaborador."),
  title: z.string().min(1, "O título da meta é obrigatório."),
  startDate: z.string().min(1, "A data de início é obrigatória."),
  endDate: z.string().min(1, "A data de fim é obrigatória."),
  description: z.string().min(1, "A descrição da meta é obrigatória."),
  isCompleted: z.boolean().optional().default(false),
});

type GoalFormData = z.infer<typeof goalSchema>;

export function GoalCreate() {
  const { mutateAsync: createGoal } = useCreateGoal();
  const { data: usersByManagerId } = useFetchUsersByManagerId();
  console.log("usersByManagerId", usersByManagerId);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<GoalFormData>({
    resolver: zodResolver(goalSchema),
    defaultValues: {
      isCompleted: false,
    },
  });

  const selectedUserId = watch("userId");
  const currentUser = usersByManagerId?.find(
    (user: any) => user.id === selectedUserId
  );

  const handleGoalCreate = async (data: GoalFormData) => {
    try {
      await createGoal(data);
      toast.success("Meta criada com sucesso");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <main>
      <DialogContent className="bg-black">
        <DialogHeader className="flex flex-col gap-2">
          <DialogTitle className="text-primary-yellowNeon">
            Nova Meta
          </DialogTitle>
          <div className="bg-primary-darkGray w-full h-[1px]"></div>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(handleGoalCreate)}
          className="flex flex-col justify-center gap-3 mt-1 p-5 bg-primary-darkGray rounded-2xl"
        >
          <div className="flex justify-end">
            <ButtonIcon icon={IoIosSave} text="Salvar" type="submit" />
          </div>

          <div className="flex gap-5">
            <Avatar className="h-20 w-20">
              <AvatarImage src={currentUser?.imageUrl || ""} />
              <AvatarFallback asChild>
                <img
                  src={avatar}
                  alt="avatar"
                  className="bg-primary-darkGray"
                />
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
              {errors.userId && (
                <span className="text-red-500">{errors.userId.message}</span>
              )}
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

          <div className="flex gap-5">
            <div className="flex flex-col gap-2 flex-1">
              <Label htmlFor="title">Título da meta</Label>
              <Input
                id="title"
                type="text"
                {...register("title")}
                className="rounded-full bg-white"
              />
              {errors.title && (
                <span className="text-red-500">{errors.title.message}</span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="startDate">Data de início</Label>
              <Input
                id="startDate"
                type="date"
                {...register("startDate")}
                className="rounded-full bg-white"
              />
              {errors.startDate && (
                <span className="text-red-500">{errors.startDate.message}</span>
              )}
            </div>
          </div>

          <div className="flex gap-5">
            <div className="flex flex-col gap-2 flex-1">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                {...register("description")}
                className="h-24 rounded-2xl bg-white"
              />
              {errors.description && (
                <span className="text-red-500">
                  {errors.description.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="endDate">Data de fim</Label>
              <Input
                id="endDate"
                type="date"
                {...register("endDate")}
                className="rounded-full bg-white"
              />
              {errors.endDate && (
                <span className="text-red-500">{errors.endDate.message}</span>
              )}
              <div className="flex items-center gap-2 mt-2">
                <Label>Status de conclusão</Label>
                <Switch
                  checked={watch("isCompleted")}
                  onCheckedChange={(value) => setValue("isCompleted", value)}
                />
              </div>
            </div>
          </div>
        </form>
      </DialogContent>
    </main>
  );
}
