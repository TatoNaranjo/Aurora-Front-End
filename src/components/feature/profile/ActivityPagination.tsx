import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

export const ActivityPagination = () => {
  return (
    <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4">
      <p className="text-[10px] text-muted-foreground font-bold">Mostrando 1 a 4 de 50 resultados</p>

      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest whitespace-nowrap">Elementos por página</span>
          <select className="p-2 border border-border rounded-lg text-[10px] font-bold outline-none bg-background transition-colors duration-300">
            <option>10</option>
          </select>
        </div>

        <div className="flex items-center gap-1">
          <button className="p-2 border border-border rounded-lg text-muted-foreground hover:bg-muted transition-all transition-colors duration-300"><ChevronsLeft className="w-4 h-4" /></button>
          <button className="p-2 border border-border rounded-lg text-muted-foreground hover:bg-muted transition-all transition-colors duration-300"><ChevronLeft className="w-4 h-4" /></button>

          <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-primary-foreground text-[10px] font-bold transition-colors duration-300">1</button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg text-foreground text-[10px] font-bold hover:bg-muted transition-colors duration-300">2</button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg text-foreground text-[10px] font-bold hover:bg-muted transition-colors duration-300">3</button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg text-foreground text-[10px] font-bold hover:bg-muted transition-colors duration-300">4</button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg text-foreground text-[10px] font-bold hover:bg-muted transition-colors duration-300">5</button>

          <button className="p-2 border border-border rounded-lg text-muted-foreground hover:bg-muted transition-all transition-colors duration-300"><ChevronRight className="w-4 h-4" /></button>
          <button className="p-2 border border-border rounded-lg text-muted-foreground hover:bg-muted transition-all transition-colors duration-300"><ChevronsRight className="w-4 h-4" /></button>
        </div>
      </div>
    </div>
  );
};
