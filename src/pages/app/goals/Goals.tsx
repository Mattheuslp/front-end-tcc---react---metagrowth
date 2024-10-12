import { ProfileSummary } from "../../../components/ProfileSummary";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table";
import { useUserContext } from "../../../context/AuthContext";
import { DifferenceCard } from "./DifferenceCard";
import { GoalsAchievedCard } from "./GoalsAchievedCard";
import { NumberOfGoalsCard } from "./NumberOfGoalsCard";
import { ResultCard } from "./ResultCard";
import { GoGoal } from "react-icons/go";
import { MdDeleteForever } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { Switch } from "./../../../components/ui/switch"
import {
    Dialog,
    DialogTrigger,
} from "./../../../components/ui/dialog"
import { GoalCreate } from "./GoalCreate";

export function Goals() {

    const { user } = useUserContext()

    return (
        <div className="flex flex-col gap-20 px-10">
            <div className="flex flex-col gap-3 pt-10">
                <div className="flex justify-between">
                    <h1 className="text-primary-yellowNeon font-bold text-3xl">METAS</h1>
                    <div>
                        <Dialog>
                            <DialogTrigger >
                                <button className="flex items-center  justify-center gap-1 c-yellowNeonBtn px-10 p-2 rounded-full" ><GoGoal />Nova meta</button>
                            </DialogTrigger>
                            <GoalCreate />
                        </Dialog>

                    </div>
                </div>
                <div className="bg-primary-darkGray w-full h-1"></div>
            </div>

            <section className="flex gap-5 items-center justify-between">
                <GoalsAchievedCard />
                <NumberOfGoalsCard />
                <DifferenceCard />
                <ResultCard />
            </section>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className=" w-[250px] border-b-4 border-primary-darkGray">Colaborador</TableHead>
                        <TableHead className=" w-[300px] border-b-4 border-primary-darkGray">Titulo</TableHead>
                        <TableHead className=" w-[140px] border-b-4 border-primary-darkGray">Data de inicio</TableHead>
                        <TableHead className=" w-[140px] border-b-4 border-primary-darkGray">Data de fim</TableHead>
                        <TableHead className=" w-[140px] border-b-4 border-primary-darkGray">Conclusão</TableHead>
                        <TableHead className=" w-[140px] border-b-4 border-primary-darkGray">Gestão</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="text-red-50">
                    <TableCell>
                        <ProfileSummary
                            imgUrl={user.imgUrl}
                            name={user.name}
                            position={user.position}
                        />
                    </TableCell>
                    <TableCell>
                        aaaaa
                    </TableCell>
                    <TableCell>
                        aaaaa
                    </TableCell>
                    <TableCell>
                        aaaaa
                    </TableCell>
                    <TableCell>
                        <Switch />
                    </TableCell>
                    <TableCell>
                        <div className="flex gap-2">
                            <FaRegEdit size={25} className="cursor-pointer" />
                            <MdDeleteForever size={25} className="cursor-pointer" />
                        </div>
                    </TableCell>
                </TableBody>
            </Table>
        </div>
    )
}