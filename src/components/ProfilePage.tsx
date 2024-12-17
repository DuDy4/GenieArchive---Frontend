import React, { useState } from 'react';
import { SalesCriteriaProvider } from '../providers/SalesCriteriaProvider';
import useSalesCriteria from '../hooks/useSalesCriteria';
import AttendeeInfo from './ProfilePageComponents/AttendeeInfo';
import GoodToKnow from './ProfilePageComponents/GoodToKnow';
import WorkHistory from './ProfilePageComponents/WorkHistory';
import AboutSection from './ProfilePageComponents/AboutSection';
import SalesCriteriaContainer from './ProfilePageComponents/SalesCriteriaContainer';
import KpiContainer from './ProfilePageComponents/KpiContainer';
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
import { useApiClient } from '../utils/AxiosMiddleware';

const ProfilePage: React.FC<ProfilesDetailsProps> = ({ name, uuid }) => {
  const { user } = useAuth0();
  const { makeRequest } = useApiClient();
  const { attendeeInfo, isLoadingAttendeeInfo } = useAttendeeInfo(user?.tenantId!, uuid);
  const { goodToKnow, isLoadingGoodToKnow } = useGoodToKnow(user?.tenantId!, uuid);
  const { actionItemsResponse, isLoadingActionItems } = useActionItems(user?.tenantId!, uuid);
  const { salesCriteria, isLoadingSalesCriteria } = useSalesCriteria(user?.tenantId!, uuid);
  const { kpi, actionItems } = actionItemsResponse ? actionItemsResponse : {};
  const { data, isLoading, error } = useStrengthsAndCategories(user?.tenantId!, uuid);
  const { profile_category, strengths } = data ? data : {};
  const { workExperience, isLoadingWorkExperience } = useWorkExperience(user?.tenantId!, uuid);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [clickedScores, setClickedScores] = useState<{ [key: string]: number }>({});
  const [hoveredScores, setHoveredScores] = useState<{ [key: string]: number }>({});

  const linkedinUrls = attendeeInfo?.social_media_links;

  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);

  const handleHoveredScores = (criteria: str, score: int) => {
      setHoveredScores({ ...hoveredScores, [criteria]: score });
    }
    const handleUnhoveredScores = (criteria: str) => {
      setHoveredScores({ ...hoveredScores, [criteria]: 0 });
    }

    const handleClickedScores = (criteria: str, score: int) => {
      setClickedScores({ ...clickedScores, [criteria]: score });
    }

      const handleUnclickedScores = (criteria: str) => {
          const { [criteria]: _, ...rest } = clickedScores;
          setClickedScores(rest);
      }

  const handleNewActionItemDescription = async (criteria: str, description: str) => {
      try {
          const response = makeRequest('POST', `/${user?.tenantId!}/${uuid}/update-action-item`, {
                criteria,
                description,
          }
            );
            console.log("Response: ", response);
            return response;
        } catch (error) {
            console.error("Failed to update description: ", error);
        }
    }


  if (error) return <p>Error: {error.message}</p>;


  return (
    <div
      className="w-[1050px] py-[1rem] my-0 mx-auto grid overflow-auto scrollable-no-scrollbar"
      style={{ gridTemplateColumns: '1fr 2fr', gap: '24px', backgroundColor: 'transperent' }}
    >
      <div className="flex flex-col gap-[14px] ml-2">
        {!isLoadingAttendeeInfo && !isLoading && (
          <AttendeeInfo
            attendeeInfo={attendeeInfo}
            name={name}
            profileCategory={profile_category}
            strengths={strengths}
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
          {!isLoadingSalesCriteria && (
                    <SalesCriteriaContainer
                      salesCriteria={salesCriteria}
                      name={name.split(' ')[0]}
                      hoveredScores={hoveredScores}
                      clickedScores={clickedScores}
                    />
                  )}
            {!isLoadingActionItems && (
                      <KpiContainer
                        kpi={kpi}
                        actionItems={actionItems}
                        handleHoveredScores={handleHoveredScores}
                        handleUnhoveredScores={handleUnhoveredScores}
                        handleClickedScores={handleClickedScores}
                        handleUnclickedScores={handleUnclickedScores}
                        handleNewActionItemDescription={handleNewActionItemDescription}
                      />
                    )}
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
