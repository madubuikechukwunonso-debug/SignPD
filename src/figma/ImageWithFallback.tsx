import React, { useState, useEffect } from 'react';
import { Box, Skeleton } from '@mui/material';
import { Image as ImageIcon } from 'lucide-react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  style?: React.CSSProperties;
  className?: string;
  fallbackSrc?: string;
  onError?: () => void;
  onLoad?: () => void;
  loading?: 'lazy' | 'eager';
  width?: number | string;
  height?: number | string;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  showLoading?: boolean;
  errorComponent?: React.ReactNode;
  fallbackComponent?: React.ReactNode;
}

export function ImageWithFallback({
  src,
  alt,
  style,
  className,
  fallbackSrc = 'https://images.unsplash.com/photo-1603796846097-bee99e4a601f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2N1bWVudCUyMHNpZ25pbmd8ZW58MXx8fHwxNzY3NTU0OTQ4fDA&ixlib=rb-4.1.0&q=80&w=1080',
  onError,
  onLoad,
  loading = 'lazy',
  width,
  height,
  objectFit = 'cover',
  showLoading = true,
  errorComponent,
  fallbackComponent
}: ImageWithFallbackProps) {
  const [imageSrc, setImageSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(showLoading);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setImageSrc(src);
    setIsLoading(showLoading);
    setHasError(false);
  }, [src, showLoading]);

  const handleError = () => {
    if (imageSrc !== fallbackSrc) {
      setImageSrc(fallbackSrc);
    } else {
      setHasError(true);
    }
    setIsLoading(false);
    onError?.();
  };

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const imageStyle: React.CSSProperties = {
    width: width || '100%',
    height: height || '100%',
    objectFit,
    display: isLoading || hasError ? 'none' : 'block',
    ...style
  };

  if (hasError && errorComponent) {
    return <Box className={className}>{errorComponent}</Box>;
  }

  if (hasError && !errorComponent) {
    return (
      <Box
        className={className}
        sx={{
          width: width || '100%',
          height: height || '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f0f0f0',
          borderRadius: 2,
          border: '1px dashed #ccc',
          flexDirection: 'column',
          gap: 1
        }}
      >
        <ImageIcon size={32} color="#999" />
        <span style={{ color: '#666', fontSize: '12px', textAlign: 'center' }}>
          {alt || 'Image not available'}
        </span>
      </Box>
    );
  }

  return (
    <Box
      className={className}
      sx={{
        position: 'relative',
        width: width || '100%',
        height: height || '100%',
        overflow: 'hidden',
        borderRadius: style?.borderRadius || 0
      }}
    >
      {isLoading && showLoading && (
        <Skeleton
          variant="rectangular"
          width={width || '100%'}
          height={height || '100%'}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            borderRadius: style?.borderRadius || 0
          }}
        />
      )}
      
      <img
        src={imageSrc}
        alt={alt}
        style={imageStyle}
        loading={loading}
        onError={handleError}
        onLoad={handleLoad}
        draggable="false"
      />

      {isLoading && fallbackComponent && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f5f5f5'
          }}
        >
          {fallbackComponent}
        </Box>
      )}
    </Box>
  );
}

// Utility function to generate placeholder images
export function generatePlaceholderImage(width: number = 400, height: number = 300, text: string = 'Document Preview') {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  
  if (ctx) {
    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#667eea');
    gradient.addColorStop(1, '#764ba2');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    // Add text
    ctx.fillStyle = 'white';
    ctx.font = `${Math.min(width, height) / 10}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, width / 2, height / 2);
    
    // Add border
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 2;
    ctx.strokeRect(10, 10, width - 20, height - 20);
  }
  
  return canvas.toDataURL('image/png');
}

// Hook for image loading state
export function useImageLoader(src: string) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    const img = new Image();
    img.src = src;
    img.onload = () => {
      setIsLoading(false);
    };
    img.onerror = () => {
      setIsLoading(false);
      setHasError(true);
    };
  }, [src]);

  return { isLoading, hasError };
}

// Default export
export default ImageWithFallback;
