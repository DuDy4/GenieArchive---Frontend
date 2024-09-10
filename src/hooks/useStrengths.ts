import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useToken } from "../providers/TokenProvider";

const useStrengths = (tenant_id: string, uuid: string) => {
    const token = useToken();
  const { data: strengths } = useQuery({
    queryKey: ["strengths", tenant_id, uuid],
    queryFn: async ({ queryKey }) => {
      const [_key, tenant_id, uuid] = queryKey;

        if (!token) {
            throw new Error("Token not available");
        }

      const response = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/${tenant_id}/profiles/${uuid}/strengths`,
            {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
      );
      // console.log(response.data,tenant_id,uuid)
      if(Array.isArray(await response.data)){

        return response.data;
      }
     else if ( response.data instanceof Object && response.data?.strengths) {
        return response.data.strengths
      }
     else {
        return {"error": "Profile not found under this tenant"};
      }
    },
  });
  
  return strengths;
};

export default useStrengths;
