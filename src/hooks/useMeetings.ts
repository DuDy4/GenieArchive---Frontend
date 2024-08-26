import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";
import { Meeting } from "../types";

const useMeetings = (tenant_id: string) => {
    const [isImportingMeetings, setIsImportingMeetings] = useState(false);


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
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/${tenant_id}/meetings`
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
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/google/import-meetings/${tenant_id}`
      );
      return response.data;
    },
    onSuccess: () => {
      refetch(); // Refetch meetings after successful import
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
  };
};

export default useMeetings;
