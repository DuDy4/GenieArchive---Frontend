import { useQuery } from "@tanstack/react-query";
import { useApiClient } from "../utils/AxiosMiddleware";

const useAttendeeInfo = (tenant_id: string, uuid: string) => {
    const { makeRequest } = useApiClient();
  const { data: attendeeInfo, isLoading: isLoadingAttendeeInfo } = useQuery({
    queryKey: ["attendee-info", tenant_id, uuid],
    queryFn: async ({ queryKey }) => {
      const [_key, tenant_id, uuid] = queryKey;

        const response = await makeRequest('GET', `/${tenant_id}/profiles/${uuid}/attendee-info`);
        const data = response;
        return data;
    },
  });

  return { attendeeInfo, isLoadingAttendeeInfo };
};

export default useAttendeeInfo;
