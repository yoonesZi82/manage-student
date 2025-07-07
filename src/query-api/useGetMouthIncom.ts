import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface IncomeTypes {
  currentMonthIncome: number;
  percentageChange: number;
}

const fetchGetMouthIncome = async (): Promise<IncomeTypes> => {
  const response = await axios.get("/api/income");
  const data: IncomeTypes = response.data;
  return data;
};

const useGetMouthIncome = () => {
  return useQuery({
    queryKey: ["MOUTH_INCOME"],
    queryFn: () => fetchGetMouthIncome(),
    staleTime: 60000,
    refetchInterval: 30000,
  });
};

export default useGetMouthIncome;
