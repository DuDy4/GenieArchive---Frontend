import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useToken } from '../providers/TokenProvider';

const useMeetingOverview = (tenantId: string, meeting_uuid: string) => {
  const { token } = useToken();
  const apiUrl = import.meta.env.VITE_API_URL;

  const { data, error, isLoading } = useQuery({
    queryKey: ["meeting-overview", tenantId, meeting_uuid],  // Giving a name to this query
    queryFn: async () => {
      if (!token) {
        throw new Error('Token not available');
      }
      const response = await axios.get(
        `${apiUrl}/${tenantId}/${meeting_uuid}/meeting-overview`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    },
    enabled: !!meeting_uuid && !!tenantId,  // Ensure the query runs only when these values are available
  });

  return {
    data,
    error,
    isLoading,
  };
};

export default useMeetingOverview;
