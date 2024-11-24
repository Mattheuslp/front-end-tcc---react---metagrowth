import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '../../../components/ui/avatar';
import avatar from '../../../assets/avatar.png';
import { Label } from '../../../components/ui/label';
import { Input } from '../../../components/ui/input';
import { Switch } from '../../../components/ui/switch';
import { Textarea } from '../../../components/ui/textarea';
import { IoIosSave } from 'react-icons/io';
import { ButtonIcon } from '../../../components/ButtonIcon';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import toast from 'react-hot-toast';
import { useGetGoalById, useFetchUsersByManagerId, useUpdateGoal, useDeleteGoal } from '../../../lib/react-query/querysAndMuations';
import { useUserContext } from '../../../context/AuthContext';

const goalSchema = z.object({
    title: z.string().min(1, 'O título da meta é obrigatório.'),
    startDate: z.string().min(1, 'A data de início é obrigatória.'),
    endDate: z.string().min(1, 'A data de fim é obrigatória.'),
    description: z.string().min(1, 'A descrição da meta é obrigatória.'),
    isCompleted: z.boolean().optional().default(false),
    userId: z.string().min(1, 'Selecione um colaborador.'),
});

type GoalFormData = z.infer<typeof goalSchema>;

export function GoalEdit() {
    const { goalId } = useParams<{ goalId: string }>();
    const { data: goal, isLoading } = useGetGoalById(goalId!);
    const { data: usersByManagerId } = useFetchUsersByManagerId();
    const { user } = useUserContext();
    const { mutateAsync: updateGoal } = useUpdateGoal()
    const isUserGoalOwner = goal?.userId === user?.id;
   

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
    } = useForm<GoalFormData>({
        resolver: zodResolver(goalSchema),
        defaultValues: {
            isCompleted: false,
        },
    });

    useEffect(() => {
        if (goal) {
            setValue('title', goal.title);
            setValue('startDate', goal.startDate.split('T')[0]);
            setValue('endDate', goal.endDate.split('T')[0]);
            setValue('description', goal.description);
            setValue('isCompleted', goal.isCompleted);
            setValue('userId', goal.user?.id || '');
        }
    }, [goal, setValue]);

    const handleGoalUpdate = async (data: GoalFormData) => {
        try {
            if (goalId) {
                await updateGoal({ goalId, data })
            }
            toast.success('Meta atualizada com sucesso!');
        } catch (error: any) {
            toast.error(error.message || 'Erro ao atualizar a meta');
        }
    };

    if (isLoading) {
        return <p>Carregando...</p>;
    }


    return (
        <main>
            <div className="bg-black">
                <div className="flex flex-col gap-2">
                    <h1 className="text-primary-yellowNeon">Editar Meta</h1>
                    <div className="bg-primary-darkGray w-full h-[1px]"></div>
                </div>
                <form
                    onSubmit={handleSubmit(handleGoalUpdate)}
                    className="flex flex-col justify-center gap-3 mt-1 p-5 bg-primary-darkGray rounded-2xl"
                >
                    <div className="flex justify-end">
                        <ButtonIcon icon={IoIosSave} text="Salvar" type="submit" />
                    </div>

                    <div className="flex gap-5">
                        <Avatar className="h-20 w-20">
                            <AvatarImage src={goal?.user?.imageUrl || ''} />
                            <AvatarFallback asChild>
                                <img src={avatar} alt="avatar" className="bg-primary-darkGray" />
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col gap-2 flex-1">
                            <Label htmlFor="userId">Colaborador</Label>
                            {isUserGoalOwner ? (
                                <Input
                                    id="userId"
                                    type="text"
                                    value={goal?.user?.name || ''}
                                    readOnly
                                    className="rounded-full bg-gray-300"
                                />
                            ) : (
                                <select
                                    id="userId"
                                    {...register('userId')}
                                    className="rounded-full bg-white h-9"
                                >
                                    <option value="" disabled>
                                        Selecione um colaborador
                                    </option>
                                    {usersByManagerId?.map((userOption: any) => (
                                        <option key={userOption.id} value={userOption.id}>
                                            {userOption.name}
                                        </option>
                                    ))}
                                </select>
                            )}
                            {errors.userId && <span className="text-red-500">{errors.userId.message}</span>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="role">Função</Label>
                            <Input
                                id="role"
                                type="text"
                                value={
                                    usersByManagerId?.find(
                                        (userOption: any) => userOption.id === watch('userId')
                                    )?.role || goal?.user?.role || ''
                                }
                                readOnly
                                className="rounded-full bg-gray-300"
                            />
                        </div>
                    </div>

                    <div className="flex gap-5">
                        <div className="flex flex-col gap-2 flex-1">
                            <Label htmlFor="title">Título da meta</Label>
                            <Input
                                id="title"
                                type="text"
                                {...register('title')}
                                className="rounded-full bg-white"
                                disabled={isUserGoalOwner}
                            />
                            {errors.title && <span className="text-red-500">{errors.title.message}</span>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="startDate">Data de início</Label>
                            <Input
                                id="startDate"
                                type="date"
                                {...register('startDate')}
                                className="rounded-full bg-white"
                                disabled={isUserGoalOwner}
                            />
                            {errors.startDate && <span className="text-red-500">{errors.startDate.message}</span>}
                        </div>
                    </div>

                    <div className="flex gap-5">
                        <div className="flex flex-col gap-2 flex-1">
                            <Label htmlFor="description">Descrição</Label>
                            <Textarea
                                id="description"
                                {...register('description')}
                                className="h-24 rounded-2xl bg-white"
                                disabled={isUserGoalOwner}
                            />
                            {errors.description && (
                                <span className="text-red-500">{errors.description.message}</span>
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="endDate">Data de fim</Label>
                            <Input
                                id="endDate"
                                type="date"
                                {...register('endDate')}
                                className="rounded-full bg-white"
                                disabled={isUserGoalOwner}
                            />
                            {errors.endDate && <span className="text-red-500">{errors.endDate.message}</span>}
                            <div className="flex items-center gap-2 mt-2">
                                <Label>Status de conclusão</Label>
                                <Switch
                                    checked={watch('isCompleted')}
                                    onCheckedChange={(value) => setValue('isCompleted', value)}
                                />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    );
}
