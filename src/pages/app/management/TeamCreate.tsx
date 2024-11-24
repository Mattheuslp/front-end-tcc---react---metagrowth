import { ButtonIcon } from "../../../components/ButtonIcon";
import { DialogContent, DialogHeader, DialogTitle } from "../../../components/ui/dialog";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table";
import { IoIosSave } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import { useCreateTeam, useFetchUsersNotManagingTeams, useFetchUserWithouTeams } from "../../../lib/react-query/querysAndMuations";
import { useState } from "react";
import toast from "react-hot-toast";


const createTeamSchema = z.object({
    name: z.string().min(1, "Nome do time é obrigatório"),
    manager: z.string().min(1, "Gestor da equipe é obrigatório"),
});

type CreateTeamFormData = z.infer<typeof createTeamSchema>;

interface UserWithoutTeam {
    id: string;
    name: string;
    email: string;
    imageUrl: string;
    imageId: string;
    role: string;
    created_at: string;
    admission_date: string | null;
    phone: string | null;
    enrollment: string | null;
    education: string | null;
    bio: string | null;
    certifications: string | null;
    teamId: string | null;
}

export function TeamCreate() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<CreateTeamFormData>({
        resolver: zodResolver(createTeamSchema),
    });

    const { data: userWithoutTeams } = useFetchUserWithouTeams() as { data: UserWithoutTeam[] };
    const { data: userNotManagingTeams } = useFetchUsersNotManagingTeams() as { data: UserWithoutTeam[] };
    const { mutateAsync: createTeam } = useCreateTeam()

    const [selectedMembers, setSelectedMembers] = useState<UserWithoutTeam[]>([]);
    const [selectedUser, setSelectedUser] = useState<string>("");
    const [selectedManager, setSelectedManager] = useState<string>("");


    const handleAddMember = () => {
        const user = userWithoutTeams?.find((user: UserWithoutTeam) => user.id === selectedUser);
        if (user && !selectedMembers.find(member => member.id === user.id)) {
            setSelectedMembers([...selectedMembers, user]);
            setSelectedUser("");
        }
    };


    const handleRemoveMember = (userId: string) => {
        setSelectedMembers(selectedMembers.filter(member => member.id !== userId));
    };


    const handleSave: SubmitHandler<CreateTeamFormData> = async ({ name, manager }) => {

        try {
            const teamData = {
                name,
                managerId: manager,
                userIds: selectedMembers.map(member => member.id),
            };
            await createTeam(teamData)

            toast.success('Equipe criado com sucesso')

            setSelectedMembers([]);
            setSelectedManager("");
            setSelectedUser("");
            reset();
        } catch (error: any) {
            toast.error(error.message)
        } 
    };

    return (
        <DialogContent className="bg-black">
            <DialogHeader className="flex flex-col gap-2">
                <DialogTitle className="text-primary-yellowNeon">Nova Equipe</DialogTitle>
                <div className="bg-primary-darkGray w-full h-[1px]"></div>
            </DialogHeader>
            <form onSubmit={handleSubmit(handleSave)}>
                <div className="flex justify-end mb-5">
                    <ButtonIcon icon={IoIosSave} text="Salvar" type="submit" />
                </div>
                <div className="flex flex-col gap-3 mt-1 p-5 bg-primary-darkGray rounded-2xl">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="name">Nome do Time</Label>
                        <Input
                            id="name"
                            type="text"
                            {...register("name")}
                            className="rounded-full bg-white"
                        />
                        {errors.name && <span className="text-red-500">{errors.name.message}</span>}
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="manager">Gestor da Equipe</Label>
                        <select
                            id="manager"
                            {...register("manager")}
                            value={selectedManager}
                            onChange={(e) => setSelectedManager(e.target.value)}
                            className="rounded-full bg-white p-2"
                        >
                            <option value="">Selecione um gestor</option>
                            {userNotManagingTeams?.map((user: UserWithoutTeam) => (
                                <option key={user.id} value={user.id}>
                                    {user.name}
                                </option>
                            ))}
                        </select>
                        {errors.manager && <span className="text-red-500">{errors.manager.message}</span>}
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="members">Membros da Equipe</Label>
                        <select
                            id="members"
                            value={selectedUser}
                            onChange={(e) => setSelectedUser(e.target.value)}
                            className="rounded-full bg-white p-2"
                        >
                            <option value="">Selecione um membro</option>
                            {userWithoutTeams?.map((user: UserWithoutTeam) => (
                                <option key={user.id} value={user.id}>
                                    {user.name}
                                </option>
                            ))}
                        </select>
                        <div className="flex justify-center mt-2">
                            <ButtonIcon icon={IoIosSave} text="Adicionar" type="button" onClick={handleAddMember} />
                        </div>
                    </div>
                </div>
            </form>

            <div className="mt-8">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="border-b-4 border-primary-darkGray">Nome</TableHead>
                            <TableHead className="border-b-4 border-primary-darkGray w-[140px]">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="text-white">
                        {selectedMembers.map(member => (
                            <TableRow key={member.id}>
                                <TableCell>{member.name}</TableCell>
                                <TableCell>
                                    <div className="flex gap-2">
                                        <MdDeleteForever
                                            size={25}
                                            className="cursor-pointer"
                                            onClick={() => handleRemoveMember(member.id)}
                                        />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </DialogContent>
    );
}
