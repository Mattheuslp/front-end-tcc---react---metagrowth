
import { useGetGoalsPercentageMetrics } from "../../../lib/react-query/querysAndMuations";

export function ResultCard({user}: any) {
  let isManager = false

  if(user) {
    isManager = user.hasTeam
  }

  const { data: goalsPercentage } = useGetGoalsPercentageMetrics(isManager);
  return (
    <div className="flex gap-10 border-2 w-64 rounded-full p-5 text-primary-darkGray border-primary-darkGray  ">
      <h1>Aproveitamento</h1>
      <span
        className={`${
          goalsPercentage?.percentage < 60 ? "text-red-500" : "text-green-500"
        }`}
      >
        {goalsPercentage?.percentage} %
      </span>
    </div>
  );
}
