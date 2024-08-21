import React from 'react';
import { useParams } from 'react-router-dom';
import useMeetingDetails from '../hooks/useMeetingOverview';
import MeetingDetails from './MeetingOverviewComponents/MeetingDetails';

const MeetingOverview = () => {
  const { tenantId, meeting_uuid } = useParams();
  console.log(tenantId, meeting_uuid);
  const { data, loading } = useMeetingDetails(tenantId!, meeting_uuid!);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full h-full flex justify-center items-center">
      {data ? <MeetingDetails data={data} /> : <div>Meeting not found</div>}
    </div>
  );
};

export default MeetingOverview;
