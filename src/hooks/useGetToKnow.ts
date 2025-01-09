import { useQuery } from "@tanstack/react-query";
import { useApiClient } from "../utils/AxiosMiddleware";

const useGetToKnow = (userId: string, uuid: string) => {
    const { makeRequest } = useApiClient();
  const { data: getToKnow, isLoading: isLoadingGetToKnow } = useQuery({
    queryKey: ["get-to-know", userId, uuid],
    queryFn: async ({ queryKey }) => {
      const [_key, userId, uuid] = queryKey;

        const response = await makeRequest('GET', `/${userId}/profiles/${uuid}/get-to-know`);
        const data = response;
        return data;
    },
  });

  return { getToKnow, isLoadingGetToKnow };
};

export default useGetToKnow;
