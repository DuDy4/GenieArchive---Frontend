import { useQuery } from "@tanstack/react-query";
import { useApiClient } from "../utils/AxiosMiddleware";

const useStrengths = (tenant_id: string, uuid: string) => {
    const { makeRequest } = useApiClient();
  const { data: strengths } = useQuery({
    queryKey: ["strengths", tenant_id, uuid],
    queryFn: async ({ queryKey }) => {
      const [_key, tenant_id, uuid] = queryKey;

        const response = await makeRequest('GET', `/${tenant_id}/profiles/${uuid}/strengths`);
        const data = response;
      // console.log(response,tenant_id,uuid)
      if(Array.isArray(data)){

        return data;
      }
     else if ( data instanceof Object && data?.strengths) {
        return data.strengths
      }
     else {
        return {"error": "Profile not found under this tenant"};
      }
    },
  });
  
  return strengths;
};

export default useStrengths;
