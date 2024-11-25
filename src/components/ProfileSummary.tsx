import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import avatar from './../assets/avatar.png'

interface ProfileSummaryProps {
    name: string
    role: string
    imageUrl: string
}

export function ProfileSummary({ name = 'usuário', role = 'função', imageUrl }: ProfileSummaryProps) {

    const roleTranslated = role === "MANAGER" ? "Gerente" : "Membro"
   
    return (
        <div className="flex gap-5">
            <Avatar>
                <AvatarImage src={imageUrl ?? ''} />
                <AvatarFallback asChild><img src={avatar} alt="avatar" className='bg-primary-darkGray'/></AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start justify-start">
                <h1>{name}</h1>
                <p>{roleTranslated}</p>
            </div>
        </div>
    )
}