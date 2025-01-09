import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useMeetingOverview from '../hooks/useMeetingOverview';
import LoadingGenie from './ui/loading-genie';
import ExternalMeetingDetails from './MeetingOverviewComponents/ExternalMeetingDetails';
import InternalMeetingDetails from './MeetingOverviewComponents/InternalMeetingDetails';
import PrivateMeetingDetails from './MeetingOverviewComponents/PrivateMeetingDetails';

const MeetingOverview = ({ userId }) => {
  const [currentUserId, setCurrentUserId] = useState(userId);
  const { id } = useParams();
  const meeting_uuid = id;
  const [retryCount, setRetryCount] = useState(0);
  const [showNotFound, setShowNotFound] = useState(false);

  const { data, loading, error } = useMeetingOverview(userId!, meeting_uuid!);
  const meeting = data?.meeting;
  const classification = data?.meeting?.classification;

  console.log('Data', data);
  console.log('Classification', classification);

  const renderMeetingDetails = () => {
    switch (classification) {
      case 'internal':
        return <InternalMeetingDetails data={data} />;
      case 'private':
        return <PrivateMeetingDetails data={data} />;
      default:
        return <ExternalMeetingDetails data={data} />;
    }
  };

  useEffect(() => {
    setCurrentUserId(userId);
  }, [userId]);

  useEffect(() => {
    if (!data && retryCount < 3) {
      // Retry after 5 seconds
      const retryTimeout = setTimeout(() => {
        setRetryCount(retryCount + 1);
      }, 3000);
      return () => clearTimeout(retryTimeout);
    } else if (!data && retryCount >= 3) {
      setShowNotFound(true);
    }
  }, [data, loading, retryCount]);

  if (loading || (retryCount < 3 && !data)) {
    return <LoadingGenie withLoadingCircle={true} />;
  }

  return (
    <div className="w-full h-full-meeting flex justify-center overflow-auto">
      {data ? (
        renderMeetingDetails()
      ) : showNotFound ? (
        <div className="flex justify-center items-center h-screen w-screen">
          <div className="w-full h-full-meeting flex justify-center items-center overflow-auto">
            <h2 className="text-3xl font-semibold text-gray-700 text-center leading-relaxed">
              Meeting-overview not found
              <br />
              {error ? <span className="text-lg text-gray-500">{error.message || JSON.stringify(error)}</span> : null}
            </h2>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default MeetingOverview;
