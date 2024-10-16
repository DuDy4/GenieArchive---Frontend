import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Link,
  Tooltip,
  Dialog,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Launch } from '@mui/icons-material';
import iconRoutes from '../utils/iconRoutes.json';

interface NewsItem {
  date: string;
  link: string;
  media: string;
  title: string;
  summary: string | null;
  text: string | null;
  images?: string[];
  likes: number;
  reshared?: boolean;
}

interface SocialMediaFeedProps {
  news: NewsItem[];
  name: string;
}

const SocialMediaFeed: React.FC<SocialMediaFeedProps> = ({ news, name }) => {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleOpen = (image: string) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage(null);
  };

  const parseText = (text: string | null) => {
    if (!text) return null;
    return text
      .replace(/(?:https?|ftp):\/\/[\n\S]+/g, '') // Remove URLs
      .split('\n')
      .map((sentence, index) => (
        <span key={index}>
          {sentence}
          <br />
        </span>
      ));
  };

  return (
    <div
      style={{
        overflowY: 'auto',
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
      }}
    >
      {news.map((post, index) => (
        <Card
          key={index}
          sx={{
            marginBottom: 2,
            boxShadow: 3,
            borderRadius: 2,
            backgroundColor: '#fff',
            minWidth: '85%',
            maxWidth: '85%',
            alignSelf: 'center',
            padding: '10px',
          }}
        >
          <CardContent>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img
                  src={iconRoutes[post.media.toLowerCase()]}
                  alt={post.media}
                  style={{ height: '20px', width: '20px' }}
                />
                {post.reshared ? `${name.split(' ')[0]} reshared this post` : null}
              </div>
              <Typography variant="caption" color="text.secondary">
                {new Date(post.date).toLocaleDateString()}
              </Typography>
            </div>

            <hr style={{ border: '1px solid #e0e0e0', margin: '10px 0' }} />

            {(post.text || post.title) && (
              <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
                {parseText(post.text || post.title)}
              </Typography>
            )}
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: '5px',
              }}
            >
              {post.images &&
                post.images.slice(0, 4).map((image, idx) => (
                  <div
                    key={idx}
                    style={{
                      flex: '1 1 calc(25% - 10px)', // Ensures each image takes up a quarter of the row with some spacing
                      height: '150px',
                      position: 'relative',
                      cursor: 'pointer',
                      overflow: 'hidden',
                    }}
                    onClick={() => handleOpen(post.images!, idx)}
                  >
                    <img
                      src={image}
                      alt="post"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                    {post.images.length > 4 && idx === 3 && (
                      <div
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          backgroundColor: 'rgba(0, 0, 0, 0.5)',
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '24px',
                        }}
                      >
                        +{post.images.length - 4}
                      </div>
                    )}
                  </div>
                ))}
            </div>

            {/* Dialog for Image Display */}
            <Dialog
              open={open}
              onClose={handleClose}
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
                onClick={handleClose}
                sx={{ position: 'absolute', right: 8, top: 8, color: 'white' }}
              >
                <CloseIcon />
              </IconButton>
              {selectedImage && (
                <img
                  src={selectedImage}
                  alt="Selected post"
                  style={{ width: '100%', objectFit: 'contain' }}
                />
              )}
            </Dialog>
          </CardContent>

          <hr style={{ border: '0.5px solid #e0e0e0', margin: '5px 0' }} />

          <CardActions sx={{ justifyContent: 'space-between' }}>
            <Typography variant="body2" color="text.secondary">
              {post.likes} likes
            </Typography>
            <Link
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              underline="none"
              sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}
            >
              <Tooltip title="See original post" arrow placement="top">
                <Launch color="action" />
              </Tooltip>
            </Link>
          </CardActions>
        </Card>
      ))}
    </div>
  );
};

export default SocialMediaFeed;
