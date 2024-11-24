import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ButtonIcon } from "../../../components/ButtonIcon";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table";
import { IoIosSave } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import { useFetchUsersNotManagingTeams, useFetchUserWithouTeams, useFetchTeamById, useUpdateTeam } from "../../../lib/react-query/querysAndMuations";
import toast from "react-hot-toast";

const createTeamSchema = z.object({
    name: z.string().min(1, "Nome do time é obrigatório"),
    manager: z.string().min(1, "Gestor da equipe é obrigatório"),
});

type CreateTeamFormData = z.infer<typeof createTeamSchema>;

interface UserWithoutTeam {
    id: string;
    name: string;
}

export function TeamEdit() {
    const { teamId } = useParams();
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<CreateTeamFormData>({
        resolver: zodResolver(createTeamSchema),
    });

    const { data: teamData } = useFetchTeamById(teamId);
    const { data: userWithoutTeams } = useFetchUserWithouTeams() as { data: UserWithoutTeam[] };
    const { data: userNotManagingTeams } = useFetchUsersNotManagingTeams() as { data: UserWithoutTeam[] };
    const { mutateAsync: updateTeam } = useUpdateTeam();
    const [selectedMembers, setSelectedMembers] = useState<UserWithoutTeam[]>([]);
    const [selectedUser, setSelectedUser] = useState<string>("");

    useEffect(() => {
        if (teamData) {
            setValue("name", teamData.name);
            setValue("manager", teamData.manager?.id || "");
            setSelectedMembers(teamData.Users || []);
        }
    }, [teamData, setValue]);

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

            if (teamId) {
                await updateTeam({ teamId, teamData });
            }

            toast.success("Equipe atualizada com sucesso");
        } catch (error: any) {
            toast.error(error.message);
        } 
    };

    const managerOptions = userNotManagingTeams && userNotManagingTeams.length > 0
        ? [{ id: teamData?.manager?.id || "", name: teamData?.manager?.name || "" }, ...userNotManagingTeams]
        : [{ id: teamData?.manager?.id || "", name: teamData?.manager?.name || "" }];

    return (
        <div className="bg-black">
            <div className="flex flex-col gap-2">
                <h1 className="text-primary-yellowNeon">Editar Equipe</h1>
                <div className="bg-primary-darkGray w-full h-[1px]"></div>
            </div>
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
                            onChange={(e) => setValue("manager", e.target.value)} 
                            className="rounded-full bg-white p-2"
                        >
                            <option value="">Selecione um gestor</option>
                            {managerOptions.map((user: UserWithoutTeam) => (
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
        </div>
    );
}
