import { useState, useEffect } from 'react';
import axios from 'axios';

const useMeetingOverview = (tenantId: string, meeting_uuid: string) => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const apiUrl = import.meta.env.VITE_API_URL;

  console.log("useMeetingOverview apiUrl: ", apiUrl);
    console.log("useMeetingOverview tenantId: ", tenantId);
    console.log("useMeetingOverview meeting_uuid: ", meeting_uuid);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/${tenantId}/meeting-overview/${meeting_uuid}`);
        console.log("useMeetingOverview response: ", response.data); // Access the data directly
        setData(response.data);
        setError(null); // Clear any previous error
      } catch (error: any) {
        console.error("useMeetingOverview error: ", error);

        // Check if the error is a response error (i.e., the server responded with a non-2xx status code)
        if (error.response) {
          const { data } = error.response;
          console.log("useMeetingOverview response: ", error.response);
          setError(data ? data.error : 'An unexpected error occurred');
          setData(null);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [meeting_uuid, tenantId]);

  return { data, loading, error };
};

export default useMeetingOverview;
