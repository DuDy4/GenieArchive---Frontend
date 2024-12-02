import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useApiClient } from "../utils/AxiosMiddleware";

const useGoodToKnow = (tenant_id: string, uuid: string) => {
    const { makeRequest } = useApiClient();
  const { data: goodToKnow, isLoading: isLoadingGoodToKnow } = useQuery({
    queryKey: ["good-to-know", tenant_id, uuid],
    queryFn: async ({ queryKey }) => {
      const [_key, tenant_id, uuid] = queryKey;

        const response = await makeRequest('GET', `/${tenant_id}/profiles/${uuid}/good-to-know`);

        let data = response;


      // return response;
      if (response && response?.error) {
        console.log("error");
        return await response;
      }

      if (Array.isArray(await data.news)) {
        return data
      } else if (typeof await  data?.news === "object") {
        const newObj = {
          connections: response?.connections ? response?.connections : [],
          hobbies: response?.hobbies ? response?.hobbies : [],
          news: response?.news?.news ? response?.news?.news : [],
        };
        data = newObj;
        return data;
      }

      // else {
      // }
    },
  });

  return { goodToKnow, isLoadingGoodToKnow };
};

export default useGoodToKnow;
