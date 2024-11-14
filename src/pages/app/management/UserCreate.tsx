import { ButtonIcon } from "../../../components/ButtonIcon";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";
import { DialogContent, DialogHeader, DialogTitle } from "../../../components/ui/dialog";
import { IoIosSave } from "react-icons/io";
import avatarPlaceholder from '../../../assets/avatar.png';
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { useCreateUser, useFetchTeams } from "../../../lib/react-query/querysAndMuations";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useState } from "react";

const createUserSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  admission_date: z.string().optional().transform((val) => (val ? new Date(val) : undefined)),
  bio: z.string().optional(),
  certifications: z.string().optional(),
  education: z.string().optional(),
  enrollment: z.string().optional(),
  phone: z.string().optional(),
  role: z.enum(["MANAGER", "MEMBER"]),
  teamID: z.string().optional(),
});

type CreateUserFormData = z.infer<typeof createUserSchema>;

export function UserCreate() {
  const { mutateAsync: createUser } = useCreateUser();
  const { data: teams } = useFetchTeams(); // Fetch teams data
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserSchema),
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const imageUrl = URL.createObjectURL(file);
      setPreviewImageUrl(imageUrl);
    }
  };

  async function handleCreateUser(data: CreateUserFormData) {
    try {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          formData.append(key, value as any);
        }
      });

      if (selectedImage) {
        formData.append("file", selectedImage);
      }

      const response = await createUser(formData);

      if (response) {
        toast.success("Usuário criado com sucesso :)");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  return (
    <DialogContent className="bg-black ">
      <DialogHeader className="flex flex-col gap-2">
        <DialogTitle className="text-primary-yellowNeon">Novo Colaborador</DialogTitle>
        <div className="bg-primary-darkGray w-full h-[1px]"></div>
      </DialogHeader>
      <form onSubmit={handleSubmit(handleCreateUser)}>
        <div className="flex justify-end mb-5">
          <ButtonIcon icon={IoIosSave} text="Salvar" type="submit" />
        </div>
        <div className="flex flex-col justify-center gap-3 mt-1 p-5 bg-primary-darkGray rounded-2xl">
          <div className="flex gap-5 ">
            <div className="flex flex-col items-center">
              <label htmlFor="avatar-upload">
                <Avatar className="h-20 w-20 cursor-pointer">
                  <AvatarImage src={previewImageUrl || ""} />
                  <AvatarFallback asChild>
                    <img src={avatarPlaceholder} alt="avatar" className="bg-primary-darkGray" />
                  </AvatarFallback>
                </Avatar>
              </label>
              <input
                type="file"
                accept="image/*"
                id="avatar-upload"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <span className="text-xs text-primary-yellowNeon mt-2">Clique na imagem para alterar</span>
            </div>

            <div className="flex flex-col gap-2 flex-1">
              <Label htmlFor="name">Nome</Label>
              <Input id="name" type="text" {...register("name")} className="rounded-full bg-white" />
              {errors.name && <span className="text-red-500">{errors.name.message}</span>}
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <Label htmlFor="teamID">Equipe</Label>
              <select {...register("teamID")} className="rounded-full bg-white">
                {teams?.map((team: any) => (
                  <option key={team.id} value={team.id}>
                    {team.name}
                  </option>
                ))}
              </select>
              {errors.teamID && <span className="text-red-500">{errors.teamID.message}</span>}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="role">Função</Label>
              <Input id="role" type="text" {...register("role")} className="rounded-full bg-white" />
              {errors.role && <span className="text-red-500">{errors.role.message}</span>}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="admission_date">Admissão</Label>
              <Input
                id="admission_date"
                type="date"
                {...register("admission_date")}
                className="rounded-full bg-white"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col gap-2 flex-1">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="text"
                {...register("email")}
                className="rounded-full bg-white"
              />
              {errors.email && <span className="text-red-500">{errors.email.message}</span>}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                {...register("password")}
                className="rounded-full bg-white"
              />
              {errors.password && <span className="text-red-500">{errors.password.message}</span>}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input
                id="phone"
                type="text"
                {...register("phone")}
                className="rounded-full bg-white"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="enrollment">Matricula</Label>
              <Input
                id="enrollment"
                type="text"
                {...register("enrollment")}
                className="rounded-full bg-white"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="education">Escolaridade</Label>
              <Input
                id="education"
                type="text"
                {...register("education")}
                className="rounded-full bg-white"
              />
            </div>
          </div>
          <div className="grid gap-5 grid-cols-[2fr_1fr]">
            <div className="flex-1">
              <Label htmlFor="bio">Biografia</Label>
              <Textarea
                id="bio"
                {...register("bio")}
                className="h-60 rounded-2xl bg-white"
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="certifications">Certificações</Label>
              <Textarea
                id="certifications"
                {...register("certifications")}
                className="h-60 rounded-2xl bg-white"
              />
            </div>
          </div>
        </div>
      </form>
    </DialogContent>
  );
}
