import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useToken } from "../providers/TokenProvider";

const useAttendeeInfo = (tenant_id: string, uuid: string) => {
    const token = useToken();
  const { data: attendeeInfo, isLoading: isLoadingAttendeeInfo } = useQuery({
    queryKey: ["attendee-info", tenant_id, uuid],
    queryFn: async ({ queryKey }) => {
      const [_key, tenant_id, uuid] = queryKey;

      if (!token) {
        throw new Error("Token not available");
      }

      const response = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/${tenant_id}/profiles/${uuid}/attendee-info`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    },
  });

  return { attendeeInfo, isLoadingAttendeeInfo };
};

export default useAttendeeInfo;
