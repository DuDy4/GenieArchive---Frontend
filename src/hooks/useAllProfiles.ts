import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useToken } from "../providers/TokenProvider";

const useAllProfiles = (tenant_id: string, meeting_id: string) => {
    const token = useToken();
  const { data: allProfiles,isLoading } = useQuery({
    queryKey: ["all-profiles", tenant_id, meeting_id],
    queryFn: async ({ queryKey }) => {
      const [_key, tenant_id, meeting_id] = queryKey;

        if (!token) {
            throw new Error("Token not available");
        }

      const response = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/${tenant_id}/${meeting_id}/profiles`,
            {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
      );
      
      return response.data;
    },
  });

  return {allProfiles};
};

export default useAllProfiles;
