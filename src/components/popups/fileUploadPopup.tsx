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
      localStorage.removeItem(`hideFileUploadDialog_${user?.sub}`);
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
      if (preferencesButton) {
//         preferencesButton.style.padding = '5px';
        preferencesButton.style.animation = 'gold-ring-animation 1.5s infinite';
        preferencesButton.addEventListener('click', handleNextFrame);
      }
    }

    if (isDialogVisible && currentFrame === 2) {
      removeAllAddedStyles();
      const preferencesButton = document.getElementById('preferencesButton');
      if (preferencesButton) {
        handleOpenPreferencesMenu({ currentTarget: preferencesButton });

        // Wait for the preferences menu to render before applying the animation
        setTimeout(() => {
          const fileUploadButton = document.getElementById('file-upload-button');
          if (fileUploadButton) {
            console.log('Applying animation to file-upload-button');
            fileUploadButton.style.animation = 'gold-rectangle-animation 1.5s infinite';
          } else {
            console.log('Could not find file-upload-button');
          }
        }, 100); // Small delay to ensure the element is rendered
      }
    }

    if (isDialogVisible && currentFrame === 3) {
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
    if (currentFrame < 3) {
      setCurrentFrame(currentFrame + 1);
    } else {
        localStorage.setItem(`hideFileUploadDialog_${user?.sub}`, 'true');
      handleCloseDialog();
    }
  };

  const handlePreviousFrame = () => {
      if (currentFrame > 0) {
        setCurrentFrame(currentFrame - 1);
      }
    };

  const handleCloseDialog = () => {
    setIsDialogVisible(false);
    handleClosePreferencesMenu(); // Close preferences menu when the dialog closes
  };

  const handleSkip = () => {
    setIsDialogVisible(false);
    removeAllAddedStyles(); // Close preferences menu if skipped
    localStorage.setItem(`hideFileUploadDialog_${user?.sub}`, 'true');

  };

  return (
    isDialogVisible && (
        <div className={`dialog-overlay${currentFrame === 3 ? " bottom" : ""}`}>
        <div className="dialog-content">
          <div className="dialog-body">
          {currentFrame === 0 && (
              <div className="flex flex-col justify-center items-center gap-4">

                <img src="/images/image9.png" style={{width: "84px", height: "84px"}} /><strong>Hey there!</strong>
                 <p>To work some real magic, Genie needs a little help from you.
                 Upload a few sales docs so Genie can get to know your product better.<br/><br/>
                The more it knows, the smarter it gets – and that means better insights for you. Let’s make your deals shine!
                </p>
                </div>)}
            {currentFrame === 1 && (
              <div>
                <p>
                  Our system specializes in hyper-personalizing your sales and figuring out who you're meeting.
                  <br />
                  But it can be better. It could give more precise results, tailor-made to your company.
                </p>
              </div>
            )}
            {currentFrame === 2 && (
              <div>
                <p>
                  We made it possible for you to upload files about your company, and we will use AI to implement it
                  into Genie's results.
                </p>
              </div>
            )}
            {currentFrame === 3 && (
              <div>
                <p>
                  In the file upload section, you can insert PDF, Powerpoint, Word, and other files containing relevant
                  data you want the Genie to know.
                </p>
              </div>
            )}
          </div>
          <div className="dialog-footer">
            {currentFrame > 0 && <button onClick={handleSkip}>Skip</button>}
            <button onClick={handlePreviousFrame} disabled={currentFrame === 0}>
              Back
            </button>

            <button onClick={handleNextFrame}>
              {currentFrame < 3 ? 'Next' : 'Finish'}
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default FileUploadDialog;
