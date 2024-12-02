import { useQuery } from "@tanstack/react-query";
import { useApiClient } from "../utils/AxiosMiddleware";

interface ActionItem {
  criteria: string;
  action_item: string;
  detail_action_item: string;
  status: string;
  score: number;
  icon?: string;
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
            criteria: item.criteria,
            action_item: item.action_item,
            detail_action_item: item.detail_action_item,
            status: item.status,
            score: item.score,
            icon: item.icon,
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
