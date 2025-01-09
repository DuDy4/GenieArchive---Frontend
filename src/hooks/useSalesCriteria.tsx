import { useQuery } from "@tanstack/react-query";
import { useApiClient } from "../utils/AxiosMiddleware";

interface salesCriteria {
    criteria: string,
    target_score: number,
    score: number,
}

interface SalesCriteriaResponse {
  sales_criteria?: salesCriteria[];
}

const useSalesCriteria = (userId: string, uuid: string) => {
  const { makeRequest } = useApiClient();

  const { data: salesCriteria, error, isLoading: isLoadingSalesCriteria } = useQuery<ProfileCategory | null>({
    queryKey: ["salesCriteria", userId, uuid],
    queryFn: async () => {
      const response = await makeRequest<SalesCriteriaResponse>(
        "GET",
        `/${userId}/profiles/${uuid}/sales-criteria`
      );

      if (response?.sales_criteria) {
        return response.sales_criteria;
      }

      return null; // Return null if no profile category is found
    },
    onError: (err) => {
      console.error("Failed to fetch profile category:", err);
      throw error;
    },
  });

  return { salesCriteria, error, isLoadingSalesCriteria };
};

export default useSalesCriteria;
