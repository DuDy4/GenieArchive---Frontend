import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useAllProfiles = (tenant_id: string, meeting_id: string) => {
  const { data: allProfiles,isLoading } = useQuery({
    queryKey: ["all-profiles", tenant_id, meeting_id],
    queryFn: async ({ queryKey }) => {
      const [_key, tenant_id, meeting_id] = queryKey;

      const response = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/${tenant_id}/${meeting_id}/profiles`
      );
      
      return response.data;
    },
  });

  return {allProfiles,isLoading};
};

export default useAllProfiles;
