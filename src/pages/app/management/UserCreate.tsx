import { ButtonIcon } from "../../../components/ButtonIcon";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";
import { DialogContent, DialogHeader, DialogTitle } from "../../../components/ui/dialog";
import { IoIosSave } from "react-icons/io";
import avatar from '../../../assets/avatar.png'
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";

export function UserCreate() {
    return (
        <DialogContent className="bg-black ">
            <DialogHeader className='flex flex-col gap-2'>
                <DialogTitle className='text-primary-yellowNeon'>Novo Colaborador</DialogTitle>
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
                        <Label htmlFor="name">Nome</Label>
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
                        <Label htmlFor="registration">Admissão</Label>
                        <Input id="registration" type="text" className='rounded-full bg-white' />
                    </div>
                </div>
                <div className="flex gap-4 bg-w">
                    <div className='flex flex-col gap-2 flex-1'>
                        <Label htmlFor="email">E-mail</Label>
                        <Input id="email" type="text" className='rounded-full bg-white' />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <Label htmlFor="password">senha</Label>
                        <Input id="password" type="password" className='rounded-full bg-white' />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <Label htmlFor="phone">Telefone</Label>
                        <Input id="phone" type="text" className='rounded-full bg-white' />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <Label htmlFor="registration">Matricula</Label>
                        <Input id="registration" type="text" className='rounded-full bg-white' />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <Label htmlFor="education">Escolaridade</Label>
                        <Input id="education" type="text" className='rounded-full bg-white' />
                    </div>
                </div>
                <div className="grid gap-5 grid-cols-[2fr_1fr]">
                    <div className="flex-1">
                        <Label htmlFor="biography">Biografia</Label>
                        <Textarea id="biography" className='h-60 rounded-2xl bg-white' />
                    </div>
                    <div className="flex-1">
                        <Label htmlFor="certification">Certificações</Label>
                        <Textarea id="certification" className='h-60 rounded-2xl bg-white' />
                    </div>
                </div>
            </form>
        </DialogContent>
    )
}