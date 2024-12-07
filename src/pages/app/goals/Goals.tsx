import { GoGoal } from "react-icons/go";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { Dialog, DialogTrigger } from "./../../../components/ui/dialog";
import { GoalCreate } from "./GoalCreate";
import { ButtonIcon } from "../../../components/ButtonIcon";
import { useUserContext } from "../../../context/AuthContext";
import { GoalsReport } from "./GoalsReport";
import { Tabs, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import { GoalsMemberContent } from "./GoalsMemberContent";
import { GoalsManagerContent } from "./GoalsManagerContent";

export function Goals() {

  const { user } = useUserContext();

  return (
    <div className="flex flex-col gap-20 px-10">
      <div className="flex flex-col gap-3 pt-10">
        <div className="flex justify-between">
          <h1 className="text-primary-yellowNeon font-bold text-3xl">METAS</h1>
          <div className="flex justify-end">
            {user.role === "MANAGER" ? (
              <div className="flex  gap-2 justify-center items-center">
                <Dialog>
                  <DialogTrigger>
                    <ButtonIcon icon={HiOutlineDocumentReport} text="Gerar relatório" />
                  </DialogTrigger>
                  <GoalsReport />
                </Dialog>
                <Dialog>
                  <DialogTrigger>
                    <ButtonIcon icon={GoGoal} text="Nova meta" />
                  </DialogTrigger>
                  <GoalCreate />
                </Dialog>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="bg-primary-darkGray w-full h-1"></div>
      </div>

      <Tabs defaultValue="member" >
        <TabsList>
          <TabsTrigger value="member">Minhas metas</TabsTrigger>
          {user.hasTeam  && (<TabsTrigger value="manager">Metas da equipe</TabsTrigger>)}
        </TabsList>
        <GoalsMemberContent />
        <GoalsManagerContent />
      </Tabs>
      
    </div>
  );
}

