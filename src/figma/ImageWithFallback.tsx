import { useState, useEffect } from 'react';
import { Box, Skeleton, Text } from '@mantine/core';
import { IconPhoto } from '@tabler/icons-react';

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
  fallbackSrc = 'https://images.unsplash.com/photo-1603796846097-bee99e4a601f',
  onError,
  onLoad,
  loading = 'lazy',
  width = '100%',
  height = '100%',
  objectFit = 'cover',
  showLoading = true,
  errorComponent,
  fallbackComponent,
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

  if (hasError && errorComponent) {
    return <Box className={className}>{errorComponent}</Box>;
  }

  if (hasError) {
    return (
      <Box
        className={className}
        w={width}
        h={height}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          backgroundColor: '#f5f5f5',
          borderRadius: 8,
          border: '1px dashed #ccc',
          gap: 6,
        }}
      >
        <IconPhoto size={32} color="#999" />
        <Text size="xs" c="dimmed" ta="center">
          {alt || 'Image not available'}
        </Text>
      </Box>
    );
  }

  return (
    <Box
      className={className}
      w={width}
      h={height}
      pos="relative"
      style={{
        overflow: 'hidden',
        borderRadius: style?.borderRadius ?? 0,
      }}
    >
      {isLoading && showLoading && (
        <Skeleton
          w="100%"
          h="100%"
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: style?.borderRadius ?? 0,
          }}
        />
      )}

      <img
        src={imageSrc}
        alt={alt}
        loading={loading}
        draggable={false}
        onError={handleError}
        onLoad={handleLoad}
        style={{
          width: '100%',
          height: '100%',
          objectFit,
          display: isLoading ? 'none' : 'block',
          ...style,
        }}
      />

      {isLoading && fallbackComponent && (
        <Box
          pos="absolute"
          inset={0}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f5f5f5',
          }}
        >
          {fallbackComponent}
        </Box>
      )}
    </Box>
  );
}

/* ---------------- Utilities ---------------- */

export function generatePlaceholderImage(
  width = 400,
  height = 300,
  text = 'Document Preview'
) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#667eea');
  gradient.addColorStop(1, '#764ba2');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = '#ffffff';
  ctx.font = `${Math.min(width, height) / 10}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, width / 2, height / 2);

  ctx.strokeStyle = 'rgba(255,255,255,0.3)';
  ctx.lineWidth = 2;
  ctx.strokeRect(10, 10, width - 20, height - 20);

  return canvas.toDataURL('image/png');
}

export function useImageLoader(src: string) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    const img = new Image();
    img.src = src;
    img.onload = () => setIsLoading(false);
    img.onerror = () => {
      setIsLoading(false);
      setHasError(true);
    };
  }, [src]);

  return { isLoading, hasError };
}

export default ImageWithFallback;
