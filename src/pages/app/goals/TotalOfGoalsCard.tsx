import { useGetGoalsTotalMetrics } from "../../../lib/react-query/querysAndMuations"

export function TotalOfGoalsCard() {
    const {data: goalsTotalMetrics } = useGetGoalsTotalMetrics()

    console.log('ss', goalsTotalMetrics )
    return (
        <div className="flex gap-10 border-2 w-64 rounded-full p-5 text-primary-darkGray border-primary-darkGray  ">
            <h1>Quantidade de Metas</h1>
            <span className="text-primary-yellowNeon">{goalsTotalMetrics?.totalGoals}</span>
        </div>
    )
}