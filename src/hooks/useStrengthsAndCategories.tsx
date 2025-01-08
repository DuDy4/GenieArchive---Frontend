import { useQuery } from "@tanstack/react-query";
import { useApiClient } from "../utils/AxiosMiddleware";

const useStrengthsAndCategories = (userId: string, uuid: string) => {
    const { makeRequest } = useApiClient();
  const { data: data, error, isLoading } = useQuery({
    queryKey: ["strengths", userId, uuid],
    queryFn: async ({ queryKey }) => {
      const [_key, userId, uuid] = queryKey;

        const response = await makeRequest('GET', `/${userId}/profiles/${uuid}/strengths`);
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
