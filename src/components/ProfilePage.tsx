import React, { useState } from 'react';
import AttendeeInfo from './ProfilePageComponents/AttendeeInfo';
import GoodToKnow from './ProfilePageComponents/GoodToKnow';
import GetToKnow from './ProfilePageComponents/GetToKnow';
import WorkHistory from './ProfilePageComponents/WorkHistory';
import AboutSection from './ProfilePageComponents/AboutSection';
import { useAuth0 } from '@auth0/auth0-react';
import { ProfilesDetailsProps } from '../types';
import useAttendeeInfo from '../hooks/useAttendeeInfo';
import useGoodToKnow from '../hooks/useGoodToKnow';
import useGetToKnow from '../hooks/useGetToKnow';
import useWorkExperience from '../hooks/useWorkExperience';
import useStrengthsAndCategories from '../hooks/useStrengthsAndCategories';
import LoadingGenie from './ui/loading-genie';
import { handleDialogOpen } from '../utils/handleDialogOpen';



const ProfilePage: React.FC<ProfilesDetailsProps> = ({ name, uuid }) => {
  const { user } = useAuth0();
  const { attendeeInfo, isLoadingAttendeeInfo } = useAttendeeInfo(user?.tenantId!, uuid);
  const { goodToKnow, isLoadingGoodToKnow } = useGoodToKnow(user?.tenantId!, uuid);
  const { getToKnow, isLoadingGetToKnow } = useGetToKnow(user?.tenantId!, uuid);
  const { data, isLoading, error } = useStrengthsAndCategories(user?.tenantId!, uuid);
  const { profile_category } = data ? data : {};
  const { workExperience, isLoadingWorkExperience } = useWorkExperience(user?.tenantId!, uuid);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);

  if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

  if (isLoadingAttendeeInfo || isLoadingGoodToKnow || isLoadingGetToKnow || isLoadingWorkExperience) {
    return <LoadingGenie withLoadingCircle={true} />;
  }

  return (
    <div className="w-[1050px] py-[1rem] my-0 mx-auto grid overflow-auto"
    style={{ gridTemplateColumns: "1fr 2fr", gap: "24px", backgroundColor: "#b7c3d8"}}>
    <div className="flex flex-col gap-[8px]">
      <AttendeeInfo attendeeInfo={attendeeInfo} name={name} profileCategory={profile_category?.category}/>
      <AboutSection profileSummary={attendeeInfo?.work_history_summary} />
      <GoodToKnow goodToKnow={goodToKnow} handleDialogOpen={handleDialogOpen} name={name} />
      <WorkHistory workExperience={workExperience} />
      </div>
      <div className="flex flex-col gap-[24px]">
      </div>

    </div>
  );
};

export default ProfilePage;
