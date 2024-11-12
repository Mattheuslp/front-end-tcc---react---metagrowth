import { FaUsersGear } from "react-icons/fa6";
import { Dialog, DialogTrigger, DialogContent } from "../../../components/ui/dialog";
import { ButtonIcon } from "../../../components/ButtonIcon";
import { FaCircleUser } from "react-icons/fa6";
import { UserCreate } from "./UserCreate";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { useDeleteUser, useFetchTeams, useFetchUsers } from "../../../lib/react-query/querysAndMuations";
import { ProfileSummary } from "../../../components/ProfileSummary";
import { Link } from "react-router-dom";
import { TeamCreate } from "./TeamCreate";

export function Management() {
    const { data: users } = useFetchUsers();
    const { mutateAsync: deleteUser } = useDeleteUser()
    const { data: teams } = useFetchTeams()

    console.log('tea', teams)

    const handleDelete = (userId: string) => {
        deleteUser(userId)
    };

    return (
        <main className="flex gap-5 px-20 pt-10" style={{ height: "calc(100vh - 6rem)" }}>
            <section className="flex flex-col items-center w-1/7">
                <div className="flex gap-3 items-center justify-start h-16 w-full">
                    <FaUsersGear className="text-primary-yellowNeon" size={40} />
                    <h1 className="text-primary-yellowNeon font-bold">Equipes</h1>
                </div>
                <div className="pt-2 pb-3">
                    <Dialog>
                        <DialogTrigger>
                            <ButtonIcon icon={FaCircleUser} text="Nova equipe" />
                        </DialogTrigger>
                        <TeamCreate />
                    </Dialog>
                </div>
                <div className="bg-primary-yellowNeon w-full h-1"></div>
                <div className="flex flex-col gap-4 pt-6">
                    {teams && teams.map((item: any) => (
                        <Link to={`/edicao/equipe/${item.id}`}>
                            <h1 className="rounded-full px-16 text-primary-darkGray border border-primary-darkGray">{item.name}</h1>
                        </Link>
                    ))}
                </div>
            </section>
            <div className="bg-primary-yellowNeon h-auto w-1"></div>
            <section className="w-full mt-8">
                <div className="flex justify-between">
                    <h1 className="text-primary-yellowNeon font-bold text-3xl">Colaboradores</h1>
                    <Dialog>
                        <DialogTrigger>
                            <ButtonIcon icon={FaCircleUser} text="Novo colaborador" />
                        </DialogTrigger>
                        <UserCreate />
                    </Dialog>
                </div>
                <div className="bg-primary-yellowNeon w-full h-1 mt-5"></div>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[250px] border-b-4 border-primary-darkGray">Nome</TableHead>
                            <TableHead className="w-[140px] border-b-4 border-primary-darkGray">Metas cadastradas</TableHead>
                            <TableHead className="w-[140px] border-b-4 border-primary-darkGray">Metas realizadas</TableHead>
                            <TableHead className="w-[140px] border-b-4 border-primary-darkGray">Performance</TableHead>
                            <TableHead className="w-[140px] border-b-4 border-primary-darkGray">Gestão</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="text-white">
                        {users &&
                            users.map((item: any) => (
                                <TableRow key={item.id}>
                                    <TableCell className="flex items-center justify-start">
                                        <ProfileSummary
                                            imageUrl={item.imageUrl}
                                            name={item.name}
                                            position={item.role}
                                        />
                                    </TableCell>
                                    <TableCell>0</TableCell>
                                    <TableCell>0</TableCell>
                                    <TableCell>0</TableCell>
                                    <TableCell>
                                        <div className="flex gap-2">
                                            <Link to={`/edicao/usuario/${item.id}`}>
                                                <FaRegEdit
                                                    size={25}
                                                    className="cursor-pointer"
                                                />
                                            </Link>
                                            <MdDeleteForever
                                                size={25}
                                                className="cursor-pointer"
                                                onClick={() => handleDelete(item.id)}
                                            />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </section>
        </main>
    );
}
