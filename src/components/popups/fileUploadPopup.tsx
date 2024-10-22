import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const FileUploadDialog = ({ anchorElPreferences, handleOpenPreferencesMenu, handleClosePreferencesMenu }) => {
  const { isAuthenticated, user } = useAuth0();
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  useEffect(() => {
    const dialogPreference = localStorage.getItem(`hideFileUploadDialog_${user?.sub}`);
    if (!dialogPreference && isAuthenticated) {
      setIsDialogVisible(true);
      makeSureCalendarIsClosed();
    }

    return () => {
      removeAllAddedStyles(); // Clean up styles on unmount
    };
  }, [isAuthenticated, user]);

  useEffect(() => {
    const preferencesButton = document.getElementById('preferencesButton');

    if (isDialogVisible && currentFrame === 0) {
      if (preferencesButton) {
        preferencesButton.style.padding = '5px';
        preferencesButton.style.animation = 'gold-ring-animation 1.5s infinite';
        preferencesButton.addEventListener('click', handleNextFrame);
      }
    }

    if (isDialogVisible && currentFrame === 1) {
        removeAllAddedStyles();
      if (preferencesButton) {
        handleOpenPreferencesMenu({ currentTarget: preferencesButton });
      }
    }

    return () => {
      if (preferencesButton) {
        preferencesButton.removeEventListener('click', handleNextFrame);
      }
    };
  }, [currentFrame, isDialogVisible]);

  const removeAllAddedStyles = () => {
    const preferencesButton = document.getElementById('preferencesButton');
    if (preferencesButton) {
      preferencesButton.style.padding = '0';
      preferencesButton.style.animation = 'none';
      preferencesButton.removeEventListener('click', handleNextFrame);
    }
  };

  const makeSureCalendarIsClosed = () => {
    localStorage.setItem("openCalendar", "false");
  };

  const handleNextFrame = () => {
    if (currentFrame < 2) {
      setCurrentFrame(currentFrame + 1);
    } else {
      handleCloseDialog();
    }
  };

  const handleCloseDialog = () => {
    if (dontShowAgain) {
      localStorage.setItem(`hideFileUploadDialog_${user?.sub}`, 'true');
    }
    setIsDialogVisible(false);
    handleClosePreferencesMenu(); // Close preferences menu when the dialog closes
  };

  const handleSkip = () => {
    setIsDialogVisible(false);
    handleClosePreferencesMenu(); // Close preferences menu if skipped
  };

  return (
    isDialogVisible && (
      <div className="dialog-overlay">
        <div className="dialog-content">
          <div className="dialog-body">
            {currentFrame === 0 && (
              <div>
                <p>
                  Our system specializes in hyper-personalizing your sales and figuring out who you're meeting.
                  <br />
                  But it can be better. It could give more precise results, tailor-made to your company.
                </p>
              </div>
            )}
            {currentFrame === 1 && (
              <div>
                <p>
                  We made it possible for you to upload files about your company, and we will use AI to implement it
                  into Genie's results.
                </p>
              </div>
            )}
            {currentFrame === 2 && (
              <div>
                <p>
                  In the file upload section, you can insert PDF, Powerpoint, Word, and other files containing relevant
                  data you want the Genie to know.
                </p>
              </div>
            )}
          </div>
          <div className="dialog-footer">
            <label>
              <input
                type="checkbox"
                checked={dontShowAgain}
                onChange={(e) => setDontShowAgain(e.target.checked)}
              />
              Don't show this again
            </label>
            <button onClick={handleSkip}>Skip for now</button>
            <button onClick={handleNextFrame}>
              {currentFrame < 2 ? 'Next' : 'Finish'}
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default FileUploadDialog;
