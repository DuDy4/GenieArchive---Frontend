import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useToken } from "../providers/TokenProvider";

const useGoodToKnow = (tenant_id: string, uuid: string) => {
    const token = useToken();
  const { data: goodToKnow, isLoading: isLoadingGoodToKnow } = useQuery({
    queryKey: ["good-to-know", tenant_id, uuid],
    queryFn: async ({ queryKey }) => {
      const [_key, tenant_id, uuid] = queryKey;

      if (!token) {
        throw new Error("Token not available");
      }

      const response = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/${tenant_id}/profiles/${uuid}/good-to-know`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // return response.data;
      console.log("GoodToKnow response data:", response.data);
      if (response.data && response.data?.error) {
        console.log("error");
        return await response.data;
      }

      if (Array.isArray(await response.data.news)) {
        console.log('if')
        return response.data
      } else if (typeof await  response.data?.news === "object") {
        console.log("else if");
        const newObj = {
          connections: response.data?.connections ? response.data?.connections : [],
          hobbies: response.data?.hobbies ? response.data?.hobbies : [],
          news: response.data?.news?.news ? response.data?.news?.news : [],
        };
        return newObj;
      }

      // else {
      // }
    },
  });

  return { goodToKnow, isLoadingGoodToKnow };
};

export default useGoodToKnow;
