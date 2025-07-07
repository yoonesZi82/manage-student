import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type ChartTypes = {
  date: string;
  totalAmount: number;
};

const fetchGetChart = async (): Promise<ChartTypes[]> => {
  const response = await axios.get("/api/chart");
  const data: ChartTypes[] = response.data;
  return data;
};
const useGetChart = () => {
  return useQuery({
    queryKey: ["CHART_LIST"],
    queryFn: () => fetchGetChart(),
    staleTime: 60000,
    refetchInterval: 30000,
  });
};
export default useGetChart;
