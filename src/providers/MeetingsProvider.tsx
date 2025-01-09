import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useQuery, useMutation } from "@tanstack/react-query";
import { useApiClient } from "../utils/AxiosMiddleware";
import { useAuth0 } from '@auth0/auth0-react';
import { useToken } from "./TokenProvider";
import { Meeting } from "../types";

// Define the context structure
interface MeetingContextProps {
  meetings: Meeting[] | undefined;
  isLoadingMeetings: boolean;
  refetchMeetings: () => void;
  isRefetchingMeetings: boolean;
  reImportMeetings: () => void;
  isImportingMeetings: boolean;
  error: string | null;
}

// Create the context
const MeetingContext = createContext<MeetingContextProps | undefined>(undefined);

// MeetingProvider component
export const MeetingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isImportingMeetings, setIsImportingMeetings] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { isAdmin, fakeTenantId, fakeUserId } = useToken();
  const { makeRequest } = useApiClient();
  const { user } = useAuth0();

    const checkSelectedDate = () => {
        const storedDate = localStorage.getItem("selectedDate");
        return storedDate ? new Date(storedDate) : new Date();
    }

    useEffect(() => {
        console.log("MeetingsProvider mounted");
        setTimeout(() => {
            getMeetings();
          }, 50);
    }, [fakeTenantId, fakeUserId]);

   const deleteMeeting = useMutation({
    mutationFn: async (meetingId: string) => {
      const response = await makeRequest('DELETE', `/${user?.sub}/${meetingId}`);
      return response;
    },
    onSettled: () => {
      refetchMeetings();
    },
  });


  const {
    data: meetings,
    isLoading: isLoadingMeetings,
    refetch: getMeetings,
    isRefetching: isGettingMeetings,
  } = useQuery({
    queryKey: ["meetings"],
    queryFn: async ({ queryKey }) => {
      const [_key] = queryKey;
      const response = await makeRequest('GET', `/${user?.sub}/meetings/${checkSelectedDate().toISOString()}`);
      return response as Meeting[];
    },
  });

  const reImport = useMutation({
    mutationFn: async () => {
      setIsImportingMeetings(true);
      try {
        const response = await makeRequest('GET', `/google/import-meetings/${user?.sub}`);
        return response;
      } catch (err) {
        setError("An error occurred during import.");
        throw err;
      }
    },
    onSuccess: () => {
      getMeetings(); // Get the meetings from the backend
      setError(null); // Clear error on success
    },
    onSettled: () => {
      setIsImportingMeetings(false); // Reset the importing state
    },
  });

  return (
    <MeetingContext.Provider
      value={{
        meetings,
        isLoadingMeetings,
        getMeetings,
        isGettingMeetings,
        reImportMeetings: reImport.mutate,
        isImportingMeetings,
        error,
        deleteMeeting: deleteMeeting.mutate,
      }}
    >
      {children}
    </MeetingContext.Provider>
  );
};

// Hook to use the MeetingContext
export const useMeetingsContext = () => {
  const context = useContext(MeetingContext);
  if (!context) {
    throw new Error("useMeetingsContext must be used within a MeetingProvider");
  }
  return context;
};
