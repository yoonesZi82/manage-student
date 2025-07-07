import ClassTypes from "@/types/class/ClassTypes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchFindClass = async (id: string): Promise<ClassTypes> => {
  const response = await axios.post("/api/class/find", { id });
  const data: ClassTypes = response.data;
  return data;
};

const useFindClass = (id: string) => {
  return useQuery({
    queryKey: ["FIND_CLASS", id],
    queryFn: () => fetchFindClass(id),
    staleTime: 60000,
    refetchInterval: 30000,
  });
};

export default useFindClass;
