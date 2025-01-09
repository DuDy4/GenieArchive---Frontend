import { useQuery } from '@tanstack/react-query';
import { useApiClient } from '../utils/AxiosMiddleware';

const useMeetingOverview = (userId: string, meeting_uuid: string) => {
    const { makeRequest } = useApiClient()

  const { data, error, isLoading } = useQuery({
    queryKey: ["meeting-overview", userId, meeting_uuid],  // Giving a name to this query
    queryFn: async () => {
        const response = await makeRequest('GET', `/${userId}/${meeting_uuid}/meeting-overview`);
        console.log("Meeting Overview", response);
        return response;
    },
    enabled: !!meeting_uuid && !!userId,  // Ensure the query runs only when these values are available
  });

  return {
    data,
    error,
    isLoading,
  };
};

export default useMeetingOverview;
