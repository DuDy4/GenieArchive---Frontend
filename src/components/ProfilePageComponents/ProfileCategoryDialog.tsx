import React, { useState } from "react";
import { Dialog, DialogContent, IconButton, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import StrengthsIcons from "../../utils/StrengthsIcons.json";
import RadarChart from "../chart";
import useStrengthsAndCategories from "../../hooks/useStrengthsAndCategories";
import { darkenColor, getContrastColor } from "../../utils/colorsUtils";

interface Explanation {
  characteristics: string;
  needs: string;
  recommendations: string;
}


const titlize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const ProfileCategoryDialog: React.FC<ProfileCategoryProps> = ({ profileCategory, strengths }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDialogOpen = () => setIsDialogOpen(true);
  const handleDialogClose = () => setIsDialogOpen(false);

  const profilesExplanation = profileCategory?.explanation || {};
  console.log("Profile Explanation: ", profilesExplanation);

  return (
    <>
      <div
        onClick={handleDialogOpen}
        className="py-[18px] pb-[20px] space-y-3 px-[12px] rounded-[1px] border border-[#dddddd]"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: profileCategory ? profileCategory.color : '#FFCC00',
          color: profileCategory ? getContrastColor(profileCategory.color) : "black",
          cursor: 'pointer',
          transition: 'background-color 0.3s ease',
        }}
        onMouseEnter={(e) => {
          if (profileCategory?.color) {
            (e.target as HTMLElement).style.backgroundColor = darkenColor(
              profileCategory.color,
              -10 // Darken by 10%
            );
          }
        }}
        onMouseLeave={(e) => {
          if (profileCategory?.color) {
            (e.target as HTMLElement).style.backgroundColor = profileCategory.color;
          }
        }}
      >
        <p className="text-[24px]" style={{ fontFamily: "Poppins" }}>
          <strong>{titlize(profileCategory.category.replace('The ', ''))}</strong>
        </p>
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
                <div
                  className="flex flex-row justify-start gap-2"
                  style={{
                    backgroundColor: profileCategory ? profileCategory.color : "white",
                    color: profileCategory ? getContrastColor(profileCategory.color) : "black",
                    borderRadius: "8px",
                    height: "100px",
                  }}
                >
                  <img
                    src={profileCategory.icon}
                    alt={profileCategory.category}
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "18px",
                      padding: "8px",
                      filter: profileCategory
                        ? getContrastColor(profileCategory.color) === "#FFFFFF"
                          ? "invert(1)"
                          : "invert(0)"
                        : "none",
                    }}
                  />

                  <div
                    className="flex flex-col items-center justify-center self-center py-[18px] pb-[20px] space-y-3 px-[12px] rounded-[1px]"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      backgroundColor: profileCategory.color,
                      color: profileCategory ? getContrastColor(profileCategory.color) : "black",
                      maxHeight: "60px",
                      borderRadius: "8px",
                      minWidth: "200px",
                      width: "100%",
                    }}
                  >
                    <p className="text-[36px]" style={{ fontFamily: "Poppins" }}>
                      <strong>{profileCategory.category}</strong>
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 justify-between space-y-3"
                        style={{ marginTop: '10px' }}>
                     <div className="flex flex-col gap-2 p-4 rounded-[1px] border border-[#dddddd]  bg-white">
                         <p className="text-[24px]" style={{fontFamily: "Poppins"}}>
                            <strong>What does {profileCategory.category.split(' ')[1]} profile means</strong>
                         </p>
                         <span className="font-semibold text-gray-700" style={{marginTop: '10px'}}>{profileCategory.extended_description}</span>
                     </div>

                </div>


              </div>

          <div className="flex flex-col justify-between gap-4 pr-6 -5">
            <RadarChart strengths={strengths} color={profileCategory ? profileCategory.color : null} />
          </div>
            </div>

            {/* Second column */}
            <div className="flex flex-col gap-2 justify-between py-[18px] pb-[20px] space-y-3 px-[12px] rounded-[18px] border border-[#dddddd] bg-white">
                <p className="text-[24px]" style={{fontFamily: "Poppins"}}><strong>Key Personality { name ? `of ${name.split(' ')[0]}` : ''}</strong></p>
                    {strengths && Array.isArray(strengths) && strengths.map(({ strength_name }: any, index: number) => (
                      StrengthsIcons[strength_name] ? (
                        <div key={index} className="flex justify-between items-center cursor-pointer gap-2">
                          <div className="flex flex-row gap-3">
                            <span className="font-semibold text-gray-700"><strong><u>{strength_name}</u></strong>: {StrengthsIcons[strength_name].description}</span>
                          </div>
                        </div>
                      ): null
                    ))}
            </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProfileCategoryDialog;
