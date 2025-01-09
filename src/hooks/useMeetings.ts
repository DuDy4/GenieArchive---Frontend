import axios from "axios";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Meeting } from "../types";
import { useApiClient } from "../utils/AxiosMiddleware";
import { useToken } from "../providers/TokenProvider";

const useMeetings = (userId: string) => {
  const [isImportingMeetings, setIsImportingMeetings] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { makeRequest } = useApiClient();

  const {
    data: meetings,
    isLoading: isLoadingMeetings,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["meetings", userId],
    queryFn: async ({ queryKey }) => {
      const [_key, userId] = queryKey;
      if (!userId) {
        return [];
      }
      const response = await makeRequest('GET', `/${userId}/meetings`);
      return response as Meeting[];
    },
  });

  const reImport = useMutation({
    mutationFn: async () => {
      if (!userId) {
        throw new Error("userId is required to import meetings");
      }
      setIsImportingMeetings(true);
      try {
          const response = await makeRequest('GET', `/google/import-meetings/${userId}`);
          return response;
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
