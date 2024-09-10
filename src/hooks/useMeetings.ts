import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";
import { Meeting } from "../types";
import { useToken } from "../providers/TokenProvider";

const useMeetings = (tenant_id: string) => {
  const [isImportingMeetings, setIsImportingMeetings] = useState(false);
  const [error, setError] = useState<string | null>(null);
    const token = useToken();

  const {
    data: meetings,
    isLoading: isLoadingMeetings,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["meetings", tenant_id],
    queryFn: async ({ queryKey }) => {
      const [_key, tenant_id] = queryKey;
      if (!tenant_id) {
        return [];
      }
        if (!token) {
            throw new Error("Token not available");
        }
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/${tenant_id}/meetings`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data as Meeting[];
    },
  });

  const reImport = useMutation({
    mutationFn: async () => {
      if (!tenant_id) {
        throw new Error("TenantId is required to import meetings");
      }
      setIsImportingMeetings(true);
      try {
        if (!token) {
          throw new Error("Token not available");
        }
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/google/import-meetings/${tenant_id}`,
            {
                headers: {
                Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 401) {
          setError("Token is no longer valid. Please re-authenticate.");
        } else {
          setError("An error occurred during import.");
        }
        throw err;
      }
    },
    onSuccess: () => {
      refetch(); // Refetch meetings after successful import
      setError(null); // Clear error on success
    },
    onSettled: () => {
      setIsImportingMeetings(false); // Reset the importing state
    },
  });

  return {
    meetings,
    isLoadingMeetings,
    refetch,
    isRefetching,
    reImport: reImport.mutate,
    isImportingMeetings,
    error,
  };
};

export default useMeetings;
