import { ButtonIcon } from "../../../components/ButtonIcon";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { Dialog, DialogTrigger } from "../../../components/ui/dialog";
import { FeedbackCreate } from "./FeedbackCreate";
import { useUserContext } from "../../../context/AuthContext";
import logoFeedback from '../../../assets/logoFeedback.png';
import { Tabs, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import { FeedbackManagerContent } from "./FeedbackManagerContent";
import { FeedbackMemberContent } from "./FeedbackMemberContent";

export function Feedbacks() {

    const { user } = useUserContext();

    console.log('managingTeam', user)

    return (
        <main className="flex gap-5 px-20 pt-10" style={{ height: "calc(100vh - 6rem)" }}>
            <section className="flex flex-col items-center w-56">
                <div className="flex items-center justify-end h-16 w-16">
                    <img src={logoFeedback} alt="" />
                    <h1 className="text-primary-yellowNeon font-bold">Feedbacks</h1>
                </div>
                <div className="bg-primary-yellowNeon w-full h-1"></div>
            </section>
            <div className="bg-primary-yellowNeon h-auto w-1"></div>
            <section className="w-full mt-8">
                <div className="flex justify-between">
                    <h1 className="text-primary-yellowNeon font-bold text-3xl">Feedbacks</h1>
                    {user.role === "MANAGER" ? (
                        <Dialog>
                            <DialogTrigger asChild>
                                <ButtonIcon icon={IoChatboxEllipsesOutline} text="Novo feedback" />
                            </DialogTrigger>
                            <FeedbackCreate />
                        </Dialog>
                    ) : (
                        <>
                        </>
                    )}

                </div>
                <div className="bg-primary-yellowNeon w-full h-1 mt-5 mb-2"></div>
                <Tabs defaultValue="member" >
                    <TabsList>
                        <TabsTrigger value="member">Meus Feedbacks</TabsTrigger>
                        {user.managinTeam && (
                            <TabsTrigger value="manager">Feedbacks da equipe</TabsTrigger>
                        )}
                    </TabsList>
                    <FeedbackManagerContent />
                    <FeedbackMemberContent />
                </Tabs>

              
            </section>
        </main>
    );
}
