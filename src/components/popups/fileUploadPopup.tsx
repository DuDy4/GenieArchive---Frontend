import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const FileUploadDialog = ({
  anchorElPreferences,
  handleOpenPreferencesMenu,
  handleClosePreferencesMenu,
  setOpenFileUpload, // Prop from Footer to control FileUpload dialog
}) => {
    const { isAuthenticated, user } = useAuth0();
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);

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
        removeAllAddedStyles();
        }

    if (isDialogVisible && currentFrame === 1) {
        removeAllAddedStyles();
        const preferencesButton = document.getElementById('preferencesButton');
          if (preferencesButton) {

        handleOpenPreferencesMenu({ currentTarget: preferencesButton });

        // Wait for the preferences menu to render before applying the animation
        setTimeout(() => {
          const fileUploadButton = document.getElementById('file-upload-button');
          if (fileUploadButton) {
            console.log('Applying animation to file-upload-button');
            preferencesButton.style.animation = 'gold-ring-animation 1.5s infinite';

            fileUploadButton.style.animation = 'gold-rectangle-animation 1.5s infinite';
          } else {
            console.log('Could not find file-upload-button');
          }
        }, 100); // Small delay to ensure the element is rendered
      }
    }

    if (isDialogVisible && currentFrame === 2) {
      // First close the preferences menu
        setOpenFileUpload(true);


    }

    ;

  }, [currentFrame, isDialogVisible]);

    const removeAllAddedStyles = () => {
      const preferencesButton = document.getElementById('preferencesButton');
      if (preferencesButton) {
        preferencesButton.style.padding = '0';
        preferencesButton.style.animation = 'none';
        preferencesButton.removeEventListener('click', handleNextFrame);
      }

      const fileUploadButton = document.getElementById('file-upload-button');
      if (fileUploadButton) {
        fileUploadButton.style.animation = 'none';
      }


      setOpenFileUpload(false); // Close the FileUpload dialog
      handleClosePreferencesMenu();

      // Don't close preferences unless explicitly requested
      // handleClosePreferencesMenu();
    };

  const makeSureCalendarIsClosed = () => {
    localStorage.setItem("openCalendar", "false");
  };

  const handleNextFrame = () => {
    if (currentFrame < 2) {
      setCurrentFrame(currentFrame + 1);
    } else {
        localStorage.setItem(`hideFileUploadDialog_${user?.sub}`, 'true');
        removeAllAddedStyles();
      handleCloseDialog();
    }
  };

  const handlePreviousFrame = () => {
      if (currentFrame > 0) {
        setCurrentFrame(currentFrame - 1);
      }
    };

  const handleCloseDialog = () => {
    handleSkip();
    handleOpenPreferencesMenu({ currentTarget: document.getElementById('preferencesButton') });
    setOpenFileUpload(true);
  };

  const handleSkip = () => {
    setIsDialogVisible(false);
    removeAllAddedStyles(); // Close preferences menu if skipped
    localStorage.setItem(`hideFileUploadDialog_${user?.sub}`, 'true');
  };

  return (
    isDialogVisible && (
        <div className={`dialog-overlay${currentFrame === 2 ? " bottom" : ""}`}>
        <div className="dialog-content">
          <div className="dialog-body">
            {currentFrame === 0 && (
              <div className="flex flex-col justify-center items-center gap-4">
                <img src="/images/image9.png" style={{ width: "84px", height: "84px" }} alt="Welcome Icon" />
                <strong>Welcome to Genie!</strong>
                <p>
                  You’re logged in and all set to go! <br /><br />
                  Genie has created a calendar with all your upcoming meetings. Right now, it’s busy preparing detailed profiles for each person you’ll be meeting.
                </p>
              </div>
            )}
            {currentFrame === 1 && (
              <div className="flex flex-col items-center">
              <img width="100" height="100" src="https://img.icons8.com/bubbles/100/checked.png" alt="checked"/>
                <p>
                  <strong>Genie’s results are already impressive, but they can be even better.</strong><br /><br />
                  Genie excels at tailoring the sales process to your customer’s specific needs and preferences. <br /><br />
                  With a little more context, Genie can highlight the key details that will resonate most with your customer.
                </p>
              </div>
            )}
            {currentFrame === 2 && (
              <div>
                <p>
                  In the "File Upload" section, you can upload PDF, PowerPoint or Word documents containing relevant information that you want Genie to consider.
                </p>
              </div>
            )}
          </div>

          <div className="dialog-footer">
            {currentFrame > 0 && <button onClick={handleSkip}>Skip</button>}


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
