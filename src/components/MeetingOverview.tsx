import React from 'react';
import { useParams } from 'react-router-dom';
import useMeetingDetails from '../hooks/useMeetingOverview';
import MeetingDetails from './MeetingOverviewComponents/MeetingDetails';

const Meeting = () => {
  const { tenantId, meeting_uuid } = useParams();
  const { data, loading } = useMeetingOverview(tenantId!);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {data ? <MeetingDetails data={data} /> : <div>Meeting not found</div>}
    </div>
  );
};

export default Meeting;
