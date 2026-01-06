
import { cn } from "@/lib/utils";

export function AmexLogo({ className }: { className?: string }) {
  return (
    <div className={cn("font-bold", className)}>
      <span className="text-2xl tracking-tight">Amex</span>
    </div>
  );
}
