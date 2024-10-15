// SocialMediaFeed.tsx
import React, {useState} from 'react';
import { Card, CardContent, CardActions, Typography, Button, Link, Tooltip, Dialog, DialogContent, DialogTitle,
    IconButton } from '@mui/material';
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
}

interface SocialMediaFeedProps {
  news: NewsItem[];
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

    const parseText = (text: string) => {
      return text
        .replace(/(?:https?|ftp):\/\/[\n\S]+/g, '') // Remove URLs
        .split('\n') // Split by ". "
        .map((sentence, index) => (
          <span key={index}>
            {sentence}
            <br/>
          </span>
        ));
    };
  return (
    <div style={{  overflowY: 'auto', padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      {news.map((post, index) => (
        <Card
          key={index}
          sx={{ marginBottom: 2, boxShadow: 3, borderRadius: 2, backgroundColor: '#fff', maxWidth: '70%', alignSelf: 'center' }}
        >
          <CardContent>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: "10px"}}>
            <img src={iconRoutes[post.media.toLowerCase()]} alt={post.media} style={{ height: '20px', width: '20px' }} />
            {post.reshared ? `${name.split(' ')[0]} reshared this post` : null}
            </div>
            <Typography variant="caption" color="text.secondary">
              {new Date(post.date).toLocaleDateString()}
            </Typography>
            </div>
            <hr style={{ border: '1px solid #e0e0e0', margin: '10px 0' }} />

            <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
              {parseText(post.text)}
            </Typography>
            {post.images && post.images.map((image, idx) => (
                <img
                  key={idx}
                  src={image}
                  alt="post"
                  style={{ width: '100%', marginTop: '10px', cursor: 'pointer' }}
                  onClick={() => handleOpen(image)}
                />
              ))}

              {/* Dialog for Image Display */}
              <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                  <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{ position: 'absolute', right: 8, top: 8 }}
                  >
                    <CloseIcon />
                  </IconButton>
                  {selectedImage && (
                    <img
                      src={selectedImage}
                      alt="Selected post"
                      style={{ width: '100%' }}
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
                <Tooltip
                  title="See original post"
                  arrow
                  placement="top"
                >
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
