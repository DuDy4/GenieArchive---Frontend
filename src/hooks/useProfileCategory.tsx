import { useQuery } from "@tanstack/react-query";
import { useApiClient } from "../utils/AxiosMiddleware";

interface ProfileCategory {
  category: string;
  scores: { [key: string]: number };
  description: string;
  icon: string;
}

interface ProfileCategoryResponse {
  profile_category?: ProfileCategory;
}

const useProfileCategory = (tenant_id: string, uuid: string) => {
  const { makeRequest } = useApiClient();

  const { data: profileCategory, error, isLoading } = useQuery<ProfileCategory | null>({
    queryKey: ["profileCategory", tenant_id, uuid],
    queryFn: async () => {
      const response = await makeRequest<ProfileCategoryResponse>(
        "GET",
        `/${tenant_id}/profiles/${uuid}/strengths`
      );

      if (Array.isArray(response)) {
        // Handle unexpected array response
        throw new Error("Unexpected response format");
      }

      if (response?.profile_category) {
        return response.profile_category;
      }

      return null; // Return null if no profile category is found
    },
    onError: (err) => {
      console.error("Failed to fetch profile category:", err);
    },
  });

  return { profileCategory, error, isLoading };
};

export default useProfileCategory;
