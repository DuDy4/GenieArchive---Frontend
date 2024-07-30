import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useUser = () => {
  const { data: user, isLoading: isLoadingUser } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/user-info`
      );

      return response.data;
    },
  });

  return { user, isLoadingUser };
};

export default useUser;
