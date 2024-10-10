import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import useMeetingOverview from '../hooks/useMeetingOverview';
import LoadingGenie from './ui/loading-genie';
import ExternalMeetingDetails from './MeetingOverviewComponents/ExternalMeetingDetails';
import InternalMeetingDetails from './MeetingOverviewComponents/InternalMeetingDetails';
import PrivateMeetingDetails from './MeetingOverviewComponents/PrivateMeetingDetails';

const MeetingOverview = ({tenantId}) => {
    const [currentTenantId, setCurrentTenantId] = useState(tenantId);
    const { id } = useParams();
    const meeting_uuid = id;
    console.log(tenantId, meeting_uuid);
    const { data, loading, error } = useMeetingOverview(tenantId!, meeting_uuid!);
    const meeting = data?.meeting;
    const classification = meeting?.classification;
    console.log("Data",data);
    console.log("Classification",classification);

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
        setCurrentTenantId(tenantId);
    }, [tenantId]);

    if (loading){

        return (
                <LoadingGenie withLoadingCircle={true} />
            )
    }


  return (
      <div className="w-full h-full-meeting flex justify-center items-center overflow-auto ">
        {data ? (
          renderMeetingDetails()
        ) : (
          <div className="flex justify-center items-center h-screen w-screen">
            <div className="w-full h-full-meeting flex justify-center items-center overflow-auto">
                {error ?
                    <h2 className="text-3xl font-semibold text-gray-700 text-center leading-relaxed">{error.response?.data?.detail}</h2>
                    : <LoadingGenie withLoadingCircle={true} />}
            </div>
          </div>
        )}
      </div>
  );
};

export default MeetingOverview;
