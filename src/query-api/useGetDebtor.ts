import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface DebtorTypes {
  totalDebtor: number;
}

const fetchGetDebtor = async (): Promise<DebtorTypes> => {
  const response = await axios.get("/api/debtor");
  const data: DebtorTypes = response.data;
  return data;
};

const useGetDebtor = () => {
  return useQuery({
    queryKey: ["DEBTOR"],
    queryFn: () => fetchGetDebtor(),
    staleTime: 60000,
    refetchInterval: 30000,
  });
};

export default useGetDebtor;
