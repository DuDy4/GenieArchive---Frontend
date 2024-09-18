import { useQuery } from "@tanstack/react-query";
import { useApiClient } from "../utils/AxiosMiddleware";

const useGetToKnow = (tenant_id: string, uuid: string) => {
    const { makeRequest } = useApiClient();
  const { data: getToKnow, isLoading: isLoadingGetToKnow } = useQuery({
    queryKey: ["get-to-know", tenant_id, uuid],
    queryFn: async ({ queryKey }) => {
      const [_key, tenant_id, uuid] = queryKey;

        const response = await makeRequest('GET', `/${tenant_id}/profiles/${uuid}/get-to-know`);
        const data = response;
        return data;
    },
  });

  return { getToKnow, isLoadingGetToKnow };
};

export default useGetToKnow;
