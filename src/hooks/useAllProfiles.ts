import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useToken } from "../providers/TokenProvider";
import { useApiClient } from "../utils/AxiosMiddleware";

const useAllProfiles = (tenant_id: string, meeting_id: string) => {
    const token = useToken();
    const { makeRequest } = useApiClient();
  const { data: allProfiles,isLoading } = useQuery({
    queryKey: ["all-profiles", tenant_id, meeting_id],
    queryFn: async ({ queryKey }) => {
      const [_key, tenant_id, meeting_id] = queryKey;

        if (!token) {
            throw new Error("Token not available");
        }

      const response = await makeRequest('GET', `/${tenant_id}/${meeting_id}/profiles`);
      return response;
    },
  });

  return {allProfiles};
};

export default useAllProfiles;
