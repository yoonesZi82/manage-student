import UserTypes from "@/types/user/UserTypes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchGetUsers = async (): Promise<UserTypes[]> => {
  const response = await axios.get("/api/user");
  const data: UserTypes[] = response.data;
  return data;
};

const useGetUsers = () => {
  return useQuery({
    queryKey: ["USERS_LIST"],
    queryFn: () => fetchGetUsers(),
    staleTime: 60000,
    refetchInterval: 30000,
  });
};

export default useGetUsers;
