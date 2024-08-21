import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import useMeetingOverview from '../hooks/useMeetingOverview';
import MeetingDetails from './MeetingOverviewComponents/MeetingDetails';

const MeetingOverview = ({tenantId}) => {
    const [currentTenantId, setCurrentTenantId] = useState(tenantId);
    const { id } = useParams();
    const meeting_uuid = id;
    console.log(tenantId, meeting_uuid);
    const { data, loading } = useMeetingOverview(tenantId!, meeting_uuid!);

    useEffect(() => {
        setCurrentTenantId(tenantId);
    }, [tenantId]);

    return (
        <div className="flex justify-center items-center h-screen w-screen">
            <div className="w-full h-full-meeting flex justify-center items-center overflow-auto">
                <div className="icon-container">
                    <img src="/images/logo.png" alt="Genie AI" className="icon" />
                    <div className="loading-circle"></div>
                </div>
            </div>
        </div>
        )


  return (
      <div className="w-full h-full-meeting flex justify-center items-center overflow-auto ">
        {data ? <MeetingDetails data={data} /> :
        (
                  <div className="flex justify-center items-center h-screen w-screen">
                    <div className="w-full h-full-meeting flex justify-center items-center overflow-auto">
                      Meeting not found
                    </div>
                  </div>
                )}
      </div>
  );
};

export default MeetingOverview;
