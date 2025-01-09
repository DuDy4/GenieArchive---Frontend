import { useQuery } from "@tanstack/react-query";
import { useApiClient } from "../utils/AxiosMiddleware";

const useStrengths = (userId: string, uuid: string) => {
    const { makeRequest } = useApiClient();
  const { data: strengths } = useQuery({
    queryKey: ["strengths", userId, uuid],
    queryFn: async ({ queryKey }) => {
      const [_key, userId, uuid] = queryKey;

        const response = await makeRequest('GET', `/${userId}/profiles/${uuid}/strengths`);
        const data = response;
      // console.log(response,userId,uuid)
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
