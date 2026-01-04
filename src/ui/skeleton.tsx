
import React, { useState, useRef, useEffect, useCallback, forwardRef, useImperativeHandle } from 'react';
import {
  Box,
  Paper,
  Card,
  CardContent,
  Stack,
  Chip,
  Badge,
  alpha,
  useTheme,
  useMediaQuery,
  Fade,
  Zoom,
  Slide,
  Grow,
  IconButton,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  Divider,
  Grid,
  Tooltip,
  LinearProgress,
  CircularProgress
} from '@mui/material';
import {
  Loader,
  Loader2,
  RefreshCw,
  RotateCcw,
  RotateCw,
  Zap,
  Activity,
  Clock,
  Calendar,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Grid,
  Grid3x3,
  List,
  Image,
  FileText,
  File,
  Folder,
  User,
  Users,
  Home,
  Settings,
  SlidersHorizontal,
  MoreVertical,
  MoreHorizontal,
  ExternalLink,
  Share2,
  Save,
  Download,
  Upload,
  Search,
  Filter,
  SortAsc,
  SortDesc,
  Plus,
  Minus,
  X,
  Check,
  CheckCircle,
  AlertTriangle,
  Info,
  HelpCircle,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Key,
  Shield,
  ShieldCheck,
  ShieldAlert,
  Verified,
  Star,
  Award,
  Trophy,
  Medal,
  Certificate,
  GraduationCap,
  Database,
  Server,
  Cloud,
  CloudUpload,
  CloudDownload,
  Wifi,
  WifiOff,
  Bluetooth,
  BluetoothOff,
  USB,
  Hdmi,
  Display,
  Monitor,
  Smartphone,
  Tablet,
  Laptop,
  Desktop,
  Print,
  Scanner,
  Camera,
  Video,
  Music,
  Play,
  Pause,
  Stop,
  SkipForward,
  SkipBack,
  Rewind,
  FastForward,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Radio,
  Tv,
  Cast,
  Airplay,
  Chromecast,
  DollarSign,
  Percent,
  Hash,
  AtSign,
  Paperclip,
  Maximize2,
  Minimize2,
  Expand,
  Compress,
  ZoomIn,
  ZoomOut,
  Move,
  MousePointer,
  GripVertical,
  GripHorizontal
} from 'lucide-react';

export type SkeletonVariant = 'text' | 'rectangular' | 'circular' | 'rounded' | 'avatar' | 'button' | 'chip' | 'card' | 'list-item' | 'table-row' | 'chart' | 'icon' | 'custom';
export type SkeletonSize = 'tiny' | 'small' | 'medium' | 'large' | 'extra-large' | 'auto';
export type SkeletonColor = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'gradient' | 'custom';
export type SkeletonAnimation = 'pulse' | 'wave' | 'shimmer' | 'bounce' | 'fade' | 'slide' | 'rotate' | 'custom' | 'none';
export type SkeletonShape = 'rectangle' | 'square' | 'circle' | 'oval' | 'rounded' | 'pill' | 'custom';
export type SkeletonPattern = 'solid' | 'striped' | 'dotted' | 'gradient' | 'glass' | 'enterprise';

export interface SkeletonProps {
  // Core props
  variant?: SkeletonVariant;
  shape?: SkeletonShape;
  size?: SkeletonSize;
  color?: SkeletonColor;
  customColor?: string;
  
  // Dimensions
  width?: number | string;
  height?: number | string;
  minWidth?: number | string;
  maxWidth?: number | string;
  minHeight?: number | string;
  maxHeight?: number | string;
  aspectRatio?: number;
  responsive?: boolean;
  
  // Animation
  animation?: SkeletonAnimation;
  animated?: boolean;
  animationDuration?: number;
  animationDelay?: number;
  animationEasing?: string;
  animationIteration?: number | 'infinite';
  animationDirection?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
  animationFillMode?: 'none' | 'forwards' | 'backwards' | 'both';
  
  // Pattern and styling
  pattern?: SkeletonPattern;
  gradientColors?: [string, string, ...string[]];
  gradientDirection?: 'horizontal' | 'vertical' | 'diagonal' | 'radial';
  gradientIntensity?: number;
  glassEffect?: boolean;
  glassOpacity?: number;
  glassBlur?: number;
  shadow?: boolean;
  shadowColor?: string;
  shadowBlur?: number;
  shadowOffset?: [number, string];
  shadowSpread?: number;
  shadowIntensity?: 'light' | 'medium' | 'strong' | 'enterprise';
  
  // Border and radius
  borderRadius?: number;
  borderWidth?: number;
  borderColor?: string;
  borderStyle?: 'solid' | 'dashed' | 'dotted' | 'double' | 'none';
  
  // Content simulation
  simulateContent?: boolean;
  contentType?: 'text' | 'image' | 'avatar' | 'button' | 'icon' | 'chart' | 'table' | 'card' | 'list' | 'custom';
  contentLines?: number;
  contentWordsPerLine?: number[];
  showAvatar?: boolean;
  showActions?: boolean;
  showMetadata?: boolean;
  showDivider?: boolean;
  
  // Layout
  layout?: 'horizontal' | 'vertical' | 'grid' | 'flex' | 'custom';
  spacing?: number | string;
  alignment?: 'left' | 'center' | 'right' | 'justify' | 'stretch';
  distribution?: 'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly';
  
  // Groups and collections
  count?: number;
  groupSpacing?: number | string;
  groupAlignment?: 'horizontal' | 'vertical' | 'grid' | 'masonry';
  groupColumns?: number;
  groupRows?: number;
  staggered?: boolean;
  staggerDelay?: number;
  
  // Interactive features
  interactive?: boolean;
  clickable?: boolean;
  hoverable?: boolean;
  hoverEffect?: 'grow' | 'shrink' | 'glow' | 'pulse' | 'custom';
  onClick?: () => void;
  onHover?: () => void;
  onLeave?: () => void;
  
  // Performance
  lazy?: boolean;
  lazyOffset?: number;
  debounce?: number;
  throttle?: number;
  optimize?: boolean;
  virtualize?: boolean;
  bufferSize?: number;
  
  // State management
  loading?: boolean;
  error?: boolean;
  empty?: boolean;
  disabled?: boolean;
  visible?: boolean;
  mounted?: boolean;
  
  // Enterprise features
  enterprise?: boolean;
  showMetrics?: boolean;
  metrics?: {
    renderTime?: number;
    animationTime?: number;
    interactionCount?: number;
    visibilityRatio?: number;
  };
  showQuickStats?: boolean;
  quickStats?: Array<{
    label: string;
    value: string | number;
    icon?: React.ReactNode;
    trend?: 'up' | 'down' | 'stable';
  }>;
  showPerformanceData?: boolean;
  performanceData?: {
    fps?: number;
    renderTime?: number;
    paintTime?: number;
    layoutTime?: number;
  };
  showProgress?: boolean;
  progress?: number;
  progressText?: string;
  
  // Accessibility
  ariaLabel?: string;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
  role?: string;
  focusable?: boolean;
  tabIndex?: number;
  
  // Special modes
  preview?: boolean;
  previewMode?: 'loading' | 'error' | 'empty' | 'disabled' | 'custom';
  skeleton?: boolean;
  darkMode?: boolean;
  highContrast?: boolean;
  reducedMotion?: boolean;
  
  // Custom rendering
  renderSkeleton?: (props: SkeletonProps, index: number) => React.ReactNode;
  renderContent?: (props: SkeletonProps, index: number) => React.ReactNode;
  renderMetrics?: () => React.ReactNode;
  renderQuickStats?: () => React.ReactNode;
  
  // Styling overrides
  containerSx?: any;
  skeletonSx?: any;
  contentSx?: any;
  metricsSx?: any;
  
  // Class names
  className?: string;
  skeletonClassName?: string;
  contentClassName?: string;
  metricsClassName?: string;
  
  // Style overrides
  style?: React.CSSProperties;
  skeletonStyle?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
  metricsStyle?: React.CSSProperties;
}

interface SkeletonState {
  isVisible: boolean;
  isAnimating: boolean;
  isInteractive: boolean;
  isLoading: boolean;
  isError: boolean;
  isEmpty: boolean;
  metricsVisible: boolean;
  quickStatsVisible: boolean;
  performanceVisible: boolean;
}

interface SkeletonMetrics {
  renderTime: number;
  animationTime: number;
  interactionCount: number;
  visibilityRatio: number;
}

// Enterprise color schemes
const getEnterpriseColors = (color: SkeletonColor) => {
  const colors = {
    default: {
      main: '#e0e0e0',
      light: '#f5f5f5',
      dark: '#bdbdbd',
      gradient: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)',
      background: 'rgba(224, 224, 224, 0.1)',
      hover: 'rgba(224, 224, 224, 0.2)',
      shadow: 'rgba(224, 224, 224, 0.3)'
    },
    primary: {
      main: '#e3f2fd',
      light: '#bbdefb',
      dark: '#90caf9',
      gradient: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
      background: 'rgba(227, 242, 253, 0.1)',
      hover: 'rgba(227, 242, 253, 0.2)',
      shadow: 'rgba(227, 242, 253, 0.3)'
    },
    secondary: {
      main: '#fce4ec',
      light: '#f8bbd9',
      dark: '#f48fb1',
      gradient: 'linear-gradient(135deg, #fce4ec 0%, #f8bbd9 100%)',
      background: 'rgba(252, 228, 236, 0.1)',
      hover: 'rgba(252, 228, 236, 0.2)',
      shadow: 'rgba(252, 228, 236, 0.3)'
    },
    success: {
      main: '#e8f5e8',
      light: '#c8e6c9',
      dark: '#a5d6a7',
      gradient: 'linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%)',
      background: 'rgba(232, 245, 232, 0.1)',
      hover: 'rgba(232, 245, 232, 0.2)',
      shadow: 'rgba(232, 245, 232, 0.3)'
    },
    warning: {
      main: '#fff3e0',
      light: '#ffe0b2',
      dark: '#ffcc02',
      gradient: 'linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)',
      background: 'rgba(255, 243, 224, 0.1)',
      hover: 'rgba(255, 243, 224, 0.2)',
      shadow: 'rgba(255, 243, 224, 0.3)'
    },
    error: {
      main: '#ffebee',
      light: '#ffcdd2',
      dark: '#ef9a9a',
      gradient: 'linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%)',
      background: 'rgba(255, 235, 238, 0.1)',
      hover: 'rgba(255, 235, 238, 0.2)',
      shadow: 'rgba(255, 235, 238, 0.3)'
    },
    info: {
      main: '#e1f5fe',
      light: '#b3e5fc',
      dark: '#81d4fa',
      gradient: 'linear-gradient(135deg, #e1f5fe 0%, #b3e5fc 100%)',
      background: 'rgba(225, 245, 254, 0.1)',
      hover: 'rgba(225, 245, 254, 0.2)',
      shadow: 'rgba(225, 245, 254, 0.3)'
    },
    gradient: {
      main: '#667eea',
      light: '#764ba2',
      dark: '#5a67d8',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      background: 'rgba(102, 126, 234, 0.1)',
      hover: 'rgba(102, 126, 234, 0.2)',
      shadow: 'rgba(102, 126, 234, 0.3)'
    },
    custom: {
      main: '#e0e0e0',
      light: '#f5f5f5',
      dark: '#bdbdbd',
      gradient: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)',
      background: 'rgba(224, 224, 224, 0.1)',
      hover: 'rgba(224, 224, 224, 0.2)',
      shadow: 'rgba(224, 224, 224, 0.3)'
    }
  };
  return colors[color] || colors.default;
};

// Size mapping
const getSizeStyles = (size: SkeletonSize) => {
  const styles = {
    tiny: { width: 40, height: 16, fontSize: '10px' },
    small: { width: 80, height: 24, fontSize: '12px' },
    medium: { width: 120, height: 32, fontSize: '14px' },
    large: { width: 200, height: 48, fontSize: '16px' },
    'extra-large': { width: 300, height: 64, fontSize: '18px' },
    auto: { width: '100%', height: 'auto', fontSize: 'inherit' }
  };
  return styles[size] || styles.medium;
};

// Animation keyframes
const getAnimationKeyframes = (animation: SkeletonAnimation) => {
  const keyframes = {
    pulse: {
      '0%, 100%': { opacity: 1 },
      '50%': { opacity: 0.4 }
    },
    wave: {
      '0%': { backgroundPosition: '-200% 0' },
      '100%': { backgroundPosition: '200% 0' }
    },
    shimmer: {
      '0%': { transform: 'translateX(-100%)' },
      '100%': { transform: 'translateX(100%)' }
    },
    bounce: {
      '0%, 100%': { transform: 'translateY(0)' },
      '50%': { transform: 'translateY(-10px)' }
    },
    fade: {
      '0%': { opacity: 0 },
      '100%': { opacity: 1 }
    },
    slide: {
      '0%': { transform: 'translateX(-100%)' },
      '100%': { transform: 'translateX(0)' }
    },
    rotate: {
      '0%': { transform: 'rotate(0deg)' },
      '100%': { transform: 'rotate(360deg)' }
    }
  };

  return keyframes[animation] || keyframes.pulse;
};

// Pattern styles
const getPatternStyles = (pattern: SkeletonPattern, color: string) => {
  const styles = {
    solid: {
      backgroundColor: color
    },
    striped: {
      background: `repeating-linear-gradient(45deg, ${color}, ${color} 10px, ${alpha(color, 0.5)} 10px, ${alpha(color, 0.5)} 20px)`
    },
    dotted: {
      background: `radial-gradient(circle, ${color} 1px, transparent 1px)`,
      backgroundSize: '4px 4px'
    },
    gradient: {
      background: `linear-gradient(90deg, ${alpha(color, 0.1)}, ${color}, ${alpha(color, 0.1)})`
    },
    glass: {
      backgroundColor: alpha(color, 0.3),
      backdropFilter: 'blur(10px)',
      border: `1px solid ${alpha(color, 0.5)}`
    },
    enterprise: {
      background: `linear-gradient(135deg, ${alpha(color, 0.1)}, ${alpha(color, 0.3)}, ${alpha(color, 0.1)})`
    }
  };

  return styles[pattern] || styles.solid;
};

// Content simulation
const generateSimulatedContent = (type: string, lines: number, wordsPerLine: number[]) => {
  switch (type) {
    case 'text':
      return Array.from({ length: lines }, (_, i) => ({
        width: `${Math.random() * 40 + 60}%`,
        height: '16px',
        marginBottom: i < lines - 1 ? '8px' : '0'
      }));
    
    case 'avatar':
      return [{
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        marginRight: '12px'
      }];
    
    case 'button':
      return [{
        width: '120px',
        height: '36px',
        borderRadius: '8px'
      }];
    
    case 'icon':
      return [{
        width: '24px',
        height: '24px',
        borderRadius: '4px',
        marginRight: '8px'
      }];
    
    case 'chart':
      return Array.from({ length: 5 }, () => ({
        width: `${Math.random() * 30 + 20}%`,
        height: `${Math.random() * 40 + 60}px`,
        marginRight: '4px'
      }));
    
    case 'table':
      return Array.from({ length: 5 }, () => ({
        width: '100%',
        height: '48px',
        marginBottom: '4px'
      }));
    
    case 'card':
      return [{
        width: '100%',
        height: '200px',
        borderRadius: '12px',
        marginBottom: '16px'
      }];
    
    case 'list':
      return Array.from({ length: 3 }, () => ({
        width: '100%',
        height: '64px',
        marginBottom: '8px'
      }));
    
    default:
      return [{
        width: '100%',
        height: '32px',
        marginBottom: '8px'
      }];
  }
};

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>((props, ref) => {
  const {
    // Core props
    variant = 'rectangular',
    shape = 'rectangle',
    size = 'medium',
    color = 'default',
    customColor,
    
    // Dimensions
    width: propWidth,
    height: propHeight,
    minWidth,
    maxWidth,
    minHeight,
    maxHeight,
    aspectRatio,
    responsive = false,
    
    // Animation
    animation = 'pulse',
    animated = true,
    animationDuration = 1500,
    animationDelay = 0,
    animationEasing = 'ease-in-out',
    animationIteration = 'infinite',
    animationDirection = 'normal',
    animationFillMode = 'both',
    
    // Pattern and styling
    pattern = 'solid',
    gradientColors = ['#f5f5f5', '#e0e0e0', '#f5f5f5'],
    gradientDirection = 'horizontal',
    gradientIntensity = 1,
    glassEffect = false,
    glassOpacity = 0.3,
    glassBlur = 10,
    shadow = false,
    shadowColor = '#000',
    shadowBlur = 8,
    shadowOffset = [0, 4],
    shadowSpread = 0,
    shadowIntensity = 'medium',
    
    // Border and radius
    borderRadius = 4,
    borderWidth = 0,
    borderColor = 'transparent',
    borderStyle = 'none',
    
    // Content simulation
    simulateContent = false,
    contentType = 'text',
    contentLines = 3,
    contentWordsPerLine = [8, 12, 6],
    showAvatar = false,
    showActions = false,
    showMetadata = false,
    showDivider = false,
    
    // Layout
    layout = 'vertical',
    spacing = 2,
    alignment = 'left',
    distribution = 'start',
    
    // Groups and collections
    count = 1,
    groupSpacing = 2,
    groupAlignment = 'vertical',
    groupColumns = 1,
    groupRows = 1,
    staggered = false,
    staggerDelay = 100,
    
    // Interactive features
    interactive = false,
    clickable = false,
    hoverable = false,
    hoverEffect = 'grow',
    onClick,
    onHover,
    onLeave,
    
    // Performance
    lazy = false,
    lazyOffset = 50,
    debounce = 0,
    throttle = 16,
    optimize = false,
    virtualize = false,
    bufferSize = 5,
    
    // State management
    loading = true,
    error = false,
    empty = false,
    disabled = false,
    visible = true,
    mounted = true,
    
    // Enterprise features
    enterprise = false,
    showMetrics = false,
    metrics = {},
    showQuickStats = false,
    quickStats = [],
    showPerformanceData = false,
    performanceData = {},
    showProgress = false,
    progress = 0,
    progressText,
    
    // Accessibility
    ariaLabel = 'Loading content',
    ariaLabelledBy,
    ariaDescribedBy,
    role = 'status',
    focusable = false,
    tabIndex = -1,
    
    // Special modes
    preview = false,
    previewMode = 'loading',
    skeleton = true,
    darkMode = false,
    highContrast = false,
    reducedMotion = false,
    
    // Custom rendering
    renderSkeleton,
    renderContent,
    renderMetrics,
    renderQuickStats,
    
    // Styling overrides
    containerSx,
    skeletonSx,
    contentSx,
    metricsSx,
    
    // Class names
    className,
    skeletonClassName,
    contentClassName,
    metricsClassName,
    
    // Style overrides
    style,
    skeletonStyle,
    contentStyle,
    metricsStyle
  } = props;

  const [state, setState] = useState<SkeletonState>({
    isVisible: visible && mounted,
    isAnimating: animated,
    isInteractive: interactive,
    isLoading: loading,
    isError: error,
    isEmpty: empty,
    metricsVisible: showMetrics,
    quickStatsVisible: showQuickStats,
    performanceVisible: showPerformanceData
  });

  const skeletonRef = useRef<HTMLDivElement>(null);
  const intersectionRef = useRef<IntersectionObserver | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const colors = getEnterpriseColors(color);
  const sizeStyles = getSizeStyles(size);

  // Handle visibility changes
  useEffect(() => {
    if (lazy && skeletonRef.current) {
      intersectionRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setState(prev => ({ ...prev, isVisible: true }));
              intersectionRef.current?.disconnect();
            }
          });
        },
        { rootMargin: `${lazyOffset}px` }
      );

      intersectionRef.current.observe(skeletonRef.current);
    }

    return () => {
      intersectionRef.current?.disconnect();
    };
  }, [lazy, lazyOffset]);

  // Handle reduced motion
  useEffect(() => {
    if (reducedMotion) {
      setState(prev => ({ ...prev, isAnimating: false }));
    } else {
      setState(prev => ({ ...prev, isAnimating: animated }));
    }
  }, [reducedMotion, animated]);

  // Handle click interactions
  const handleClick = () => {
    if (!clickable || disabled) return;
    
    if (onClick) onClick();
    
    // Add interaction to metrics
    if (showMetrics) {
      setState(prev => ({
        ...prev,
        metrics: {
          ...prev.metrics,
          interactionCount: (prev.metrics?.interactionCount || 0) + 1
        }
      }));
    }
  };

  const handleMouseEnter = () => {
    if (!hoverable || disabled) return;
    
    if (onHover) onHover();
  };

  const handleMouseLeave = () => {
    if (!hoverable || disabled) return;
    
    if (onLeave) onLeave();
  };

  // Get hover effects
  const getHoverStyles = () => {
    if (!state.isInteractive || disabled) return {};

    const effects = {
      grow: { transform: 'scale(1.02)' },
      shrink: { transform: 'scale(0.98)' },
      glow: { 
        boxShadow: `0 0 20px ${alpha(customColor || colors.main, 0.3)}`,
        filter: 'brightness(1.1)'
      },
      pulse: { 
        animation: 'pulse 1s infinite',
        '@keyframes pulse': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.7 }
        }
      },
      custom: {}
    };

    return effects[hoverEffect] || effects.custom;
  };

  const hoverStyles = getHoverStyles();

  // Get shadow styles
  const getShadowStyles = () => {
    if (!shadow) return {};

    const intensities = {
      light: `0 2px 4px ${alpha(shadowColor, 0.1)}`,
      medium: `0 4px 12px ${alpha(shadowColor, 0.15)}`,
      strong: `0 8px 24px ${alpha(shadowColor, 0.2)}`,
      enterprise: `${shadowOffset[0]}px ${shadowOffset[1]}px ${shadowBlur}px ${shadowSpread}px ${alpha(shadowColor, 0.25)}`
    };

    return { boxShadow: intensities[shadowIntensity] || intensities.medium };
  };

  const shadowStyles = getShadowStyles();

  // Get gradient styles
  const getGradientStyles = () => {
    if (pattern !== 'gradient' && !glassEffect) return {};

    if (glassEffect) {
      return {
        backgroundColor: alpha(customColor || colors.main, glassOpacity),
        backdropFilter: `blur(${glassBlur}px)`,
        border: `1px solid ${alpha(customColor || colors.main, 0.5)}`
      };
    }

    const directions = {
      horizontal: `linear-gradient(90deg, ${gradientColors.join(', ')})`,
      vertical: `linear-gradient(180deg, ${gradientColors.join(', ')})`,
      diagonal: `linear-gradient(45deg, ${gradientColors.join(', ')})`,
      radial: `radial-gradient(circle, ${gradientColors.join(', ')})`
    };

    return {
      background: directions[gradientDirection] || directions.horizontal,
      backgroundSize: '200% 100%',
      opacity: gradientIntensity
    };
  };

  const gradientStyles = getGradientStyles();

  // Get animation styles
  const getAnimationStyles = () => {
    if (!state.isAnimating || animation === 'none') return {};

    const baseAnimation = {
      animationDuration: `${animationDuration}ms`,
      animationDelay: `${animationDelay}ms`,
      animationTimingFunction: animationEasing,
      animationIterationCount: animationIteration,
      animationDirection: animationDirection,
      animationFillMode: animationFillMode
    };

    const animations = {
      pulse: {
        animationName: 'pulse',
        '@keyframes pulse': getAnimationKeyframes('pulse')
      },
      wave: {
        animationName: 'wave',
        background: `linear-gradient(90deg, transparent, ${alpha(customColor || colors.main, 0.3)}, transparent)`,
        backgroundSize: '200% 100%',
        '@keyframes wave': getAnimationKeyframes('wave')
      },
      shimmer: {
        animationName: 'shimmer',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(90deg, transparent, ${alpha(customColor || colors.main, 0.5)}, transparent)`,
          transform: 'translateX(-100%)',
          animation: `shimmer ${animationDuration}ms ${animationEasing} ${animationIteration} ${animationDirection} ${animationDelay}ms`
        },
        '@keyframes shimmer': getAnimationKeyframes('shimmer')
      },
      bounce: {
        animationName: 'bounce',
        '@keyframes bounce': getAnimationKeyframes('bounce')
      },
      fade: {
        animationName: 'fade',
        '@keyframes fade': getAnimationKeyframes('fade')
      },
      slide: {
        animationName: 'slide',
        '@keyframes slide': getAnimationKeyframes('slide')
      },
      rotate: {
        animationName: 'rotate',
        '@keyframes rotate': getAnimationKeyframes('rotate')
      },
      custom: {}
    };

    return {
      ...baseAnimation,
      ...animations[animation] || animations.custom
    };
  };

  const animationStyles = getAnimationStyles();

  // Get pattern styles
  const getPatternStyles = () => {
    return getPatternStyles(pattern, customColor || colors.main);
  };

  const patternStyles = getPatternStyles();

  // Get content simulation
  const getContentSimulation = () => {
    if (!simulateContent) return [];

    const contentElements = generateSimulatedContent(contentType, contentLines, contentWordsPerLine);
    
    if (showAvatar) {
      contentElements.unshift({
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        marginRight: '12px'
      });
    }

    return contentElements;
  };

  const contentSimulation = getContentSimulation();

  // Render individual skeleton
  const renderSingleSkeleton = (index: number) => {
    if (renderSkeleton) {
      return renderSkeleton(props, index);
    }

    const isStaggered = staggered && count > 1;
    const staggerDelayMs = isStaggered ? index * staggerDelay : 0;

    const baseStyles = {
      width: propWidth || sizeStyles.width,
      height: propHeight || sizeStyles.height,
      minWidth,
      maxWidth,
      minHeight,
      maxHeight,
      aspectRatio,
      borderRadius: shape === 'circle' ? '50%' : shape === 'pill' ? '24px' : `${borderRadius}px`,
      border: `${borderWidth}px ${borderStyle} ${borderColor}`,
      ...patternStyles,
      ...gradientStyles,
      ...shadowStyles,
      ...animationStyles,
      ...hoverStyles,
      cursor: clickable ? 'pointer' : 'default',
      transition: 'all 0.2s ease',
      animationDelay: `${animationDelay + staggerDelayMs}ms`,
      ...skeletonSx,
      ...skeletonStyle
    };

    return (
      <Box
        key={index}
        className={skeletonClassName}
        sx={baseStyles}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        role={role}
        aria-label={`${ariaLabel} ${index + 1}`}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
        tabIndex={focusable ? tabIndex : -1}
      >
        {/* Content simulation */}
        {contentSimulation.length > 0 && (
          <Stack direction="row" spacing={1} alignItems="center" sx={{ height: '100%' }}>
            {contentSimulation.map((element, idx) => (
              <Box
                key={idx}
                sx={{
                  width: element.width,
                  height: element.height,
                  borderRadius: element.borderRadius || '4px',
                  backgroundColor: alpha(customColor || colors.main, 0.3),
                  marginRight: element.marginRight || 0,
                  marginBottom: element.marginBottom || 0
                }}
              />
            ))}
          </Stack>
        )}

        {/* Progress indicator */}
        {showProgress && (
          <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
            <LinearProgress
              variant={progress ? 'determinate' : 'indeterminate'}
              value={progress}
              sx={{
                height: 2,
                backgroundColor: alpha(customColor || colors.main, 0.2),
                '& .MuiLinearProgress-bar': {
                  backgroundColor: customColor || colors.main
                }
              }}
            />
            {progressText && (
              <Typography
                variant="caption"
                sx={{
                  position: 'absolute',
                  right: 4,
                  bottom: -16,
                  color: customColor || colors.main,
                  fontSize: '10px'
                }}
              >
                {progressText}
              </Typography>
            )}
          </Box>
        )}
      </Box>
    );
  };

  // Render skeleton group
  const renderSkeletonGroup = () => {
    if (!state.isVisible || disabled) return null;

    const layoutStyles = {
      horizontal: { flexDirection: 'row' as const },
      vertical: { flexDirection: 'column' as const },
      grid: { 
        display: 'grid',
        gridTemplateColumns: `repeat(${groupColumns}, 1fr)`,
        gridTemplateRows: `repeat(${groupRows}, auto)`
      },
      flex: { display: 'flex', flexWrap: 'wrap', gap: spacing },
      custom: {}
    };

    const alignmentStyles = {
      left: { justifyContent: 'flex-start', alignItems: 'flex-start' },
      center: { justifyContent: 'center', alignItems: 'center' },
      right: { justifyContent: 'flex-end', alignItems: 'flex-end' },
      justify: { justifyContent: 'space-between', alignItems: 'center' },
      stretch: { justifyContent: 'stretch', alignItems: 'stretch' }
    };

    const distributionStyles = {
      start: { alignContent: 'flex-start' },
      center: { alignContent: 'center' },
      end: { alignContent: 'flex-end' },
      'space-between': { alignContent: 'space-between' },
      'space-around': { alignContent: 'space-around' },
      'space-evenly': { alignContent: 'space-evenly' }
    };

    return (
      <Box
        ref={skeletonRef}
        className={className}
        sx={{
          display: 'flex',
          flexDirection: groupAlignment === 'horizontal' ? 'row' : 'column',
          gap: groupSpacing,
          justifyContent: alignmentStyles[alignment]?.justifyContent,
          alignItems: alignmentStyles[alignment]?.alignItems,
          alignContent: distributionStyles[distribution],
          flexWrap: groupAlignment === 'flex' ? 'wrap' : 'nowrap',
          ...layoutStyles[layout],
          ...containerSx,
          ...style
        }}
      >
        {Array.from({ length: count }, (_, index) => (
          <Box key={index} sx={{ position: 'relative' }}>
            {renderSingleSkeleton(index)}
          </Box>
        ))}
      </Box>
    );
  };

  // Render metrics
  const renderMetricsComponent = () => {
    if (renderMetrics) return renderMetrics();

    return (
      <Box
        sx={{
          position: 'absolute',
          top: -8,
          right: -8,
          zIndex: 10
        }}
      >
        <Chip
          label={`${metrics.renderTime || 0}ms`}
          size="small"
          sx={{
            backgroundColor: alpha(customColor || colors.main, 0.9),
            color: 'white',
            fontSize: '10px',
            fontWeight: 600
          }}
        />
      </Box>
    );
  };

  // Render quick stats
  const renderQuickStatsComponent = () => {
    if (renderQuickStats) return renderQuickStats();

    return (
      <Box
        sx={{
          position: 'absolute',
          bottom: -48,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10
        }}
      >
        <Grid container spacing={0.5}>
          {quickStats.map((stat, index) => (
            <Grid item xs={12} key={index}>
              <Card elevation={0} sx={{ backgroundColor: alpha(colors.background, 0.9), borderRadius: 1 }}>
                <CardContent sx={{ p: 0.5, textAlign: 'center' }}>
                  <Stack spacing={0.5} alignItems="center">
                    <Box sx={{ color: colors.main }}>
                      {stat.icon}
                    </Box>
                    <Typography variant="caption" sx={{ fontWeight: 600, color: colors.main }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: '10px' }}>
                      {stat.label}
                    </Typography>
                    {stat.trend && (
                      <Box sx={{ color: stat.trend === 'up' ? '#4caf50' : stat.trend === 'down' ? '#f44336' : '#6c757d' }}>
                        {stat.trend === 'up' ? <TrendingUp size={12} /> : 
                         stat.trend === 'down' ? <TrendingDown size={12} /> : 
                         <Activity size={12} />}
                      </Box>
                    )}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };

  // Render performance data
  const renderPerformanceDataComponent = () => {
    return (
      <Box
        sx={{
          position: 'absolute',
          top: -32,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10
        }}
      >
        <Typography variant="caption" sx={{ color: colors.main, fontWeight: 600 }}>
          FPS: {performanceData.fps || 60} | Render: {performanceData.renderTime || 0}ms
        </Typography>
      </Box>
    );
  };

  // Handle different states
  if (!state.isLoading && !preview) {
    return (
      <Box
        ref={skeletonRef}
        className={contentClassName}
        sx={{
          width: propWidth || sizeStyles.width,
          height: propHeight || sizeStyles.height,
          ...contentSx,
          ...contentStyle
        }}
      >
        {renderContent ? renderContent(props, 0) : children}
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: propWidth || sizeStyles.width,
          height: propHeight || sizeStyles.height,
          backgroundColor: alpha('#f44336', 0.1),
          borderRadius: `${borderRadius}px`,
          ...contentSx,
          ...contentStyle
        }}
      >
        <AlertTriangle size={24} color="#f44336" />
      </Box>
    );
  }

  if (empty) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: propWidth || sizeStyles.width,
          height: propHeight || sizeStyles.height,
          backgroundColor: alpha(colors.main, 0.1),
          borderRadius: `${borderRadius}px`,
          ...contentSx,
          ...contentStyle
        }}
      >
        <Info size={24} color={colors.main} />
      </Box>
    );
  }

  return (
    <Box
      ref={ref}
      className={className}
      sx={{
        position: 'relative',
        ...containerSx,
        ...style
      }}
    >
      {renderSkeletonGroup()}

      {/* Metrics */}
      {showMetrics && renderMetricsComponent()}

      {/* Quick stats */}
      {showQuickStats && renderQuickStatsComponent()}

      {/* Performance data */}
      {showPerformanceData && renderPerformanceDataComponent()}
    </Box>
  );
});

Skeleton.displayName = 'Skeleton';

export { Skeleton };
export type { 
  SkeletonProps, 
  SkeletonState, 
  SkeletonVariant, 
  SkeletonSize, 
  SkeletonColor, 
  SkeletonAnimation,
  SkeletonShape,
  SkeletonPattern
};
