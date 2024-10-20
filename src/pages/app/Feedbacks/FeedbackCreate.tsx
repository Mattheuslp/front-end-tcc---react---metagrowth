import { ButtonIcon } from "../../../components/ButtonIcon";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";
import { DialogContent, DialogHeader, DialogTitle } from "../../../components/ui/dialog";
import { IoIosSave } from "react-icons/io";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import avatar from '../../../assets/avatar.png'
import { Textarea } from "../../../components/ui/textarea";

export function FeedbackCreate() {
    return (
        <DialogContent className="bg-black ">
            <DialogHeader className='flex flex-col gap-2'>
                <DialogTitle className='text-primary-yellowNeon'>Novo Feedback</DialogTitle>
                <div className="bg-primary-darkGray w-full h-[1px]"></div>
            </DialogHeader>
            <div className='flex justify-end'>
                <ButtonIcon icon={IoIosSave} text="Salvar" />
            </div>
            <form action="" className='flex flex-col justify-center gap-3 mt-1 p-5 bg-primary-darkGray rounded-2xl'>
                <div className='flex gap-5 '>
                    <Avatar className='h-20 w-20' >
                        <AvatarImage src={''} />
                        <AvatarFallback asChild><img src={avatar} alt="avatar" className='bg-primary-darkGray' /></AvatarFallback>
                    </Avatar>
                    <div className='flex flex-col gap-2 flex-1'>
                        <Label htmlFor="name">Colaborador</Label>
                        <Input id="name" type="text" className='rounded-full bg-white' />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <Label htmlFor="class">Turma</Label>
                        <Input id="class" type="text" className='rounded-full bg-white' />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <Label htmlFor="role">Função</Label>
                        <Input id="role" type="text" className='rounded-full bg-white' />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <Label htmlFor="registration">Matricula</Label>
                        <Input id="registration" type="text" className='rounded-full bg-white' />
                    </div>
                </div>
                <div>
                    <Label htmlFor="feedbackDescription">Descreva o feedback</Label>
                    <Textarea id="feedbackDescription" className='h-60 rounded-2xl bg-white'/>
                </div>
            </form>
        </DialogContent>
    )
}