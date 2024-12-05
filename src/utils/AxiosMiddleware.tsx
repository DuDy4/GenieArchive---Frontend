import axios, { Method } from 'axios';
import { useToken } from '../providers/TokenProvider';
import { useMemo, useCallback } from 'react';  
import EventSourcePolyfill from '@sanity/eventsource/browser'

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  // Method to make a request
  async request(method: Method, url: string, accessToken: string, isAdmin: boolean, fakeTenantId: string | null, data?: any) {
    // Append fakeTenantId to the URL if the user is an admin
    if (isAdmin && fakeTenantId) {
      const separator = url.includes('?') ? '&' : '?';
      url += `${separator}impersonate_tenant_id=${fakeTenantId}`;
    }

    // Set up the request with Axios
    try {
      const response = await axios({
        method: method,
        url: `${this.baseURL}${url}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: data || null,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}


export const useApiClient = () => {
  const { isAdmin, fakeTenantId, token: accessToken } = useToken();

  const apiClient = new ApiClient(import.meta.env.VITE_API_URL);

  // Memoize the makeRequest function using useCallback
  const makeRequest = useCallback((method: Method, url: string, data?: any) => {
    if (!accessToken) {
      throw new Error('AccessToken is missing');
    }
    return apiClient.request(method, url, accessToken, isAdmin, fakeTenantId, data);
  }, [accessToken, isAdmin, fakeTenantId, apiClient]);

  return { makeRequest };
};


export const useSSEClient = () => {
  const { token: accessToken } = useToken();

  const connectToSSE = useMemo(() => {
    return (url: string, onMessage: (data: any) => void, onError?: (error: any) => void) => {
      if (!accessToken) {
        console.warn("AccessToken is missing. Skipping SSE connection.");
        return null;
      }

      const eventSource = new EventSourcePolyfill(`${import.meta.env.VITE_API_URL}${url}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      eventSource.onmessage = (event) => {
        console.log("Received SSE message:", event);
        try {
          const data = JSON.parse(event.data);
          onMessage(data);
        } catch (error) {
          console.error("Failed to parse SSE message:", error);
        }
      };

      eventSource.onerror = (error) => {
        console.error("SSE connection error:", error);
        if (onError) onError(error);
        eventSource.close();
      };

      return eventSource;
    };
  }, [accessToken]); // Stable as long as `accessToken` doesn’t change

  return { connectToSSE };
};


// export const useSSEClient = () => {
//   const { token: accessToken } = useToken();

//   const connectToSSE = (url: string, onMessage: (data: any) => void, onError?: (error: any) => void) => {
//     if (!accessToken) {
//       console.error("AccessToken is missing");
//       return;
//     }

//     const eventSource = new EventSource(`${import.meta.env.VITE_API_URL}${url}`, {
//       withCredentials: true, // Include credentials if needed (e.g., cookies, auth headers)
//     });

//     // Attach event listeners
//     eventSource.onmessage = (event) => {
//       try {
//         const data = JSON.parse(event.data);
//         onMessage(data); // Call the onMessage callback with parsed data
//       } catch (error) {
//         console.error("Failed to parse SSE message:", error);
//       }
//     };

//     eventSource.onerror = (error) => {
//       console.error("SSE connection error:", error);
//       if (onError) {
//         onError(error);
//       }
//       eventSource.close(); // Close the connection on error
//     };

//     return eventSource; // Return the EventSource instance so it can be managed (e.g., closed later)
//   };

//   return { connectToSSE };
// };
