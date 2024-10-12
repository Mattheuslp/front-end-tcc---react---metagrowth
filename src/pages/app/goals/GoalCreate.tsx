import { Avatar, AvatarFallback, AvatarImage } from '../../../components/ui/avatar'
import { DialogContent, DialogHeader, DialogTitle } from './../../../components/ui/dialog'
import avatar from '../../../assets/avatar.png'
import { Label } from '../../../components/ui/label'
import { Input } from '../../../components/ui/input'
import { Switch } from '../../../components/ui/switch'
import { Textarea } from "../../../components/ui/textarea"

export function GoalCreate() {
    return (
        <main>
            <DialogContent className='bg-black'>
                <DialogHeader className='flex flex-col gap-2'>
                    <DialogTitle className='text-primary-yellowNeon'>Nova Meta</DialogTitle>
                    <div className="bg-primary-darkGray w-full h-[1px]"></div>
                </DialogHeader>


                <form action="" className='flex flex-col justify-center gap-3 mt-10 p-5 bg-primary-darkGray rounded-2xl'>
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

                    <div className='flex gap-5 '>
                        <div className='flex flex-col gap-2 flex-1'>
                            <Label htmlFor="titleGoal">Titulo da meta</Label>
                            <Input id="titleGoal" type="text" className='rounded-full bg-white' />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor="startDate">Data de inicio</Label>
                            <Input id="startDate" type="text" className='rounded-full bg-white' />
                        </div>
                    </div>

                    <div className='flex gap-5 '>
                        <div className='flex flex-col gap-2 flex-1'>
                            <Label htmlFor="titleGoal">Titulo da meta</Label>
                            <Textarea id="titleGoal" className='rounded-2xl bg-white' />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor="startDate">Data de fim</Label>
                            <Input id="startDate" type="text" className='rounded-full bg-white' />
                            <h1>Status de conclusão <Switch /></h1>
                        </div>
                    </div>
                </form>
            </DialogContent>
        </main>
    )

}