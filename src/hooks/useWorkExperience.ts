import { useQuery } from "@tanstack/react-query";
import { useApiClient } from "../utils/AxiosMiddleware";

const useWorkExperience = (tenant_id: string, uuid: string) => {
    const { makeRequest } = useApiClient();
  const { data: workExperience, isLoading: isLoadingWorkExperience } = useQuery(
    {
      queryKey: ["work-experience", tenant_id, uuid],
      queryFn: async ({ queryKey }) => {
        const [_key, tenant_id, uuid] = queryKey;

        const response = await makeRequest('GET', `/${tenant_id}/profiles/${uuid}/work-experience`);
        return response;
      },
    }
  );

  return { workExperience, isLoadingWorkExperience };
};

export default useWorkExperience;
