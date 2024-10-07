import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { FaRegUserCircle } from "react-icons/fa";

interface ProfileSummaryProps {
    name: string
    position: string
    imgUrl: string
}

export function ProfileSummary({ name = 'usuário', position = 'função', imgUrl }: ProfileSummaryProps) {
    return (
        <div className="flex gap-5">
            <Avatar>
                <AvatarImage src={imgUrl ?? ''} />
                <AvatarFallback asChild><FaRegUserCircle className=""/></AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-center justify-center">
                <h1>{name}</h1>
                <p>{position}</p>
            </div>
        </div>
    )
}