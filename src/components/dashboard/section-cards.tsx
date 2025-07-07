import Income from "@/app/(dashboard)/components/income/Income";
import DebTor from "@/app/(dashboard)/components/debtor/Debtor";
import CountIncome from "@/app/(dashboard)/components/count-income/CountIncome";
import CountDebtor from "@/app/(dashboard)/components/count-debtor/CountDebtor";

export function SectionCards() {
  return (
    <div className="gap-4 grid grid-cols-2 lg:grid-cols-4 @5xl/main:grid-cols-4 @xl/main:grid-cols-2 dark:*:data-[slot=card]:bg-card *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs px-4 lg:px-6">
      <Income />
      <DebTor />
      <CountIncome />
      <CountDebtor />
    </div>
  );
}
