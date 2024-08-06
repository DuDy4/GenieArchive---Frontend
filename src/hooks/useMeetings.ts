import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Meeting } from "../types";

const useMeetings = (tenant_id: string) => {
  const { data: meetings, isLoading: isLoadingMeetings,refetch,isRefetching } = useQuery({
    queryKey: ["meetings", tenant_id],

    queryFn: async ({ queryKey }) => {
      const [_key, tenant_id] = queryKey;
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/${tenant_id}/meetings`
      );

      return response.data as Meeting[];
    },
  });

  return { meetings, isLoadingMeetings,refetch ,isRefetching};
};

export default useMeetings;
