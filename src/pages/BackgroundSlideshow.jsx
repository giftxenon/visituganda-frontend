// src/components/BackgroundSlideshow.jsx

import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';

const SlideshowContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: -1, // Ensures the slideshow stays behind content
  overflow: 'hidden',
  opacity: 0.9,
}));

const Slide = styled(Box)(({ image, isActive }) => ({
  backgroundImage: `url(${image})`,
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  opacity: isActive ? 1 : 0,
  transition: 'opacity 1.5s ease-in-out',
}));

const BackgroundSlideshow = ({ images, interval = 5000 }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    // Preload images to prevent flickering
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images, interval]);

  return (
    <SlideshowContainer>
      {images.map((image, index) => (
        <Slide key={index} image={image} isActive={index === current} />
      ))}
    </SlideshowContainer>
  );
};

BackgroundSlideshow.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  interval: PropTypes.number,
};

export default BackgroundSlideshow;
