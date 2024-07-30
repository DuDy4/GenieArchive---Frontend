import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useGetToKnow = (tenant_id: string, uuid: string) => {
  const { data: getToKnow, isLoading: isLoadingGetToKnow } = useQuery({
    queryKey: ["get-to-know", tenant_id, uuid],
    queryFn: async ({ queryKey }) => {
      const [_key, tenant_id, uuid] = queryKey;

      const response = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/${tenant_id}/profiles/${uuid}/get-to-know`
      );

      return response.data;
    },
  });

  return { getToKnow, isLoadingGetToKnow };
};

export default useGetToKnow;
