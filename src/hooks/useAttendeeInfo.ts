import { useQuery } from "@tanstack/react-query";
import { useApiClient } from "../utils/AxiosMiddleware";

const useAttendeeInfo = (userId: string, uuid: string) => {
    const { makeRequest } = useApiClient();
  const { data: attendeeInfo, isLoading: isLoadingAttendeeInfo } = useQuery({
    queryKey: ["attendee-info", userId, uuid],
    queryFn: async ({ queryKey }) => {
      const [_key, userId, uuid] = queryKey;

        const response = await makeRequest('GET', `/${userId}/profiles/${uuid}/attendee-info`);
        const data = response;
        return data;
    },
  });

  return { attendeeInfo, isLoadingAttendeeInfo };
};

export default useAttendeeInfo;
