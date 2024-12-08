import { useGetGoalsReport } from "../../../lib/react-query/querysAndMuations";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./../../../components/ui/dialog";

export function GoalsReport() {
  const { data, isLoading } = useGetGoalsReport();

  return (
    <main>
      <DialogContent className="bg-black">
        <DialogHeader className="flex flex-col gap-2">
          <DialogTitle className="text-primary-yellowNeon">
            Relatório de Metas
          </DialogTitle>
          <div className="bg-primary-darkGray w-full h-[1px]"></div>
        </DialogHeader>
        <div className="mt-4">
          {isLoading ? (
            <p className="text-white">Carregando...</p>
          ) : (
            data && (
              <div className="text-white space-y-6">
                {/* Insights */}
                <div>
                  <h2 className="text-lg font-bold text-primary-yellowNeon mb-2">
                    Insights
                  </h2>
                  <p>{data.insights}</p>
                </div>

                {/* Dicas */}
                <div>
                  <h2 className="text-lg font-bold text-primary-yellowNeon mb-2">
                    Dicas
                  </h2>
                  <p>{data.dicas}</p>
                </div>

                {/* Estatísticas */}
                <div>
                  <h2 className="text-lg font-bold text-primary-yellowNeon mb-2">
                    Estatísticas
                  </h2>
                  <ul className="list-disc list-inside">
                    <li>Total de Metas: {data.estatisticas.totalMetas}</li>
                    <li>Metas Concluídas: {data.estatisticas.metasConcluidas}</li>
                    <li>Metas Pendentes: {data.estatisticas.metasPendentes}</li>
                  </ul>
                </div>
              </div>
            )
          )}
        </div>
      </DialogContent>
    </main>
  );
}
