import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchGetCountIncome = async (): Promise<{ countIncome: number }> => {
  const response = await axios.get("/api/count-income");
  const data: { countIncome: number } = response.data;
  return data;
};

const useGetCountIncome = () => {
  return useQuery({
    queryKey: ["COUNT_INCOME"],
    queryFn: () => fetchGetCountIncome(),
    staleTime: 60000,
    refetchInterval: 30000,
  });
};

export default useGetCountIncome;
