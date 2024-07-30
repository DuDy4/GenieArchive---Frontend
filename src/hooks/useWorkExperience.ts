import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// interface QueryParams {
//   tenant_id: string;
//   uuid: string;
// }

const useWorkExperience = (tenant_id: string, uuid: string) => {
  const { data: workExperience, isLoading: isLoadingWorkExperience } = useQuery(
    {
      queryKey: ["work-experience", tenant_id, uuid],
      queryFn: async ({ queryKey }) => {
        const [_key, tenant_id, uuid] = queryKey;
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/${tenant_id}/profiles/${uuid}/work-experience`
        );

        return response.data;
      },
    }
  );

  return { workExperience, isLoadingWorkExperience };
};

export default useWorkExperience;
