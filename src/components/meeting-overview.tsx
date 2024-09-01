import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import useMeetingOverview from '../hooks/useMeetingOverview';
import MeetingDetails from './MeetingOverviewComponents/MeetingDetails';

const MeetingOverview = ({tenantId}) => {
    const [currentTenantId, setCurrentTenantId] = useState(tenantId);
    const { id } = useParams();
    const meeting_uuid = id;
    console.log(tenantId, meeting_uuid);
    const { data, loading, error } = useMeetingOverview(tenantId!, meeting_uuid!);

    useEffect(() => {
        setCurrentTenantId(tenantId);
    }, [tenantId]);

    if (loading){

        return (
            <div className="flex justify-center items-center h-screen w-screen">
                <div className="w-full h-full-meeting flex justify-center items-center overflow-visible">
                    <div className="icon-container">
                        <img src="/images/logo.png" alt="Genie AI" className="icon" />
                        <div className="loading-circle"></div>
                    </div>
                </div>
            </div>
            )
    }


  return (
      <div className="w-full h-full-meeting flex justify-center items-center overflow-auto ">
        {data ? (
          <MeetingDetails data={data} />
        ) : (
          <div className="flex justify-center items-center h-screen w-screen">
            <div className="w-full h-full-meeting flex justify-center items-center overflow-auto">
              <h2 className="text-3xl font-semibold text-gray-700 text-center leading-relaxed">
                Meeting-overview not found
                <br />
                {error ? <span className="text-lg text-gray-500">{error}</span> : null}
              </h2>
            </div>
          </div>
        )}
      </div>
  );
};

export default MeetingOverview;
