import React, { useState } from "react";
import { Dialog, DialogContent, IconButton, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
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

const StrengthDrawer = ({ strengths }) => (
  <div className="w-full border rounded-lg p-4 bg-white shadow-md">
    <h3 className="text-lg font-bold mb-4">Top 5 Strengths</h3>
    {strengths.map((strength, index) => (
      <Accordion key={index}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <strong>{strength.name}</strong>
        </AccordionSummary>
        <AccordionDetails>
          <p>{strength.reasoning}</p>
        </AccordionDetails>
      </Accordion>
    ))}
  </div>
);

const InfoCard = ({ title, content }) => (
  <div className="flex flex-col border rounded-lg p-4 bg-white shadow-md w-full">
    <h3 className="text-lg font-bold mb-2">{title}</h3>
    <p className="text-sm text-gray-700">{content}</p>
  </div>
);

const ProfileCategory: React.FC<ProfileCategoryProps> = ({ tenantId, uuid }) => {
  const { data, isLoading, error } = useStrengthsAndCategories(tenantId, uuid);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleDialogOpen = () => setIsDialogOpen(true);
  const handleDialogClose = () => setIsDialogOpen(false);

  const { profile_category, strengths } = data;
  const profilesExplanation = profile_category?.explanation || {};

  const cards = [
    { title: "Characteristics", content: profilesExplanation.characteristics },
    { title: "Needs", content: profilesExplanation.needs },
    { title: "Recommendations", content: profilesExplanation.recommendations },
  ];

  return (
    <>
      <div className="flex flex-col items-center gap-2 rounded-lg cursor-pointer hover:shadow-md" onClick={handleDialogOpen}>
        <img src={profile_category.icon} alt={profile_category.category} className="w-16 h-16" />
        <h2 className="text-lg font-semibold">{profile_category.category}</h2>
        <p className="text-sm text-center text-gray-600">{profile_category.description}</p>
      </div>

      <Dialog open={isDialogOpen} onClose={handleDialogClose} maxWidth="lg" fullWidth>
        <DialogContent className="flex flex-col gap-4 p-6 bg-gray-100">
          {/* Close Button */}
          <IconButton
            aria-label="close"
            onClick={handleDialogClose}
            className="absolute right-4 top-4"
          >
            <CloseIcon />
          </IconButton>

          {/* First Row */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* Strengths Drawer */}
            <StrengthDrawer strengths={strengths} />
            {/* Radar Chart */}
            <div className="flex-1 border rounded-lg p-4 bg-white shadow-md">
              <h3 className="text-lg font-bold mb-4 text-center">Spider Chart</h3>
              <RadarChart uuid={uuid} strengths={strengths} />
            </div>
            {/* Plain Text */}
            <div className="flex-1 border rounded-lg p-4 bg-white shadow-md">
              <h3 className="text-lg font-bold mb-4">Additional Information</h3>
              <p className="text-sm text-gray-700">This section will be filled later.</p>
            </div>
          </div>

          {/* Second Row */}
          <div className="flex flex-col md:flex-row gap-4">
            {cards.map((card, index) => (
              <InfoCard key={index} title={card.title} content={card.content} />
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProfileCategory;
