import axios, { Method } from 'axios';
import { useToken } from '../providers/TokenProvider';
import { useCallback } from 'react';  

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
