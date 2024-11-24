import { useGetGoalsAchievedMetrics } from "../../../lib/react-query/querysAndMuations"

export function GoalsAchievedCard() {
    const {data: goalsAchievedMetrics} = useGetGoalsAchievedMetrics()

    return (
        <div className="flex gap-10 border-2 w-64 rounded-full p-5 text-primary-darkGray border-primary-darkGray  ">
            <h1>Metas alcançadas</h1>
            <span className="text-green-500">{goalsAchievedMetrics?.achievedGoals}</span>
        </div>
    )
}