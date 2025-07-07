import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchGetCountDebtor = async (): Promise<{ countDebtor: number }> => {
  const response = await axios.get("/api/count-debtor");
  const data: { countDebtor: number } = response.data;
  return data;
};

const useGetCountDebtor = () => {
  return useQuery({
    queryKey: ["COUNT_DEBTOR"],
    queryFn: () => fetchGetCountDebtor(),
    staleTime: 60000,
    refetchInterval: 30000,
  });
};

export default useGetCountDebtor;
