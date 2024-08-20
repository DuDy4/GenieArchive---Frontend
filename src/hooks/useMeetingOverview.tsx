import { useState, useEffect } from 'react';

const useMeetingDetails = (tenantId: string, meeting_uuid: string) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/${tenantId}/meeting-overview-mock/${meeting_uuid}`);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return { data, loading };
};

export default useMeetingDetails;
