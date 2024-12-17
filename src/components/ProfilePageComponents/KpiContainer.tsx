import React from 'react';
import KpiCard from './KpiCard';
import { Dialog } from '@mui/material';
import FileUpload from '../file-upload';

interface KpiContainerProps {
  kpi?: string;
  actionItems?: any[];
    handleHoveredScores: (criteria: string, percentage?: number) => void;
    handleUnhoveredScores: (criteria: string) => void;
    handleClickedScores: (criteria: string, percentage: number) => void;
    handleUnclickedScores: (criteria: string) => void;
    handleNewActionItemDescription: (criteria: string, description: string) => void;
}

const KpiContainer = ({kpi, actionItems,
    handleHoveredScores,
     handleUnhoveredScores,
      handleClickedScores,
       handleUnclickedScores,
       handleNewActionItemDescription}) => {
  const sortedActionItems = actionItems
    ? [...actionItems].sort((a, b) => b.score - a.score)
    : [];

    const [openFileUpload, setOpenFileUpload] = React.useState(false);
    const shouldShowFileUploadAlert = false;

  return (
    <div className="kpi-section">
        {kpi && <div className="kpi-card-no-hover" style={{height: 'fit-content', minHeight: '50px'}}>
            <p className="kpi-title"><strong>Meeting KPI</strong>: {kpi}</p>
        </div> }
      <div className="kpi-cards">
        {sortedActionItems && sortedActionItems.map((actionItem, index) => (
          <KpiCard
            key={index}
            title={actionItem.title}
            description={actionItem.action_item}
            percentage={actionItem.score}
            criteria={actionItem.criteria}
            icon={actionItem.icon}
            handleHoveredScores={handleHoveredScores}
            handleUnhoveredScores={handleUnhoveredScores}
            handleClickedScores={handleClickedScores}
            handleUnclickedScores={handleUnclickedScores}
            handleNewActionItemDescription={handleNewActionItemDescription}
          />
        ))}
      </div>
        {shouldShowFileUploadAlert &&
            <>
            <div className="kpi-warning" onClick={() => setOpenFileUpload(true)} style={{cursor: "pointer"}}>
          <img src="https://img.icons8.com/color-glass/48/break.png" alt="idea icon" style={{width: "34px", height:"34px", alignSelf: "center"}} />
          <p style={{ fontSize: '14px', color: '#666'}}>
            If you want more specific suggestions, consider uploading more data about your product and/or company.
          </p>
        </div>
        <Dialog
            open={openFileUpload}
            onClose={() => setOpenFileUpload(false)}
            fullWidth // Ensures the dialog uses the maximum available width
            maxWidth="md" // Sets the max width, you can try "lg" or "xl" as well depending on how wide you want
            sx={{ width: '90%', position: 'fixed', minHeight: '100px' }} // Use 90% of the screen width
          >
            <FileUpload onClose={() => setOpenFileUpload(false)}/>
          </Dialog>
          </>}
    </div>
  );
};

export default KpiContainer;
