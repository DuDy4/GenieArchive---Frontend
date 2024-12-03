import { useQuery } from "@tanstack/react-query";
import { useToken } from "../providers/TokenProvider";
import { useApiClient } from "../utils/AxiosMiddleware";

const useAllProfiles = (tenant_id: string, meeting_id: string) => {
  const token = useToken();
  const { makeRequest } = useApiClient();

  const { data, isLoading } = useQuery({
    queryKey: ["all-profiles", tenant_id, meeting_id],
    queryFn: async ({ queryKey }) => {
      const [_key, tenantId, meetingId] = queryKey;

      if (!token) {
        throw new Error("Token not available");
      }

      const response = await makeRequest("GET", `/${tenantId}/${meetingId}/profiles`);
      return {
        allProfiles: response.profiles || [],
        allPersons: response.persons || [],
      };
    },
    enabled: !!token, // Ensure the query only runs when the token is available
  });

  const allProfiles = data?.allProfiles ?? [];
  const allPersons = data?.allPersons ?? [];

  return { allProfiles, allPersons, isLoading };
};

export default useAllProfiles;
