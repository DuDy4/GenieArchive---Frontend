import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Link,
  Tooltip,
} from '@mui/material';
import { Launch } from '@mui/icons-material';
import iconRoutes from '../utils/iconRoutes.json';
import ImageGalleryDialog from './ImageGalleryDialog'; // Import the new component

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
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [initialIndex, setInitialIndex] = useState(0);

  const handleOpen = (images: string[], index: number) => {
    setSelectedImages(images);
    setInitialIndex(index);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImages([]);
    setInitialIndex(0);
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
                {post.text || post.title}
              </Typography>
            )}

            {post.images && (
              <div style={{ display: 'flex', gap: '5px', marginTop: '10px' }}>
                {post.images.slice(0, 2).map((image, idx) => (
                  <img
                    key={idx}
                    src={image}
                    alt="post"
                    style={{ width: '24%', cursor: 'pointer' }}
                    onClick={() => handleOpen(post.images!, idx)}
                  />
                ))}
                {post.images.length > 2 && post.images.slice(2, 3).map((image, idx) => (
                     <img
                       key={idx}
                       src={image}
                       alt="post"
                       style={{ width: '24%', cursor: 'pointer' }}
                       onClick={() => handleOpen(post.images!, idx)}
                     />
                   ))}
                {post.images.length > 4 && (
                  <div
                    style={{
                      width: '24%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#00000099',
                      color: 'white',
                      fontSize: '24px',
                      cursor: 'pointer',
                    }}
                    onClick={() => handleOpen(post.images!, 4)}
                  >
                    +{post.images.length - 4}
                  </div>
                )}
              </div>
            )}

            <ImageGalleryDialog
              images={selectedImages}
              open={open}
              initialIndex={initialIndex}
              onClose={handleClose}
            />
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
