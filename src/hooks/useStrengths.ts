import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useStrengths = (tenant_id: string, uuid: string) => {
  const { data: strengths } = useQuery({
    queryKey: ["strengths", tenant_id, uuid],
    queryFn: async ({ queryKey }) => {
      const [_key, tenant_id, uuid] = queryKey;

      const response = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/${tenant_id}/profiles/${uuid}/strengths`
      );
      
      return response.data;
    },
  });

  return strengths;
};

export default useStrengths;
