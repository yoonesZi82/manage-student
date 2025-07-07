import ClassTypes from "@/types/class/ClassTypes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchGetClass = async (): Promise<ClassTypes[]> => {
  const response = await axios.get("/api/class");
  const data: ClassTypes[] = response.data;
  return data;
};

const useGetClass = () => {
  return useQuery({
    queryKey: ["CLASS_LIST"],
    queryFn: () => fetchGetClass(),
    staleTime: 60000,
    refetchInterval: 30000,
  });
};

export default useGetClass;
