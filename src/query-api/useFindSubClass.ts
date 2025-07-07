import SubClassTypes from "@/types/class/SubClassTypes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchFindSubClass = async (id: string): Promise<SubClassTypes> => {
  const response = await axios.post("/api/class/sub/find", { id });
  const data: SubClassTypes = response.data;
  return data;
};

const useFindSubClass = (id: string) => {
  return useQuery({
    queryKey: ["FIND_SUB_CLASS", id],
    queryFn: () => fetchFindSubClass(id),
    staleTime: 60000,
    refetchInterval: 30000,
  });
};

export default useFindSubClass;
