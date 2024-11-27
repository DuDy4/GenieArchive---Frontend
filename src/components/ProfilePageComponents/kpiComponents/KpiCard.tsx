import React, { useState } from 'react';

interface KpiCardProps {
  icon: string;
  title: string;
  description: string;
  percentage: string;
  onClick?: () => void;
}

const KpiCard: React.FC<KpiCardProps> = ({ icon, title, description, percentage, onClick }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleCardClick = () => {
    setIsClicked(!isClicked); // Toggle the clicked state
    console.log(isClicked ? `Unclicked: ${title}` : `Clicked: ${title}`);
    if (onClick) onClick();
  };
    const handleHoverActionItem = (title: string) => {
        console.log(`Hovered over: ${title}`);
    }

    const handleUnhoverActionItem = (title: string) => {
        console.log(`Unhovered: ${title}`);
    }

    const handleClickActionItem = (title: string) => {
        console.log(`Card clicked: ${title}`);
        if (onClick) onClick();
    }

  return (
    <div
      className={`kpi-card ${isClicked ? 'clicked' : ''}`}
      onClick={handleCardClick}
      onMouseEnter={handleHoverActionItem}
      onMouseLeave={handleUnhoverActionItem}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
      }}
    >
      <div
        className="icon"
        style={{
          flex: '0 0 48px',
          height: '48px',
          width: '48px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img src={icon} alt={`${title} icon`} style={{ height: '100%', width: '100%' }} />
      </div>
      <div className="content" style={{ flex: '1', marginLeft: '16px' }}>
        <h3 className="title" style={{ fontSize: '16px', margin: '0 0 8px' }}>{title}</h3>
        <p className="description" style={{ fontSize: '14px', margin: 0 }}>{description}</p>
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
        <span>{percentage}</span>
      </div>
    </div>
  );
};

export default KpiCard;
