import {
  useGetGoalsAchievedMetrics,
  useGetGoalsPendingMetrics,
} from "../../../lib/react-query/querysAndMuations";

export function PendingCard() {
  const { data: goalsPending } = useGetGoalsPendingMetrics();
  const { data: goalsAchievedMetrics } = useGetGoalsAchievedMetrics();

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
