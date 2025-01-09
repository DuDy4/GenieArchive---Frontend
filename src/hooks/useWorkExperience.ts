import { useQuery } from "@tanstack/react-query";
import { useApiClient } from "../utils/AxiosMiddleware";

const useWorkExperience = (userId: string, uuid: string) => {
    const { makeRequest } = useApiClient();
  const { data: workExperience, isLoading: isLoadingWorkExperience } = useQuery(
    {
      queryKey: ["work-experience", userId, uuid],
      queryFn: async ({ queryKey }) => {
        const [_key, userId, uuid] = queryKey;

        const response = await makeRequest('GET', `/${userId}/profiles/${uuid}/work-experience`);
        return response;
      },
    }
  );

  return { workExperience, isLoadingWorkExperience };
};

export default useWorkExperience;
