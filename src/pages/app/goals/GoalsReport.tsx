import { useGetGoalsReport } from "../../../lib/react-query/querysAndMuations";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./../../../components/ui/dialog";
import DOMPurify from "dompurify";

export function GoalsReport() {
  const { data, isLoading } = useGetGoalsReport();

  const sanitizedData = data ? DOMPurify.sanitize(data) : "";

  return (
    <main>
      <DialogContent className="bg-black">
        <DialogHeader className="flex flex-col gap-2">
          <DialogTitle className="text-primary-yellowNeon">
            Relatório de Metas
          </DialogTitle>
          <div className="bg-primary-darkGray w-full h-[1px]"></div>
        </DialogHeader>
        <div>
          {isLoading ? (
            <p>Carregando...</p>
          ) : (
            <div
              className="text-white"
              dangerouslySetInnerHTML={{ __html: sanitizedData }}
            />
          )}
        </div>
      </DialogContent>
    </main>
  );
}
