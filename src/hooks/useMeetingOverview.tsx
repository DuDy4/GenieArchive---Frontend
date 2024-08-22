import { useState, useEffect } from 'react';

const useMeetingOverview = (tenantId: string, meeting_uuid: string) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const apiUrl = import.meta.env.VITE_API_URL;

  console.log("useMeetingOverview apiUrl: ", apiUrl);
    console.log("useMeetingOverview tenantId: ", tenantId);
    console.log("useMeetingOverview meeting_uuid: ", meeting_uuid);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/${tenantId}/meeting-overview-mock/${meeting_uuid}`);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [meeting_uuid, tenantId]);

  return { data, loading };
};

export default useMeetingOverview;
