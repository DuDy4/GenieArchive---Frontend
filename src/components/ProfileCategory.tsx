import React, { useState } from "react";
import { Dialog, DialogContent, IconButton, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import StrengthsIcons from "../utils/StrengthsIcons.json";
import RadarChart from "./chart";
import useStrengthsAndCategories from "../hooks/useStrengthsAndCategories";

interface Explanation {
  characteristics: string;
  needs: string;
  recommendations: string;
}

interface ProfileCategoryProps {
  tenantId: string;
  uuid: string;
}


const ProfileCategory: React.FC<ProfileCategoryProps> = ({ tenantId, uuid, name }) => {
  const { data, isLoading, error } = useStrengthsAndCategories(tenantId, uuid);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleDialogOpen = () => setIsDialogOpen(true);
  const handleDialogClose = () => setIsDialogOpen(false);

  const { profile_category, strengths } = data;
  const profilesExplanation = profile_category?.explanation || {};
  console.log("Profile Explanation: ", profilesExplanation);

  return (
    <>
      <div className="flex flex-col items-center gap-2 p-6 rounded-lg cursor-pointer hover:shadow-md" onClick={handleDialogOpen}>
        <img src={profile_category.icon} alt={profile_category.category} className="w-16 h-16" />
        <h2 className="text-lg font-semibold">{profile_category.category}</h2>
        <p className="text-sm text-center text-gray-600">{profile_category.description}</p>
        <p className="text-[12px] text-gray-500 hover:text-gray-700 transition-colors cursor-pointer">See more</p>
      </div>

      <Dialog open={isDialogOpen} onClose={handleDialogClose} maxWidth="md">
        <DialogContent className="flex flex-col gap-4 p-6" style={{backgroundColor: '#B2C3DA'}}>
            {/* Close Button */}
              <IconButton
                aria-label="close"
                onClick={handleDialogClose}
                style={{
                  position: 'absolute',
                  top: '0',
                  right: '0',
                  padding: '15px',
                  zIndex: '1000'
                }}
              >
                <CloseIcon />
              </IconButton>

          {/* First column */}
          <div className="flex flex-row md:flex-row gap-4 justify-between">

              <div className="flex flex-col justify-between gap-4 pr-5">
                <div className="flex flex-row justify-start gap-2 "
                        style={{
                          backgroundColor: profile_category ? profile_category.color : 'white',
                          color: profile_category ? profile_category.font_color : 'black',
                          borderRadius: '8px',
                          height: '100px',
                        }}>
                    <img src={profile_category.icon} alt={profile_category.category} style={{width: '100px', height: '100px', borderRadius: '18px', padding: '8px'}} />

                    <div className="flex flex-col items-center justify-center self-center py-[18px] pb-[20px] space-y-3 px-[12px] rounded-[1px] " style={{
                           display: 'flex',
                           flexDirection: 'column',
                           alignItems: 'center',
                           backgroundColor: profile_category.color,
                           maxHeight: '60px',
                           borderRadius: '8px',
                           minWidth: '200px',
                           width: '100%',
                         }}>
                        <p className="text-[36px]" style={{fontFamily: "Poppins"}}><strong>{profile_category.category}</strong></p>
                    </div>
                </div>
                <div className="flex flex-col gap-2 justify-between space-y-3"
                        style={{ marginTop: '10px' }}>
                     <div className="flex flex-col gap-2 p-4 rounded-[1px] border border-[#dddddd]  bg-white">
                         <p className="text-[24px]" style={{fontFamily: "Poppins"}}>
                            <strong>What does {profile_category.category.split(' ')[1]} profile means</strong>
                         </p>
                         <span className="font-semibold text-gray-700" style={{marginTop: '10px'}}>{profile_category.extended_description}</span>
                     </div>

                </div>


              </div>

          <div className="flex flex-col justify-between gap-4 pr-6 -5">
            <RadarChart uuid={uuid} strengths={strengths} color={profile_category ? profile_category.color : null} />
          </div>
            </div>

            {/* Second column */}
            <div className="flex flex-col gap-2 justify-between py-[18px] pb-[20px] space-y-3 px-[12px] rounded-[18px] border border-[#dddddd] bg-white">
                <p className="text-[24px]" style={{fontFamily: "Poppins"}}><strong>Key Personality { name ? `of ${name.split(' ')[0]}` : ''}</strong></p>
                    {strengths && Array.isArray(strengths) && strengths.map(({ strength_name }: any, index: number) => (
                      StrengthsIcons[strength_name] ? (<div key={index} className="flex justify-between items-center cursor-pointer gap-2">
                        <div className="flex flex-row gap-3">
                          <span className="font-semibold text-gray-700"><strong><u>{strength_name}</u></strong>: {StrengthsIcons[strength_name].description}</span>
                        </div>
                      </div>) : null
                    ))}
            </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProfileCategory;
