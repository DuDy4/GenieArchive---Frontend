import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Link,
  Tooltip,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import { Launch } from '@mui/icons-material';
import iconRoutes from '../utils/iconRoutes.json';
import ImageGalleryDialog from './ProfileDetailsComponents/ImageGalleryDialog';

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
  linkedinUrls: string[];
}

const SocialMediaFeed: React.FC<SocialMediaFeedProps> = ({ news, name, linkedinUrls }) => {
  const [open, setOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [sortMethod, setSortMethod] = useState<'date' | 'relevancy'>('date'); // State for sorting method

  console.log('linkedinUrls', linkedinUrls);

  const profileLinkedinUrl = linkedinUrls.find((url) => url.platform.toLowerCase() === 'linkedin')?.url;

  console.log('profileLinkedinUrl', profileLinkedinUrl);

  const normalizeUrl = (url: string | undefined | null) =>
    typeof url === 'string' ? url.replace(/^https?:\/\/(www\.)?/, '') : '';

  const handleOpen = (images: string[], index: number) => {
    setSelectedImages(images);
    setSelectedImageIndex(index);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePrevious = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : selectedImages.length - 1));
  };

  const handleNext = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex < selectedImages.length - 1 ? prevIndex + 1 : 0));
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

  // Sort posts by the selected method
  const sortedNews = [...news].sort((a, b) => {
    if (sortMethod === 'date') {
      return new Date(b.date).getTime() - new Date(a.date).getTime(); // Sort by date (newest first)
    }
    if (sortMethod === 'relevancy') {
        const ninetyDaysAgo = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);

        const categorizePost = (post: NewsItem) => {
          const postDate = new Date(post.date);
          const isRecent = postDate > ninetyDaysAgo;
          const isOriginal = normalizeUrl(profileLinkedinUrl) === normalizeUrl(post.reshared);

          if (isOriginal && isRecent) return 1;
          if (!isOriginal && isRecent) return 2;
          if (isOriginal && !isRecent) return 3;
          if (!isOriginal && !isRecent) return 4;
          return 5;
        };

        const categoryA = categorizePost(a);
        const categoryB = categorizePost(b);

        if (categoryA !== categoryB) {
          return categoryA - categoryB;
        }

        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    return 0;
  });

  return (
    <div
      style={{
        overflowY: 'auto',
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: 'white',
      }}
    >
      {/* Sorting Options */}
      <FormControl sx={{ marginBottom: 2, width: '30%', paddingLeft: '10px', alignSelf: 'start', display: 'flex', flexDirection:'row', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', textWrap: 'nowrap', color: '#757575'}}>Sort by:</div>

        <Select
          value={sortMethod}
          onChange={(e) => setSortMethod(e.target.value as 'date' | 'relevancy')}
           sx={{
              border: '0.5px solid #e0e0e0',
              borderRadius: '4px',
                    padding: '4px 8px', // Reduce padding
                    fontSize: '0.875rem', // Optional: adjust font size for a smaller appearance
                    height: '32px', // Optional: explicitly set the height
            }}
        >
          <MenuItem value="date" >Date</MenuItem>
          <MenuItem value="relevancy">Relevancy</MenuItem>
        </Select>
      </FormControl>

      {/* Display Posts */}
      {sortedNews.map((post, index) => (
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
                {post.reshared &&
                  !(normalizeUrl(profileLinkedinUrl) === normalizeUrl(post.reshared)) &&
                  `${name.split(' ')[0]} reshared this post`}
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
            <br/>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: '5px',
              }}
            >

              {post.images &&
                post.images.map((image, idx) => (
                  <img
                    key={idx}
                    src={image}
                    alt="post"
                    style={{
                      width: post.images.length === 1 ? '100%' : '49%',
                      cursor: 'pointer',
                      height: post.images.length === 1 ? '100%' : '49%',
                      objectFit: 'cover',
                    }}
                    onClick={() => handleOpen(post.images!, idx)}
                  />
                ))}
            </div>
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

      {/* Use the ImageGalleryDialog Component */}
      <ImageGalleryDialog
        open={open}
        images={selectedImages}
        selectedIndex={selectedImageIndex}
        onClose={handleClose}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />
    </div>
  );
};

export default SocialMediaFeed;
