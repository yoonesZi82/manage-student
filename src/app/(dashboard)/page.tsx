import { SectionCards } from "@/components/dashboard/section-cards";
import ChartView from "@/components/dashboard/chart-view";

export default function page() {
  return (
    <>
      <SectionCards />
      <div className="px-4 lg:px-6">
        <ChartView />
      </div>
    </>
  );
}
