import React, { useState } from 'react';
import AttendeeInfo from './ProfilePageComponents/AttendeeInfo';
import { useSalesCriteria } from '../providers/SalesCriteriaProvider';
import GoodToKnow from './ProfilePageComponents/GoodToKnow';
import WorkHistory from './ProfilePageComponents/WorkHistory';
import AboutSection from './ProfilePageComponents/AboutSection';
import SalesCriteriaContainer from './ProfilePageComponents/SalesCriteriaContainer';
import KpiContainer from './ProfilePageComponents/kpiComponents/KpiContainer';
import { useAuth0 } from '@auth0/auth0-react';
import { ProfilesDetailsProps } from '../types';
import useAttendeeInfo from '../hooks/useAttendeeInfo';
import useGoodToKnow from '../hooks/useGoodToKnow';
import useGetToKnow from '../hooks/useGetToKnow';
import useWorkExperience from '../hooks/useWorkExperience';
import useStrengthsAndCategories from '../hooks/useStrengthsAndCategories';
import useActionItems from '../hooks/useActionItems';
import LoadingGenie from './ui/loading-genie';
import { Dialog, DialogContent, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SocialMediaFeed from './SocialMediaFeed';

const ProfilePage: React.FC<ProfilesDetailsProps> = ({ name, uuid }) => {
  const { user } = useAuth0();
  const { attendeeInfo, isLoadingAttendeeInfo } = useAttendeeInfo(user?.tenantId!, uuid);
  const { goodToKnow, isLoadingGoodToKnow } = useGoodToKnow(user?.tenantId!, uuid);
  const { actionItemsResponse, isLoadingActionItems } = useActionItems(user?.tenantId!, uuid);
  const { kpi, actionItems } = actionItemsResponse ? actionItemsResponse : {};
  console.log('kpi', kpi);
  console.log('actionItems', actionItems);
  const { isLoadingSalesCriteria } = useSalesCriteria();
  const { data, isLoading, error } = useStrengthsAndCategories(user?.tenantId!, uuid);
  const { profile_category } = data ? data : {};
  const { workExperience, isLoadingWorkExperience } = useWorkExperience(user?.tenantId!, uuid);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const linkedinUrls = attendeeInfo?.social_media_links;

  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (isLoadingAttendeeInfo || isLoadingGoodToKnow || isLoadingActionItems || isLoadingSalesCriteria || isLoadingWorkExperience) {
    return <LoadingGenie withLoadingCircle={true} />;
  }

  return (
    <div
      className="w-[1050px] py-[1rem] my-0 mx-auto grid overflow-auto"
      style={{ gridTemplateColumns: '1fr 2fr', gap: '24px', backgroundColor: '#b7c3d8' }}
    >
      <div className="flex flex-col gap-[14px] ml-2">
        {!isLoadingAttendeeInfo && (
          <AttendeeInfo
            attendeeInfo={attendeeInfo}
            name={name}
            profileCategory={profile_category?.category}
          />
        )}
        {!isLoadingAttendeeInfo && (
          <AboutSection profileSummary={attendeeInfo?.work_history_summary} />
        )}
        {!isLoadingGoodToKnow && (
          <GoodToKnow goodToKnow={goodToKnow} handleDialogOpen={handleDialogOpen} name={name} />
        )}
        {!isLoadingWorkExperience && <WorkHistory workExperience={workExperience} />}
      </div>
      <div className="flex flex-col justify-start gap-[14px] mr-2">
            {!isLoadingSalesCriteria && (<SalesCriteriaContainer name={name.split(' ')[0]}/>)}
            {!isLoadingActionItems && (<KpiContainer kpi={kpi} actionItems={actionItems}/>)}
      </div>
      <Dialog open={isDialogOpen} onClose={handleDialogClose} maxWidth="md" sx={{ padding: '0' }}>
        <IconButton
          aria-label="close"
          onClick={handleDialogClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent
          dividers
          sx={{ maxWidth: '800px', padding: '0', paddingTop: '20px', backgroundColor: '#f5f5f5' }}
        >
          <SocialMediaFeed
            news={goodToKnow?.news || []}
            name={name}
            linkedinUrls={linkedinUrls}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProfilePage;
