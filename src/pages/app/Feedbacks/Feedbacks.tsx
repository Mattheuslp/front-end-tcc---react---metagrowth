import logoFeedback from '../../../assets/logoFeedback.png'
import { ButtonIcon } from '../../../components/ButtonIcon'
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { Dialog, DialogTrigger } from '../../../components/ui/dialog';
import { FeedbackCreate } from './FeedbackCreate';

export function Feedbacks() {
    return (
        <main className='flex gap-5 px-20 pt-10' style={{ height: 'calc(100vh - 6rem)' }}>
            <section className='flex flex-col items-center w-1/7'>
                <div className='flex items-center justify-end h-16 w-16'>
                    <img src={logoFeedback} alt="" />
                    <h1 className='text-primary-yellowNeon font-bold'>Feedbacks</h1>
                </div>
                <div className="bg-primary-yellowNeon w-full h-1"></div>
                <div className='flex flex-col gap-4 pt-6'>
                    <h1 className='rounded-full px-16 text-primary-darkGray border border-primary-darkGray '>Fulano</h1>
                    <h1 className='rounded-full px-16 text-primary-darkGray border border-primary-darkGray '>Fulano</h1>
                    <h1 className='rounded-full px-16 text-primary-darkGray border border-primary-darkGray '>Fulano</h1>
                </div>
            </section>
            <div className="bg-primary-yellowNeon h-auto  w-1"></div>
            <section className='w-full mt-8'>
                <div className='flex justify-between'>
                    <h1 className='text-primary-yellowNeon font-bold text-3xl'>Feedbacks</h1>
                    <Dialog>
                        <DialogTrigger >
                            <ButtonIcon icon={IoChatboxEllipsesOutline } text="Novo feedback" />
                        </DialogTrigger>
                        <FeedbackCreate/>
                    </Dialog>

                </div>
                <div className="bg-primary-yellowNeon w-full h-1 mt-5"></div>
            </section>
        </main>
    )
}