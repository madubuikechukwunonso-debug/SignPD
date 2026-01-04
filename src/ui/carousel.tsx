import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  IconButton,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Rating,
  Stack,
  Button,
  Avatar,
  AvatarGroup,
  LinearProgress,
  alpha,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Download,
  Eye,
  ShoppingCart,
  Heart,
  Share2,
  Users,
  Calendar,
  FileText,
  TrendingUp,
  Award,
  Zap,
  Clock,
  CheckCircle
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CarouselItem {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  rating: number;
  price: number;
  downloads: number;
  author: string;
  authorAvatar: string;
  tags: string[];
  featured?: boolean;
  trending?: boolean;
  new?: boolean;
  fileSize?: string;
  format?: string[];
  reviews?: number;
  createdAt?: string;
}

interface CarouselProps {
  items: CarouselItem[];
  title?: string;
  subtitle?: string;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showControls?: boolean;
  showIndicators?: boolean;
  showProgress?: boolean;
  itemsPerView?: number;
  height?: number;
  variant?: 'default' | 'featured' | 'minimal' | 'card-stack';
  onItemClick?: (item: CarouselItem) => void;
  onAddToCart?: (item: CarouselItem) => void;
  onAddToWishlist?: (item: CarouselItem) => void;
  onShare?: (item: CarouselItem) => void;
}

export const Carousel: React.FC<CarouselProps> = ({
  items,
  title = 'Featured Templates',
  subtitle = 'Discover our most popular and trending document templates',
  autoPlay = false,
  autoPlayInterval = 5000,
  showControls = true,
  showIndicators = true,
  showProgress = false,
  itemsPerView = 1,
  height = 400,
  variant = 'default',
  onItemClick,
  onAddToCart,
  onAddToWishlist,
  onShare
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [cart, setCart] = useState<number[]>([]);

  // Responsive items per view
  const getItemsPerView = useCallback(() => {
    if (isMobile) return 1;
    if (isTablet) return Math.min(2, itemsPerView);
    return itemsPerView;
  }, [isMobile, isTablet, itemsPerView]);

  const effectiveItemsPerView = getItemsPerView();
  const maxIndex = Math.max(0, items.length - effectiveItemsPerView);

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || items.length <= effectiveItemsPerView) return;

    const interval = setInterval(() => {
      handleNext();
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, items.length, effectiveItemsPerView, currentIndex]);

  // Progress bar animation
  useEffect(() => {
    if (!showProgress || !autoPlay) return;

    setProgress(0);
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + (100 / (autoPlayInterval / 100));
      });
    }, 100);

    return () => clearInterval(progressInterval);
  }, [currentIndex, autoPlay, autoPlayInterval, showProgress]);

  const handlePrevious = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    setProgress(0);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    setProgress(0);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const handleIndicatorClick = (index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setProgress(0);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const toggleWishlist = (itemId: number) => {
    setWishlist(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
    const item = items.find(i => i.id === itemId);
    if (item) onAddToWishlist?.(item);
  };

  const toggleCart = (itemId: number) => {
    setCart(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
    const item = items.find(i => i.id === itemId);
    if (item) onAddToCart?.(item);
  };

  const getStatusChip = (item: CarouselItem) => {
    if (item.featured) {
      return (
        <Chip
          icon={<Award size={14} />}
          label="Featured"
          size="small"
          sx={{
            background: 'linear-gradient(135deg, #ffd89b 0%, #19547b 100%)',
            color: 'white',
            fontWeight: 600
          }}
        />
      );
    }
    if (item.trending) {
      return (
        <Chip
          icon={<TrendingUp size={14} />}
          label="Trending"
          size="small"
          sx={{
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            color: 'white',
            fontWeight: 600
          }}
        />
      );
    }
    if (item.new) {
      return (
        <Chip
          icon={<Zap size={14} />}
          label="New"
          size="small"
          sx={{
            background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
            color: 'white',
            fontWeight: 600
          }}
        />
      );
    }
    return null;
  };

  const renderCarouselItem = (item: CarouselItem, index: number) => {
    const isActive = index >= currentIndex && index < currentIndex + effectiveItemsPerView;
    
    return (
      <Box
        key={item.id}
        sx={{
          flex: `0 0 ${100 / effectiveItemsPerView}%`,
          px: 1,
          transform: isTransitioning && !isActive ? 'scale(0.95)' : 'scale(1)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          opacity: isActive ? 1 : 0.6,
        }}
      >
        <Card
          elevation={0}
          sx={{
            height: height,
            borderRadius: 4,
            border: '1px solid',
            borderColor: 'divider',
            background: 'white',
            transition: 'all 0.3s ease',
            cursor: onItemClick ? 'pointer' : 'default',
            '&:hover': {
              transform: 'translateY(-8px)',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
              borderColor: '#667eea',
            },
            ...(variant === 'card-stack' && !isActive && {
              transform: 'scale(0.9) translateY(20px)',
              opacity: 0.5,
            }),
          }}
          onClick={() => onItemClick?.(item)}
        >
          <CardMedia
            component="div"
            sx={{
              height: variant === 'minimal' ? 200 : 250,
              position: 'relative',
              overflow: 'hidden',
              borderRadius: '16px 16px 0 0'
            }}
          >
            <ImageWithFallback
              src={item.image}
              alt={item.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            
            {/* Overlay with status chips */}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.3) 100%)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                p: 2
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Chip
                  label={item.category}
                  size="small"
                  sx={{
                    background: 'rgba(255,255,255,0.9)',
                    backdropFilter: 'blur(10px)',
                    fontWeight: 600
                  }}
                />
                <Stack direction="row" spacing={0.5}>
                  {getStatusChip(item)}
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(item.id);
                    }}
                    sx={{
                      background: 'rgba(255,255,255,0.9)',
                      '&:hover': { background: 'white' },
                      color: wishlist.includes(item.id) ? '#f44336' : '#666'
                    }}
                  >
                    <Heart size={14} fill={wishlist.includes(item.id) ? '#f44336' : 'none'} />
                  </IconButton>
                </Stack>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Avatar
                  src={item.authorAvatar}
                  alt={item.author}
                  sx={{ width: 32, height: 32, border: '2px solid white' }}
                />
                <Typography variant="body2" sx={{ color: 'white', fontWeight: 600 }}>
                  {item.author}
                </Typography>
              </Box>
            </Box>
          </CardMedia>

          <CardContent sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, lineHeight: 1.3 }}>
              {item.title}
            </Typography>
            
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mb: 2,
                flexGrow: 1,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}
            >
              {item.description}
            </Typography>

            {/* Rating and Stats */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Rating value={item.rating} precision={0.1} readOnly size="small" />
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {item.rating}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                ({item.reviews} reviews)
              </Typography>
              <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Download size={14} />
                <Typography variant="caption" sx={{ fontWeight: 600 }}>
                  {item.downloads.toLocaleString()}
                </Typography>
              </Box>
            </Box>

            {/* Tags */}
            <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
              {item.tags.slice(0, 2).map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  size="small"
                  sx={{
                    fontSize: '0.7rem',
                    background: alpha('#667eea', 0.1),
                    color: '#667eea'
                  }}
                />
              ))}
            </Stack>

            {/* File Info */}
            {(item.fileSize || item.format) && (
              <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                {item.fileSize && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <FileText size={14} />
                    <Typography variant="caption" sx={{ fontWeight: 600 }}>
                      {item.fileSize}
                    </Typography>
                  </Box>
                )}
                {item.format && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <CheckCircle size={14} />
                    <Typography variant="caption" sx={{ fontWeight: 600 }}>
                      {item.format.join(', ')}
                    </Typography>
                  </Box>
                )}
              </Stack>
            )}

            {/* Price and Actions */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                ${item.price}
              </Typography>
              
              <Stack direction="row" spacing={1}>
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleCart(item.id);
                  }}
                  sx={{
                    background: cart.includes(item.id) ? '#667eea' : alpha('#667eea', 0.1),
                    color: cart.includes(item.id) ? 'white' : '#667eea',
                    '&:hover': {
                      background: cart.includes(item.id) ? '#5568d3' : alpha('#667eea', 0.2)
                    }
                  }}
                >
                  <ShoppingCart size={16} />
                </IconButton>
                
                <Button
                  variant="contained"
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    onShare?.(item);
                  }}
                  startIcon={<Share2 size={16} />}
                  sx={{
                    borderRadius: 2,
                    fontWeight: 600,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #5568d3 0%, #6b4190 100%)'
                    }
                  }}
                >
                  Share
                </Button>
              </Stack>
            </Box>
          </CardContent>
        </Card>
      </Box>
    );
  };

  return (
    <Box sx={{ width: '100%', position: 'relative' }}>
      {/* Header Section */}
      {(title || subtitle) && (
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 1
            }}
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="body1" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        </Box>
      )}

      {/* Progress Bar */}
      {showProgress && autoPlay && (
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 4,
            borderRadius: 2,
            mb: 3,
            background: alpha('#667eea', 0.1),
            '& .MuiLinearProgress-bar': {
              background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
              borderRadius: 2
            }
          }}
        />
      )}

      {/* Carousel Container */}
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 4,
          background: 'white',
          border: '1px solid',
          borderColor: 'divider',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)'
        }}
      >
        {/* Controls */}
        {showControls && items.length > effectiveItemsPerView && (
          <>
            <IconButton
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              sx={{
                position: 'absolute',
                left: 16,
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 2,
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                '&:hover': { background: 'white' },
                '&:disabled': { opacity: 0.5 }
              }}
            >
              <ChevronLeft size={24} />
            </IconButton>
            
            <IconButton
              onClick={handleNext}
              disabled={currentIndex === maxIndex}
              sx={{
                position: 'absolute',
                right: 16,
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 2,
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                '&:hover': { background: 'white' },
                '&:disabled': { opacity: 0.5 }
              }}
            >
              <ChevronRight size={24} />
            </IconButton>
          </>
        )}

        {/* Carousel Track */}
        <Box
          sx={{
            display: 'flex',
            transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            transform: `translateX(-${(currentIndex * 100) / effectiveItemsPerView}%)`,
            py: 2
          }}
        >
          {items.map((item, index) => renderCarouselItem(item, index))}
        </Box>
      </Box>

      {/* Indicators */}
      {showIndicators && items.length > effectiveItemsPerView && (
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 3 }}>
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <IconButton
              key={index}
              onClick={() => handleIndicatorClick(index)}
              sx={{
                p: 0.5,
                borderRadius: '50%',
                background: index === currentIndex
                  ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                  : 'rgba(0, 0, 0, 0.1)',
                '&:hover': {
                  background: index === currentIndex
                    ? 'linear-gradient(135deg, #5568d3 0%, #6b4190 100%)'
                    : 'rgba(0, 0, 0, 0.2)'
                }
              }}
            >
              <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: 'white' }} />
            </IconButton>
          ))}
        </Box>
      )}
    </Box>
  );
};

// Usage examples:
export const FeaturedTemplatesCarousel = () => {
  const featuredItems: CarouselItem[] = [
    {
      id: 1,
      title: 'Executive Resume Template',
      description: 'Premium ATS-optimized resume template with modern design',
      image: 'https://images.unsplash.com/photo-1603796846097-bee99e4a601f?w=400',
      category: 'Resume',
      rating: 4.9,
      price: 19.99,
      downloads: 3247,
      author: 'Sarah Johnson',
      authorAvatar: 'https://i.pravatar.cc/150?img=1',
      tags: ['ATS-friendly', 'Executive'],
      featured: true,
      fileSize: '2.4 MB',
      format: ['DOCX', 'PDF'],
      reviews: 127,
      createdAt: '2024-01-15'
    },
    {
      id: 2,
      title: 'Corporate Contract Bundle',
      description: 'Comprehensive legal contract templates for business',
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400',
      category: 'Legal',
      rating: 4.8,
      price: 29.99,
      downloads: 1892,
      author: 'Mike Chen',
      authorAvatar: 'https://i.pravatar.cc/150?img=2',
      tags: ['Legal', 'Business'],
      trending: true,
      fileSize: '5.8 MB',
      format: ['DOCX', 'PDF'],
      reviews: 89,
      createdAt: '2024-01-10'
    },
    {
      id: 3,
      title: 'Financial Dashboard Template',
      description: 'Professional Excel templates for financial analysis',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400',
      category: 'Finance',
      rating: 4.7,
      price: 24.99,
      downloads: 4134,
      author: 'Emily Davis',
      authorAvatar: 'https://i.pravatar.cc/150?img=3',
      tags: ['Finance', 'Excel'],
      new: true,
      fileSize: '1.2 MB',
      format: ['XLSX', 'Google Sheets'],
      reviews: 203,
      createdAt: '2024-01-08'
    }
  ];

  return (
    <Carousel
      items={featuredItems}
      title="Featured Templates"
      subtitle="Handpicked premium templates for your business needs"
      autoPlay={true}
      autoPlayInterval={6000}
      itemsPerView={3}
      height={450}
      variant="featured"
      showProgress={true}
      onItemClick={(item) => console.log('View template:', item.title)}
      onAddToCart={(item) => console.log('Add to cart:', item.title)}
      onAddToWishlist={(item) => console.log('Add to wishlist:', item.title)}
      onShare={(item) => console.log('Share:', item.title)}
    />
  );
};

export default Carousel;
