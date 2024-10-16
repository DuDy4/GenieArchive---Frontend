import React, { useState } from 'react';
import { Dialog, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface ImageGalleryDialogProps {
  images: string[];
  open: boolean;
  initialIndex: number;
  onClose: () => void;
}

const ImageGalleryDialog: React.FC<ImageGalleryDialogProps> = ({
  images,
  open,
  initialIndex,
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  console.log("Images", images, "Current Index", currentIndex, "Initial Index", initialIndex);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      sx={{
        '& .MuiDialog-paper': {
          backgroundColor: 'transparent',
          boxShadow: 'none',
          padding: 0,
        },
      }}
    >
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{ position: 'absolute', right: 8, top: 8, color: 'white' }}
      >
        <CloseIcon />
      </IconButton>

      {images.length > 1 && (
        <>
          <IconButton
            aria-label="previous"
            onClick={handlePrev}
            sx={{ position: 'absolute', left: 8, top: '50%', color: 'white' }}
          >
            <ArrowBackIosNewIcon />
          </IconButton>

          <IconButton
            aria-label="next"
            onClick={handleNext}
            sx={{ position: 'absolute', right: 8, top: '50%', color: 'white' }}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </>
      )}

      <img
        src={images[currentIndex]}
        alt="Selected post"
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        onError={(e) => {
          e.target.src = '/images/anonymous-user-8-1'; // replace with a placeholder or default image
          console.error('Image failed to load, possibly due to expired URL.');
        }}
      />
    </Dialog>
  );
};

export default ImageGalleryDialog;
