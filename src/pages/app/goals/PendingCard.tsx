import {
  useGetGoalsAchievedMetrics,
  useGetGoalsPendingMetrics,
} from "../../../lib/react-query/querysAndMuations";

export function PendingCard({user}: any) {
  let isManager = false

  if(user) {
    isManager = user.hasTeam
  }

  const { data: goalsPending } = useGetGoalsPendingMetrics(isManager);
  const { data: goalsAchievedMetrics } = useGetGoalsAchievedMetrics(isManager);

  return (
    <div className="flex gap-10 border-2 w-64 rounded-full p-5 text-primary-darkGray border-primary-darkGray  ">
      <h1>Metas Pendentes:</h1>
      <span
        className={`${
          goalsPending?.pendingGoals > goalsAchievedMetrics?.achievedGoals
            ? "text-red-500"
            : "text-gray-500"
        }`}
      >
        {goalsPending?.pendingGoals}
      </span>
    </div>
  );
}
