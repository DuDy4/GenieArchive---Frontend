import { useQuery } from "@tanstack/react-query";
import { useApiClient } from "../utils/AxiosMiddleware";

interface ActionItem {
  icon: string;
  title: string;
  description: string;
  percentage: string;
  criteria: string;
}

interface ActionItemsResponse {
  kpi: string;
  actionItems: ActionItem[];
}

const useActionItems = (tenant_id: string, uuid: string) => {
  const { makeRequest } = useApiClient();

  const {
    data: actionItemsResponse,
    error,
    isLoading: isLoadingActionItems,
  } = useQuery<ActionItemsResponse | null>({
    queryKey: ["actionItems", tenant_id, uuid],
    queryFn: async () => {
      const response = await makeRequest<ActionItemsResponse>(
        "GET",
        `/${tenant_id}/profiles/${uuid}/action-items`
      );

      if (response) {
        return {
          kpi: response.kpi,
          actionItems: response.action_items.map((item) => ({
            icon: item.icon,
            title: item.title,
            description: item.description,
            percentage: item.percentage,
            criteria: item.criteria,
          })),
        };
      }

      return null; // Return null if no action items are found
    },
    onError: (err) => {
      console.error("Failed to fetch action items:", err);
      throw error;
    },
  });

  return { actionItemsResponse, error, isLoadingActionItems };
};

export default useActionItems;
