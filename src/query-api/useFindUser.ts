import UserTypes from "@/types/user/UserTypes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchFindUser = async (id: string): Promise<UserTypes> => {
  const response = await axios.post("/api/user/find", { id });
  const data: UserTypes = response.data;
  return data;
};

const useFindUser = (id: string) => {
  return useQuery({
    queryKey: ["FIND_USER", id],
    queryFn: () => fetchFindUser(id),
    staleTime: 60000,
    refetchInterval: 30000,
  });
};

export default useFindUser;
