import { useQuery } from "@tanstack/react-query";
import { useApiClient } from "../utils/AxiosMiddleware";

const useStrengthsAndCategories = (tenant_id: string, uuid: string) => {
    const { makeRequest } = useApiClient();
  const { data: data, error, isLoading } = useQuery({
    queryKey: ["strengths", tenant_id, uuid],
    queryFn: async ({ queryKey }) => {
      const [_key, tenant_id, uuid] = queryKey;

        const response = await makeRequest('GET', `/${tenant_id}/profiles/${uuid}/strengths`);
        const data = response;
     if ( data instanceof Object && data?.strengths && data?.profile_category) {
        return data
      }
     else {
        return {"error": "Profile not found under this tenant"};
      }
    },
  });

  return { data, error, isLoading };
};

export default useStrengthsAndCategories;
