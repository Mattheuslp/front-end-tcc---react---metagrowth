import { IoMdNotificationsOutline } from "react-icons/io";
import titleLogo from '../assets/login/titleLogo.png'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { NavLink } from "./NavLink";
import { useLogout } from "../lib/react-query/querysAndMuations";
import { ProfileSummary } from "./ProfileSummary";
import { useUserContext } from "../context/AuthContext";

export function Header() {
    const { mutateAsync: logout } = useLogout()
    const { user } = useUserContext()

    async function handleLogout() {
        try {
            await logout()
        } catch (error) {
            throw new Error('Erro ao deslogar, tente novamente')
        }
    }

    return (
        <div className="relative h-24 px-10 py-2 border-b-2 bg-primary-darkGray border-primary-yellowNeon">
            <div className="flex items-center justify-between">
                <img src={titleLogo} alt="title" width={300} />
                <div className="flex gap-3 items-center">
                    <IoMdNotificationsOutline size={30} />


                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="flex items-center gap-3  focus:outline-none">
                                <ProfileSummary
                                    imageUrl={user.imageUrl}
                                    name={user.name}
                                    position={user.position}
                                />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-primary-yellowNeon border-0 rounded-3xl p-4">
                            <DropdownMenuItem >Meu perfil</DropdownMenuItem>
                            <DropdownMenuItem>Alterar senha </DropdownMenuItem>
                            <DropdownMenuItem onClick={handleLogout}>Sair</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>


                </div>
            </div>
            <div className="flex absolute bottom-0 gap-16 font-bold">
                <NavLink to={'/'}>Inicio</NavLink>
                <NavLink to={'/metas'}>Metas</NavLink>
                <NavLink to={'/feedbacks'}>Feedback</NavLink>
                {user.role === "MANAGER" && (
                    <NavLink to={'/gestao'}>Gestão</NavLink>
                )}
            </div>
        </div>
    )
}