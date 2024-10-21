import React from 'react';
import { Dialog, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface ImageGalleryDialogProps {
  open: boolean;
  images: string[];
  selectedIndex: number;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

const ImageGalleryDialog: React.FC<ImageGalleryDialogProps> = ({
  open,
  images,
  selectedIndex,
  onClose,
  onPrevious,
  onNext
}) => {
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
          position: 'relative',
        },
      }}
    >
      {/* Close Button */}
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{ position: 'absolute', right: 8, top: 8, color: 'white' }}
      >
        <CloseIcon />
      </IconButton>

      {/* Arrow for Previous Image */}
      <IconButton
        aria-label="previous"
        onClick={onPrevious}
        sx={{
          position: 'fixed',
          left: 8,
          top: '50%',
          color: 'white',
          zIndex: 10,
          transform: 'translateY(-50%)',
        }}
      >
        <ArrowBackIosIcon />
      </IconButton>

      {/* Image Display */}
      <img
        src={images[selectedIndex]}
        alt="Selected post"
        style={{ width: '100%', objectFit: 'contain' }}
      />

      {/* Arrow for Next Image */}
      <IconButton
        aria-label="next"
        onClick={onNext}
        sx={{
          position: 'fixed',
          right: 8,
          top: '50%',
          color: 'white',
          zIndex: 10,
          transform: 'translateY(-50%)',
        }}
      >
        <ArrowForwardIosIcon />
      </IconButton>
    </Dialog>
  );
};

export default ImageGalleryDialog;
