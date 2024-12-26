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
          "ngrok-skip-browser-warning": "69420",
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
  console.log("EventSource: ", eventSource);

      eventSource.onopen = () => {
        console.log("SSE connection opened");
      }

      eventSource.onmessage = (event) => {
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
        console.log("EventSource: ", eventSource);
      return eventSource;
    };
  }, [accessToken]); // Stable as long as `accessToken` doesn’t change

  return { connectToSSE };
};
