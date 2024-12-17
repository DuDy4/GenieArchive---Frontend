import React, { useState } from 'react';
import { useToken } from '../../providers/TokenProvider';

interface KpiCardProps {
  icon: string;
  title: string;
  description: string;
  percentage: string;
  criteria: string;
  handleHoveredScores: (criteria: string, percentage?: number) => void;
  handleUnhoveredScores: (criteria: string) => void;
  handleClickedScores: (criteria: string, percentage: number) => void;
  handleUnclickedScores: (criteria: string) => void;
  handleNewActionItemDescription: (criteria: string, description: string) => void;
}

const formatCriteriaName = (criteria: string): string =>
  criteria
    .toLowerCase()
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

const KpiCard: React.FC<KpiCardProps> = ({
  icon,
  title,
  description,
  percentage,
  criteria,
  handleHoveredScores,
  handleUnhoveredScores,
  handleClickedScores,
  handleUnclickedScores,
  handleNewActionItemDescription,
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(description);
  const { isAdmin } = useToken();

  const handleCardClick = () => {
    setIsClicked(!isClicked);
    if (isClicked) {
      handleUnclickedScores(criteria);
    } else {
      handleClickedScores(criteria, parseInt(percentage));
    }
  };

  const handleHoveredActionItem = () => {
    handleHoveredScores(criteria, parseInt(percentage));
  };

  const handleUnhoveredActionItem = () => {
    handleUnhoveredScores(criteria);
  };

  const handleSave = async () => {
    try {
        if (isAdmin){
            const response = await handleNewActionItemDescription(criteria, editedDescription);
            console.log('Response:', response);
          if (!response) {
            throw new Error('Failed to save description');
          }


          setIsEditing(false); // Exit editing mode
          }
        } catch (error) {
          console.error('Error updating description:', error);
        }
  };

  return (
    <div
      className={`kpi-card ${isClicked ? 'clicked' : ''}`}
      title={criteria ? formatCriteriaName(criteria) : ''}
      onClick={handleCardClick}
      onMouseEnter={handleHoveredActionItem}
      onMouseLeave={handleUnhoveredActionItem}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
        width: '100%',
      }}
    >
      <div
        className="icon"
        style={{
          flex: '0 0 48px',
          height: '48px',
          width: '48px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img src={icon} alt={`${title} icon`} style={{ height: '100%' }} />
        <div className="text-center" style={{ fontSize: criteria === 'RESPONSIVENESS' ? 'smaller' : 'small' }}>
          <strong>{criteria ? formatCriteriaName(criteria) : ''}</strong>
        </div>
      </div>

      <div className="content" style={{ flex: '1', marginLeft: '16px' }}>
        <h3 className="title" style={{ fontSize: '16px', margin: '0 0 8px' }}>{title}</h3>
        {isAdmin && isEditing ? (
          <div>
            <textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              style={{ width: '100%', fontSize: '14px', margin: '0 0 8px' }}
            />
            <button onClick={handleSave} style={{ marginRight: '8px' }}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        ) : (
          <p
            className="description"
            style={{ fontSize: '14px', margin: 0, position: 'relative' }}
          >
            {editedDescription}
            {isAdmin && (
              <button
                onClick={() => setIsEditing(true)}
                style={{
                  position: 'absolute',
                  right: 0,
                  top: 0,
                  fontSize: '12px',
                  cursor: 'pointer',
                  background: 'none',
                  border: 'none',
                  color: 'blue',
                }}
              >
                Edit
              </button>
            )}
          </p>
        )}
      </div>

      <div
        className="percentage"
        style={{
          flex: '0 0 48px',
          height: '48px',
          width: '48px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '50%',
          fontWeight: 'bold',
          fontSize: '16px',
        }}
      >
        <span>+{percentage}%</span>
      </div>
    </div>
  );
};

export default KpiCard;
