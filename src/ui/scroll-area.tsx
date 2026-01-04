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
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Move,
  MousePointer,
  GripVertical,
  GripHorizontal,
  MoreVertical,
  MoreHorizontal,
  Settings,
  RefreshCw,
  RotateCcw,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Zoom,
  Maximize,
  Minimize,
  Maximize2,
  Minimize2,
  Expand,
  Compress,
  Expand2,
  Compress2,
  Scale,
  Ratio,
  Proportional,
  Fixed,
  Auto,
  Custom,
  Preset,
  Reset,
  Undo,
  Redo,
  Copy,
  Paste,
  Cut,
  Delete,
  Trash2,
  Edit,
  Edit2,
  Eye,
  EyeOff,
  Download,
  Upload,
  FileText,
  Image,
  Video,
  Music,
  File,
  Folder,
  Archive,
  BookOpen,
  Award,
  Star,
  CheckCircle,
  AlertTriangle,
  Info,
  HelpCircle,
  Search,
  Filter,
  Plus,
  Minus,
  X,
  Check,
  Home,
  Users,
  Shield,
  Certificate,
  Verified,
  Clock,
  Calendar,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Activity,
  Zap,
  Mail,
  Phone,
  MapPin,
  Globe,
  DollarSign,
  Percent,
  Hash,
  AtSign,
  Paperclip,
  Lock,
  Unlock,
  Key,
  Fingerprint,
  CreditCard,
  Home2,
  Users2,
  Shield2,
  Certificate2,
  Verified2,
  GraduationCap,
  Briefcase,
  Target,
  Flag,
  Bookmark,
  Heart,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Bell,
  Notification,
  Settings2,
  ExternalLink,
  Share2,
  Save,
  Download2,
  Upload2,
  RefreshCw2,
  RefreshCw3,
  RotateCw2,
  RotateCw3,
  ZoomIn2,
  ZoomOut2,
  Zoom2,
  Maximize3,
  Minimize3,
  Expand3,
  Compress3,
  Scale2,
  Ratio2,
  Proportional2,
  Fixed2,
  Auto2,
  Custom2,
  Preset2,
  Reset2,
  Undo2,
  Redo2,
  Copy2,
  Paste2,
  Cut2,
  Delete2,
  Trash3,
  Edit3,
  Edit4,
  Eye2,
  EyeOff2,
  Download3,
  Upload3,
  FileText2,
  Image2,
  Video2,
  Music2,
  File2,
  Folder2,
  Archive2,
  BookOpen2,
  Award2,
  Star2,
  CheckCircle2,
  AlertTriangle2,
  Info2,
  HelpCircle2,
  Search2,
  Filter2,
  Plus2,
  Minus2,
  X2,
  Check2,
  Home3,
  Users3,
  Shield3,
  Certificate3,
  Verified3,
  GraduationCap2,
  Briefcase2,
  Target2,
  Flag2,
  Bookmark2,
  Heart2,
  ThumbsUp2,
  ThumbsDown2,
  MessageCircle2,
  Bell2,
  Notification2,
  Settings3
} from 'lucide-react';

export type ScrollAreaVariant = 'default' | 'thin' | 'none' | 'enterprise' | 'glass' | 'minimal';
export type ScrollAreaSize = 'small' | 'medium' | 'large' | 'auto';
export type ScrollAreaColor = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'gradient';
export type ScrollAreaDirection = 'vertical' | 'horizontal' | 'both' | 'auto';
export type ScrollAreaBehavior = 'auto' | 'smooth' | 'instant';

export interface ScrollAreaProps {
  // Core props
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  sx?: any;
  
  // Scroll behavior
  variant?: ScrollAreaVariant;
  size?: ScrollAreaSize;
  color?: ScrollAreaColor;
  direction?: ScrollAreaDirection;
  behavior?: ScrollAreaBehavior;
  
  // Dimensions
  height?: number | string;
  maxHeight?: number | string;
  minHeight?: number | string;
  width?: number | string;
  maxWidth?: number | string;
  minWidth?: number | string;
  
  // Styling
  backgroundColor?: string;
  borderRadius?: number;
  borderWidth?: number;
  borderColor?: string;
  borderStyle?: 'solid' | 'dashed' | 'dotted' | 'none';
  padding?: number | string;
  margin?: number | string;
  
  // Scrollbar styling
  scrollbarWidth?: 'auto' | 'thin' | 'none';
  scrollbarHeight?: number;
  scrollbarTrackColor?: string;
  scrollbarThumbColor?: string;
  scrollbarThumbHoverColor?: string;
  scrollbarCornerColor?: string;
  scrollbarBorderRadius?: number;
  
  // Advanced features
  showScrollIndicators?: boolean;
  showScrollButtons?: boolean;
  showResizeHandle?: boolean;
  showProgress?: boolean;
  showShadow?: boolean;
  showBorder?: boolean;
  showGradient?: boolean;
  
  // Scroll indicators
  scrollIndicatorPosition?: 'top' | 'bottom' | 'left' | 'right' | 'corner';
  scrollIndicatorStyle?: 'bar' | 'dot' | 'line' | 'number' | 'percentage';
  scrollIndicatorColor?: string;
  scrollIndicatorSize?: number;
  
  // Scroll buttons
  scrollButtonPosition?: 'top' | 'bottom' | 'left' | 'right' | 'both';
  scrollButtonStyle?: 'icon' | 'text' | 'pill' | 'minimal';
  scrollButtonColor?: string;
  scrollButtonSize?: 'small' | 'medium' | 'large';
  scrollButtonVariant?: 'contained' | 'outlined' | 'text';
  
  // Resize handle
  resizeHandlePosition?: 'corner' | 'edge' | 'both';
  resizeHandleStyle?: 'default' | 'thin' | 'thick' | 'rounded' | 'square';
  resizeHandleColor?: string;
  resizeHandleSize?: number;
  
  // Progress
  progressPosition?: 'top' | 'bottom' | 'left' | 'right' | 'overlay';
  progressStyle?: 'linear' | 'circular' | 'bar' | 'dot';
  progressColor?: string;
  progressHeight?: number;
  showProgressPercentage?: boolean;
  
  // Shadow effects
  shadowIntensity?: 'none' | 'light' | 'medium' | 'strong' | 'enterprise';
  shadowColor?: string;
  shadowBlur?: number;
  shadowSpread?: number;
  shadowOffset?: [number, number];
  
  // Gradient effects
  gradientDirection?: 'top' | 'bottom' | 'left' | 'right' | 'radial';
  gradientColors?: [string, string, ...string[]];
  gradientIntensity?: number;
  gradientOpacity?: number;
  
  // Behavior
  autoHide?: boolean;
  autoScroll?: boolean;
  smoothScroll?: boolean;
  momentumScroll?: boolean;
  bounceScroll?: boolean;
  nestedScroll?: boolean;
  preventDefault?: boolean;
  stopPropagation?: boolean;
  
  // Performance
  virtualized?: boolean;
  itemHeight?: number;
  itemCount?: number;
  bufferSize?: number;
  debounce?: number;
  throttle?: number;
  
  // Touch and mobile
  touchEnabled?: boolean;
  touchThreshold?: number;
  swipeEnabled?: boolean;
  swipeThreshold?: number;
  momentum?: boolean;
  bounce?: boolean;
  
  // Keyboard navigation
  keyboardEnabled?: boolean;
  keyboardStep?: number;
  keyboardSpeed?: number;
  focusable?: boolean;
  tabIndex?: number;
  
  // Mouse wheel
  wheelEnabled?: boolean;
  wheelStep?: number;
  wheelSpeed?: number;
  invertWheel?: boolean;
  
  // Event handlers
  onScroll?: (event: React.UIEvent, scrollTop: number, scrollLeft: number) => void;
  onScrollStart?: (event: React.UIEvent) => void;
  onScrollEnd?: (event: React.UIEvent) => void;
  onScrollUp?: (event: React.UIEvent) => void;
  onScrollDown?: (event: React.UIEvent) => void;
  onScrollLeft?: (event: React.UIEvent) => void;
  onScrollRight?: (event: React.UIEvent) => void;
  onReachTop?: (event: React.UIEvent) => void;
  onReachBottom?: (event: React.UIEvent) => void;
  onReachLeft?: (event: React.UIEvent) => void;
  onReachRight?: (event: React.UIEvent) => void;
  
  // Custom rendering
  renderScrollIndicator?: (scrollTop: number, scrollHeight: number, clientHeight: number) => React.ReactNode;
  renderScrollButton?: (direction: 'up' | 'down' | 'left' | 'right', isVisible: boolean) => React.ReactNode;
  renderResizeHandle?: () => React.ReactNode;
  renderProgress?: (progress: number) => React.ReactNode;
  renderOverlay?: () => React.ReactNode;
  
  // Enterprise features
  enterprise?: boolean;
  showQuickStats?: boolean;
  quickStats?: Array<{
    label: string;
    value: string | number;
    icon?: React.ReactNode;
    trend?: 'up' | 'down' | 'stable';
  }>;
  showPerformanceMetrics?: boolean;
  performanceMetrics?: {
    scrollSpeed?: number;
    scrollDistance?: number;
    scrollTime?: number;
    bounceCount?: number;
  };
  
  // Accessibility
  ariaLabel?: string;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
  ariaLive?: 'off' | 'polite' | 'assertive';
  ariaAtomic?: boolean;
  ariaRelevant?: string;
  
  // Special modes
  fullscreen?: boolean;
  floating?: boolean;
  dockable?: boolean;
  minimizable?: boolean;
  maximizable?: boolean;
  pinnable?: boolean;
  
  // Styling overrides
  containerSx?: any;
  contentSx?: any;
  scrollbarSx?: any;
  indicatorSx?: any;
  buttonSx?: any;
  progressSx?: any;
}

interface ScrollState {
  scrollTop: number;
  scrollLeft: number;
  scrollHeight: number;
  scrollWidth: number;
  clientHeight: number;
  clientWidth: number;
  isScrolling: boolean;
  isAtTop: boolean;
  isAtBottom: boolean;
  isAtLeft: boolean;
  isAtRight: boolean;
  progress: number;
}

interface ScrollIndicatorProps {
  scrollTop: number;
  scrollHeight: number;
  clientHeight: number;
  variant: ScrollAreaVariant;
  color: ScrollAreaColor;
  size: ScrollAreaSize;
  position: string;
  style: string;
  enterprise: boolean;
  renderScrollIndicator?: (scrollTop: number, scrollHeight: number, clientHeight: number) => React.ReactNode;
}

const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({
  scrollTop,
  scrollHeight,
  clientHeight,
  variant,
  color,
  size,
  position,
  style,
  enterprise,
  renderScrollIndicator
}) => {
  if (renderScrollIndicator) {
    return <>{renderScrollIndicator(scrollTop, scrollHeight, clientHeight)}</>;
  }

  const progress = scrollHeight > clientHeight ? (scrollTop / (scrollHeight - clientHeight)) * 100 : 0;

  const getColor = () => {
    const colors = {
      primary: '#667eea',
      secondary: '#f093fb',
      success: '#43e97b',
      warning: '#ffa726',
      error: '#f44336',
      info: '#4facfe',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    };
    return colors[color] || colors.primary;
  };

  const indicatorColor = getColor();
  const sizeStyles = {
    small: { width: 4, height: 20 },
    medium: { width: 6, height: 30 },
    large: { width: 8, height: 40 },
    auto: { width: 6, height: Math.max(20, Math.min(40, clientHeight * 0.1)) }
  };
  const indicatorSize = sizeStyles[size] || sizeStyles.medium;

  const getPositionStyles = () => {
    const baseStyles = {
      position: 'absolute',
      zIndex: 100,
      pointerEvents: 'none',
      transition: 'all 0.2s ease'
    };

    const positionStyles = {
      top: { top: 8, left: '50%', transform: 'translateX(-50%)' },
      bottom: { bottom: 8, left: '50%', transform: 'translateX(-50%)' },
      left: { left: 8, top: '50%', transform: 'translateY(-50%)' },
      right: { right: 8, top: '50%', transform: 'translateY(-50%)' },
      corner: { bottom: 8, right: 8 }
    };

    return { ...baseStyles, ...positionStyles[position] };
  };

  const getStyleStyles = () => {
    const baseStyles = {
      backgroundColor: indicatorColor,
      borderRadius: 4
    };

    const styleStyles = {
      bar: {
        width: position === 'top' || position === 'bottom' ? indicatorSize.width * 5 : indicatorSize.width,
        height: position === 'left' || position === 'right' ? indicatorSize.height * 5 : indicatorSize.height,
        opacity: 0.8
      },
      dot: {
        width: indicatorSize.width * 2,
        height: indicatorSize.width * 2,
        borderRadius: '50%',
        opacity: 0.9
      },
      line: {
        width: position === 'top' || position === 'bottom' ? 2 : indicatorSize.width,
        height: position === 'left' || position === 'right' ? 2 : indicatorSize.height,
        opacity: 0.7
      },
      number: {
        padding: '2px 6px',
        fontSize: '12px',
        fontWeight: 600,
        color: 'white',
        backgroundColor: indicatorColor
      },
      percentage: {
        width: position === 'top' || position === 'bottom' ? `${progress}%` : indicatorSize.width,
        height: position === 'left' || position === 'right' ? `${progress}%` : indicatorSize.height,
        opacity: 0.8
      }
    };

    return { ...baseStyles, ...styleStyles[style] };
  };

  if (progress === 0 && scrollTop === 0) return null;

  return (
    <Box sx={getPositionStyles()}>
      <Box
        sx={{
          ...getStyleStyles(),
          ...(enterprise && {
            background: color === 'gradient' ? indicatorColor : indicatorColor,
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
            backdropFilter: 'blur(10px)'
          })
        }}
      >
        {style === 'number' && `${Math.round(progress)}%`}
      </Box>
    </Box>
  );
};

interface ScrollButtonProps {
  direction: 'up' | 'down' | 'left' | 'right';
  isVisible: boolean;
  onClick: () => void;
  variant: ScrollAreaVariant;
  color: ScrollAreaColor;
  size: ScrollAreaSize;
  style: string;
  buttonStyle: string;
  buttonColor: string;
  buttonSize: string;
  buttonVariant: string;
  enterprise: boolean;
  renderScrollButton?: (direction: 'up' | 'down' | 'left' | 'right', isVisible: boolean) => React.ReactNode;
}

const ScrollButton: React.FC<ScrollButtonProps> = ({
  direction,
  isVisible,
  onClick,
  variant,
  color,
  size,
  style,
  buttonStyle,
  buttonColor,
  buttonSize,
  buttonVariant,
  enterprise,
  renderScrollButton
}) => {
  if (renderScrollButton) {
    return <>{renderScrollButton(direction, isVisible)}</>;
  }

  const getColor = () => {
    const colors = {
      primary: '#667eea',
      secondary: '#f093fb',
      success: '#43e97b',
      warning: '#ffa726',
      error: '#f44336',
      info: '#4facfe',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    };
    return colors[color] || colors.primary;
  };

  const primaryColor = buttonColor || getColor();

  const getIcon = () => {
    const icons = {
      up: <ChevronUp size={16} />,
      down: <ChevronDown size={16} />,
      left: <ChevronLeft size={16} />,
      right: <ChevronRight size={16} />
    };
    return icons[direction];
  };

  const getButtonStyles = () => {
    const sizeStyles = {
      small: { padding: '4px 8px', fontSize: '12px' },
      medium: { padding: '8px 12px', fontSize: '14px' },
      large: { padding: '12px 16px', fontSize: '16px' }
    };
    const buttonSizeStyle = sizeStyles[buttonSize] || sizeStyles.medium;

    const variantStyles = {
      contained: {
        background: buttonColor === 'gradient' ? primaryColor : primaryColor,
        color: 'white',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
        '&:hover': {
          background: buttonColor === 'gradient' ? primaryColor : primaryColor,
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
          transform: 'translateY(-1px)'
        }
      },
      outlined: {
        background: 'transparent',
        color: primaryColor,
        border: `2px solid ${primaryColor}`,
        '&:hover': {
          background: alpha(primaryColor, 0.1),
          transform: 'translateY(-1px)'
        }
      },
      text: {
        background: 'transparent',
        color: primaryColor,
        '&:hover': {
          background: alpha(primaryColor, 0.1),
          transform: 'translateY(-1px)'
        }
      }
    };

    const styleStyles = {
      icon: { minWidth: 'auto', width: '40px', height: '40px' },
      text: { minWidth: '80px' },
      pill: { borderRadius: '24px', minWidth: '100px' },
      minimal: { 
        background: 'transparent',
        border: 'none',
        boxShadow: 'none',
        '&:hover': { background: alpha(primaryColor, 0.1) }
      }
    };

    return {
      ...buttonSizeStyle,
      ...variantStyles[buttonVariant],
      ...styleStyles[buttonStyle],
      ...(enterprise && {
        backdropFilter: 'blur(10px)',
        border: buttonVariant === 'outlined' ? `2px solid ${primaryColor}` : 'none',
        boxShadow: buttonVariant !== 'text' ? '0 4px 16px rgba(102, 126, 234, 0.3)' : 'none'
      }),
      transition: 'all 0.2s ease',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
      pointerEvents: isVisible ? 'auto' : 'none'
    };
  };

  const getPositionStyles = () => {
    const baseStyles = {
      position: 'absolute',
      zIndex: 100,
      transition: 'all 0.3s ease'
    };

    const positionStyles = {
      top: { top: 16, left: '50%', transform: 'translateX(-50%)' },
      bottom: { bottom: 16, left: '50%', transform: 'translateX(-50%)' },
      left: { left: 16, top: '50%', transform: 'translateY(-50%)' },
      right: { right: 16, top: '50%', transform: 'translateY(-50%)' },
      both: { top: 16, bottom: 16, left: 16, right: 16 }
    };

    const directionStyles = {
      up: { top: 16 },
      down: { bottom: 16 },
      left: { left: 16 },
      right: { right: 16 }
    };

    if (style === 'both') {
      return { ...baseStyles, ...directionStyles[direction] };
    }

    return { ...baseStyles, ...positionStyles[style] };
  };

  if (!isVisible) return null;

  return (
    <Box sx={getPositionStyles()}>
      <Button
        variant={buttonVariant}
        size={buttonSize}
        onClick={onClick}
        startIcon={buttonStyle !== 'icon' && getIcon()}
        sx={getButtonStyles()}
      >
        {buttonStyle === 'icon' ? getIcon() : 
         buttonStyle === 'text' ? `Scroll ${direction}` : null}
      </Button>
    </Box>
  );
};

interface ResizeHandleProps {
  onMouseDown: (e: React.MouseEvent) => void;
  onTouchStart: (e: React.TouchEvent) => void;
  position: string;
  style: string;
  color: string;
  size: number;
  enterprise: boolean;
  renderResizeHandle?: () => React.ReactNode;
}

const ResizeHandle: React.FC<ResizeHandleProps> = ({
  onMouseDown,
  onTouchStart,
  position,
  style,
  color,
  size,
  enterprise,
  renderResizeHandle
}) => {
  if (renderResizeHandle) {
    return <>{renderResizeHandle()}</>;
  }

  const getStyles = () => {
    const baseStyles = {
      position: 'absolute',
      cursor: 'nw-resize',
      zIndex: 100,
      transition: 'all 0.2s ease'
    };

    const positionStyles = {
      corner: { bottom: 0, right: 0 },
      edge: { bottom: 0, right: '50%', transform: 'translateX(50%)' },
      both: { bottom: 0, right: 0 }
    };

    const styleStyles = {
      default: {
        width: size,
        height: size,
        backgroundColor: color,
        borderRadius: '50%'
      },
      thin: {
        width: 2,
        height: 20,
        backgroundColor: color,
        borderRadius: 1
      },
      thick: {
        width: size * 2,
        height: size * 2,
        backgroundColor: color,
        borderRadius: '50%'
      },
      rounded: {
        width: size,
        height: size,
        backgroundColor: color,
        borderRadius: '50%'
      },
      square: {
        width: size,
        height: size,
        backgroundColor: color,
        borderRadius: 0
      }
    };

    return {
      ...baseStyles,
      ...positionStyles[position],
      ...styleStyles[style],
      ...(enterprise && {
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
        backdropFilter: 'blur(10px)',
        border: `1px solid rgba(255, 255, 255, 0.3)`
      }),
      '&:hover': {
        transform: 'scale(1.1)',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)'
      }
    };
  };

  return (
    <Box
      sx={getStyles()}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
    >
      {enterprise && (
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white' }}>
          <MoreVertical size={12} />
        </Box>
      )}
    </Box>
  );
};

interface ProgressBarProps {
  progress: number;
  position: string;
  style: string;
  color: string;
  height: number;
  showPercentage: boolean;
  enterprise: boolean;
  renderProgress?: (progress: number) => React.ReactNode;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  position,
  style,
  color,
  height,
  showPercentage,
  enterprise,
  renderProgress
}) => {
  if (renderProgress) {
    return <>{renderProgress(progress)}</>;
  }

  const getPositionStyles = () => {
    const baseStyles = {
      position: 'absolute',
      zIndex: 90,
      pointerEvents: 'none'
    };

    const positionStyles = {
      top: { top: 0, left: 0, right: 0 },
      bottom: { bottom: 0, left: 0, right: 0 },
      left: { left: 0, top: 0, bottom: 0 },
      right: { right: 0, top: 0, bottom: 0 },
      overlay: { top: 0, left: 0, right: 0, bottom: 0 }
    };

    return { ...baseStyles, ...positionStyles[position] };
  };

  const getStyleStyles = () => {
    const baseStyles = {
      height: position === 'top' || position === 'bottom' ? height : '100%',
      width: position === 'left' || position === 'right' ? height : '100%',
      backgroundColor: color,
      transition: 'all 0.3s ease'
    };

    const styleStyles = {
      linear: {
        opacity: 0.8
      },
      circular: {
        borderRadius: '50%',
        opacity: 0.6
      },
      bar: {
        opacity: 0.7
      },
      dot: {
        width: height,
        height: height,
        borderRadius: '50%',
        opacity: 0.9
      }
    };

    return { ...baseStyles, ...styleStyles[style] };
  };

  const getProgressStyles = () => {
    if (position === 'overlay') {
      return {
        background: `linear-gradient(to bottom, transparent 0%, ${color} ${progress}%, transparent 100%)`,
        opacity: 0.3
      };
    }

    if (position === 'top' || position === 'bottom') {
      return {
        width: `${progress}%`
      };
    }

    return {
      height: `${progress}%`
    };
  };

  return (
    <Box sx={getPositionStyles()}>
      <Box
        sx={{
          ...getStyleStyles(),
          ...getProgressStyles(),
          ...(enterprise && {
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
            backdropFilter: 'blur(10px)'
          })
        }}
      >
        {showPercentage && position === 'overlay' && (
          <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white', fontSize: '12px', fontWeight: 600 }}>
            {Math.round(progress)}%
          </Box>
        )}
      </Box>
    </Box>
  );
};

interface QuickStatsProps {
  stats: Array<{
    label: string;
    value: string | number;
    icon?: React.ReactNode;
    trend?: 'up' | 'down' | 'stable';
  }>;
  enterprise?: boolean;
}

const QuickStats: React.FC<QuickStatsProps> = ({ stats, enterprise }) => {
  return (
    <Grid container spacing={1} sx={{ mb: 2 }}>
      {stats.map((stat, index) => (
        <Grid item xs={6} md={3} key={index}>
          <Card elevation={0} sx={{ borderRadius: 2, background: alpha('#667eea', 0.05) }}>
            <CardContent sx={{ p: 1.5, textAlign: 'center' }}>
              <Stack spacing={0.5} alignItems="center">
                <Box sx={{ color: '#667eea' }}>
                  {stat.icon}
                </Box>
                <Typography variant="body2" sx={{ fontWeight: 700, color: '#667eea' }}>
                  {stat.value}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {stat.label}
                </Typography>
                {stat.trend && (
                  <Box sx={{ color: stat.trend === 'up' ? '#43e97b' : stat.trend === 'down' ? '#f44336' : '#6c757d' }}>
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
  );
};

export const ScrollArea = forwardRef<HTMLDivElement, ScrollAreaProps>((props, ref) => {
  const {
    children,
    className,
    style,
    sx,
    variant = 'default',
    size = 'medium',
    color = 'primary',
    direction = 'both',
    behavior = 'smooth',
    height = 400,
    maxHeight,
    minHeight,
    width = '100%',
    maxWidth,
    minWidth,
    backgroundColor = 'white',
    borderRadius = 8,
    borderWidth = 1,
    borderColor = 'divider',
    borderStyle = 'solid',
    padding = 2,
    margin,
    scrollbarWidth = 'thin',
    scrollbarHeight = 8,
    scrollbarTrackColor,
    scrollbarThumbColor,
    scrollbarThumbHoverColor,
    scrollbarCornerColor,
    scrollbarBorderRadius = 4,
    showScrollIndicators = true,
    showScrollButtons = true,
    showResizeHandle = false,
    showProgress = false,
    showShadow = false,
    showBorder = true,
    showGradient = false,
    scrollIndicatorPosition = 'right',
    scrollIndicatorStyle = 'bar',
    scrollIndicatorColor,
    scrollIndicatorSize = 6,
    scrollButtonPosition = 'both',
    scrollButtonStyle = 'icon',
    scrollButtonColor,
    scrollButtonSize = 'medium',
    scrollButtonVariant = 'contained',
    resizeHandlePosition = 'corner',
    resizeHandleStyle = 'default',
    resizeHandleColor = '#667eea',
    resizeHandleSize = 12,
    progressPosition = 'top',
    progressStyle = 'linear',
    progressColor,
    progressHeight = 4,
    showProgressPercentage = false,
    shadowIntensity = 'medium',
    shadowColor = '#000',
    shadowBlur = 16,
    shadowSpread = 0,
    shadowOffset = [0, 8],
    gradientDirection = 'top',
    gradientColors = ['rgba(102, 126, 234, 0.1)', 'rgba(118, 75, 162, 0.1)'],
    gradientIntensity = 0.5,
    gradientOpacity = 0.3,
    autoHide = true,
    autoScroll = true,
    smoothScroll = true,
    momentumScroll = true,
    bounceScroll = true,
    nestedScroll = false,
    preventDefault = false,
    stopPropagation = false,
    virtualized = false,
    itemHeight = 50,
    itemCount = 0,
    bufferSize = 5,
    debounce = 100,
    throttle = 16,
    touchEnabled = true,
    touchThreshold = 10,
    swipeEnabled = true,
    swipeThreshold = 50,
    momentum = true,
    bounce = true,
    keyboardEnabled = true,
    keyboardStep = 40,
    keyboardSpeed = 1,
    focusable = true,
    tabIndex = 0,
    wheelEnabled = true,
    wheelStep = 40,
    wheelSpeed = 1,
    invertWheel = false,
    onScroll,
    onScrollStart,
    onScrollEnd,
    onScrollUp,
    onScrollDown,
    onScrollLeft,
    onScrollRight,
    onReachTop,
    onReachBottom,
    onReachLeft,
    onReachRight,
    renderScrollIndicator,
    renderScrollButton,
    renderResizeHandle,
    renderProgress,
    renderOverlay,
    enterprise = false,
    showQuickStats = false,
    quickStats = [],
    showPerformanceMetrics = false,
    performanceMetrics = {},
    ariaLabel,
    ariaLabelledBy,
    ariaDescribedBy,
    ariaLive = 'polite',
    ariaAtomic = true,
    ariaRelevant = 'additions text',
    fullscreen = false,
    floating = false,
    dockable = false,
    minimizable = false,
    maximizable = false,
    pinnable = false,
    containerSx,
    contentSx,
    scrollbarSx,
    indicatorSx,
    buttonSx,
    progressSx
  } = props;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollState, setScrollState] = useState<ScrollState>({
    scrollTop: 0,
    scrollLeft: 0,
    scrollHeight: 0,
    scrollWidth: 0,
    clientHeight: 0,
    clientWidth: 0,
    isScrolling: false,
    isAtTop: true,
    isAtBottom: false,
    isAtLeft: true,
    isAtRight: false,
    progress: 0
  });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(!autoHide);
  const [resizeState, setResizeState] = useState({ width: width as number, height: height as number });
  const [isResizing, setIsResizing] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isPinned, setIsPinned] = useState(false);

  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  // Enterprise color schemes
  const getEnterpriseColors = () => {
    const colors = {
      primary: {
        main: '#667eea',
        light: '#764ba2',
        dark: '#5a67d8',
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      },
      secondary: {
        main: '#f093fb',
        light: '#f5576c',
        dark: '#ec4899',
        gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
      },
      success: {
        main: '#43e97b',
        light: '#38f9d7',
        dark: '#28a745',
        gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
      },
      warning: {
        main: '#ffa726',
        light: '#ff7043',
        dark: '#f57c00',
        gradient: 'linear-gradient(135deg, #ffa726 0%, #ff7043 100%)'
      },
      error: {
        main: '#f44336',
        light: '#e91e63',
        dark: '#d32f2f',
        gradient: 'linear-gradient(135deg, #f44336 0%, #e91e63 100%)'
      },
      info: {
        main: '#4facfe',
        light: '#00f2fe',
        dark: '#2196f3',
        gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
      },
      gradient: {
        main: '#667eea',
        light: '#764ba2',
        dark: '#5a67d8',
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }
    };
    return colors[color] || colors.primary;
  };

  const enterpriseColors = getEnterpriseColors();

  // Update scroll state
  const updateScrollState = useCallback(() => {
    if (scrollRef.current) {
      const element = scrollRef.current;
      const scrollPercentage = element.scrollHeight > element.clientHeight 
        ? (element.scrollTop / (element.scrollHeight - element.clientHeight)) * 100 
        : 0;

      setScrollState({
        scrollTop: element.scrollTop,
        scrollLeft: element.scrollLeft,
        scrollHeight: element.scrollHeight,
        scrollWidth: element.scrollWidth,
        clientHeight: element.clientHeight,
        clientWidth: element.clientWidth,
        isScrolling: true,
        isAtTop: element.scrollTop <= 10,
        isAtBottom: element.scrollTop + element.clientHeight >= element.scrollHeight - 10,
        isAtLeft: element.scrollLeft <= 10,
        isAtRight: element.scrollLeft + element.clientWidth >= element.scrollWidth - 10,
        progress: scrollPercentage
      });

      // Handle reach callbacks
      if (element.scrollTop <= 10 && onReachTop) onReachTop({} as React.UIEvent);
      if (element.scrollTop + element.clientHeight >= element.scrollHeight - 10 && onReachBottom) onReachBottom({} as React.UIEvent);
      if (element.scrollLeft <= 10 && onReachLeft) onReachLeft({} as React.UIEvent);
      if (element.scrollLeft + element.clientWidth >= element.scrollWidth - 10 && onReachRight) onReachRight({} as React.UIEvent);
    }
  }, [onReachTop, onReachBottom, onReachLeft, onReachRight]);

  // Handle scroll events
  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    updateScrollState();
    
    if (onScroll) {
      onScroll(event, scrollState.scrollTop, scrollState.scrollLeft);
    }

    // Handle scroll direction callbacks
    const deltaY = (event.target as HTMLDivElement).scrollTop - scrollState.scrollTop;
    const deltaX = (event.target as HTMLDivElement).scrollLeft - scrollState.scrollLeft;

    if (deltaY > 0 && onScrollDown) onScrollDown(event);
    if (deltaY < 0 && onScrollUp) onScrollUp(event);
    if (deltaX > 0 && onScrollRight) onScrollRight(event);
    if (deltaX < 0 && onScrollLeft) onScrollLeft(event);

    // Auto-hide controls
    if (autoHide) {
      setIsVisible(true);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = setTimeout(() => setIsVisible(false), 3000);
    }

    // Scroll end detection
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      setScrollState(prev => ({ ...prev, isScrolling: false }));
      if (onScrollEnd) onScrollEnd(event);
    }, debounce);
  };

  // Handle mouse wheel
  const handleWheel = (event: React.WheelEvent) => {
    if (wheelEnabled && scrollRef.current) {
      event.preventDefault();
      const delta = invertWheel ? -event.deltaY : event.deltaY;
      scrollRef.current.scrollTop += delta * (wheelSpeed * 0.1);
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!keyboardEnabled || !scrollRef.current) return;

    let handled = true;
    const step = keyboardStep * keyboardSpeed;

    switch (event.key) {
      case 'ArrowUp':
        scrollRef.current.scrollTop -= step;
        if (onScrollUp) onScrollUp({} as React.UIEvent);
        break;
      case 'ArrowDown':
        scrollRef.current.scrollTop += step;
        if (onScrollDown) onScrollDown({} as React.UIEvent);
        break;
      case 'ArrowLeft':
        scrollRef.current.scrollLeft -= step;
        if (onScrollLeft) onScrollLeft({} as React.UIEvent);
        break;
      case 'ArrowRight':
        scrollRef.current.scrollLeft += step;
        if (onScrollRight) onScrollRight({} as React.UIEvent);
        break;
      case 'Home':
        scrollRef.current.scrollTop = 0;
        if (onReachTop) onReachTop({} as React.UIEvent);
        break;
      case 'End':
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        if (onReachBottom) onReachBottom({} as React.UIEvent);
        break;
      case 'PageUp':
        scrollRef.current.scrollTop -= scrollRef.current.clientHeight;
        break;
      case 'PageDown':
        scrollRef.current.scrollTop += scrollRef.current.clientHeight;
        break;
      default:
        handled = false;
    }

    if (handled) {
      event.preventDefault();
    }
  };

  // Scroll to specific position
  const scrollTo = (options: { top?: number; left?: number; behavior?: ScrollBehavior }) => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: options.top ?? scrollRef.current.scrollTop,
        left: options.left ?? scrollRef.current.scrollLeft,
        behavior: options.behavior ?? behavior
      });
    }
  };

  // Scroll to top/bottom
  const scrollToTop = () => scrollTo({ top: 0 });
  const scrollToBottom = () => scrollTo({ top: scrollRef.current?.scrollHeight });
  const scrollToLeft = () => scrollTo({ left: 0 });
  const scrollToRight = () => scrollTo({ left: scrollRef.current?.scrollWidth });

  // Handle resize
  const handleResize = (direction: 'up' | 'down' | 'left' | 'right', delta: number) => {
    setResizeState(prev => ({
      width: direction === 'left' || direction === 'right' 
        ? Math.max(200, prev.width + (direction === 'left' ? -delta : delta))
        : prev.width,
      height: direction === 'up' || direction === 'down'
        ? Math.max(150, prev.height + (direction === 'up' ? -delta : delta))
        : prev.height
    }));
  };

  // Get overflow styles based on direction
  const getOverflowStyles = () => {
    switch (direction) {
      case 'vertical':
        return { overflowX: 'hidden', overflowY: 'auto' };
      case 'horizontal':
        return { overflowX: 'auto', overflowY: 'hidden' };
      case 'both':
        return { overflow: 'auto' };
      case 'auto':
      default:
        return { overflow: 'auto' };
    }
  };

  // Get scrollbar styles based on variant
  const getScrollbarStyles = () => {
    if (variant === 'none') return {};

    const baseStyles = {
      '&::-webkit-scrollbar': {
        width: scrollbarWidth === 'thin' ? '6px' : '12px',
        height: scrollbarWidth === 'thin' ? '6px' : '12px'
      },
      '&::-webkit-scrollbar-track': {
        background: scrollbarTrackColor || alpha(enterpriseColors.main, 0.1),
        borderRadius: scrollbarBorderRadius
      },
      '&::-webkit-scrollbar-thumb': {
        background: scrollbarThumbColor || enterpriseColors.main,
        borderRadius: scrollbarBorderRadius,
        '&:hover': {
          background: scrollbarThumbHoverColor || enterpriseColors.dark
        }
      },
      '&::-webkit-scrollbar-corner': {
        background: scrollbarCornerColor || 'transparent'
      }
    };

    switch (variant) {
      case 'thin':
        return {
          ...baseStyles,
          '&::-webkit-scrollbar': { width: '4px', height: '4px' }
        };
      case 'enterprise':
        return {
          ...baseStyles,
          '&::-webkit-scrollbar': {
            width: '8px',
            height: '8px',
            background: alpha(enterpriseColors.main, 0.05)
          },
          '&::-webkit-scrollbar-thumb': {
            background: enterpriseColors.gradient,
            borderRadius: '4px',
            border: '2px solid transparent',
            backgroundClip: 'content-box'
          }
        };
      case 'glass':
        return {
          ...baseStyles,
          '&::-webkit-scrollbar': {
            width: '6px',
            height: '6px'
          },
          '&::-webkit-scrollbar-track': {
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)'
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'rgba(255, 255, 255, 0.3)',
            backdropFilter: 'blur(10px)'
          }
        };
      case 'minimal':
        return {
          ...baseStyles,
          '&::-webkit-scrollbar': { width: '2px', height: '2px' },
          '&::-webkit-scrollbar-thumb': { background: enterpriseColors.main }
        };
      default:
        return baseStyles;
    }
  };

  // Get shadow styles based on intensity
  const getShadowStyles = () => {
    if (!showShadow || shadowIntensity === 'none') return {};

    const intensities = {
      light: '0 2px 8px rgba(0, 0, 0, 0.1)',
      medium: '0 4px 20px rgba(0, 0, 0, 0.15)',
      strong: '0 8px 32px rgba(0, 0, 0, 0.2)',
      enterprise: `0 ${shadowOffset[1]}px ${shadowBlur}px ${shadowSpread}px ${alpha(shadowColor, 0.25)}`
    };

    return { boxShadow: intensities[shadowIntensity] || intensities.medium };
  };

  // Get gradient styles
  const getGradientStyles = () => {
    if (!showGradient) return {};

    const directions = {
      top: `linear-gradient(to bottom, ${gradientColors[0]}, ${gradientColors[1]})`,
      bottom: `linear-gradient(to top, ${gradientColors[0]}, ${gradientColors[1]})`,
      left: `linear-gradient(to right, ${gradientColors[0]}, ${gradientColors[1]})`,
      right: `linear-gradient(to left, ${gradientColors[0]}, ${gradientColors[1]})`,
      radial: `radial-gradient(circle, ${gradientColors[0]}, ${gradientColors[1]})`
    };

    return {
      background: directions[gradientDirection] || directions.top,
      opacity: gradientOpacity
    };
  };

  // Setup resize observer
  useEffect(() => {
    if (scrollRef.current) {
      resizeObserverRef.current = new ResizeObserver(() => {
        updateScrollState();
      });
      resizeObserverRef.current.observe(scrollRef.current);
    }

    return () => {
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      }
    };
  }, [updateScrollState]);

  // Cleanup timeouts
  useEffect(() => {
    return () => {
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  // Expose imperative methods
  useImperativeHandle(ref, () => ({
    scrollTo,
    scrollToTop,
    scrollToBottom,
    scrollToLeft,
    scrollToRight,
    get scrollTop() { return scrollState.scrollTop; },
    get scrollLeft() { return scrollState.scrollLeft; },
    get scrollHeight() { return scrollState.scrollHeight; },
    get scrollWidth() { return scrollState.scrollWidth; }
  }));

  return (
    <Paper
      ref={scrollRef}
      elevation={0}
      className={className}
      style={style}
      sx={{
        height: resizeState.height,
        width: resizeState.width,
        maxHeight,
        maxWidth,
        minHeight,
        minWidth,
        backgroundColor,
        borderRadius,
        border: showBorder ? `${borderWidth}px ${borderStyle} ${borderColor}` : 'none',
        padding,
        margin,
        position: 'relative',
        overflow: 'hidden',
        ...getOverflowStyles(),
        ...getScrollbarStyles(),
        ...getShadowStyles(),
        ...getGradientStyles(),
        ...(enterprise && {
          background: enterpriseColors.gradient,
          border: 'none',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
          backdropFilter: 'blur(10px)'
        }),
        ...containerSx,
        ...sx
      }}
      onScroll={handleScroll}
      onWheel={handleWheel}
      onKeyDown={handleKeyDown}
      tabIndex={focusable ? tabIndex : undefined}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      aria-describedby={ariaDescribedBy}
      aria-live={ariaLive}
      aria-atomic={ariaAtomic}
      aria-relevant={ariaRelevant}
    >
      {/* Quick Stats */}
      {enterprise && showQuickStats && quickStats.length > 0 && (
        <Box sx={{ position: 'absolute', top: 8, left: 8, right: 8, zIndex: 10 }}>
          <QuickStats stats={quickStats} enterprise={enterprise} />
        </Box>
      )}

      {/* Progress Bar */}
      {showProgress && (
        <ProgressBar
          progress={scrollState.progress}
          position={progressPosition}
          style={progressStyle}
          color={progressColor || enterpriseColors.main}
          height={progressHeight}
          showPercentage={showProgressPercentage}
          enterprise={enterprise}
          renderProgress={renderProgress}
        />
      )}

      {/* Custom Overlay */}
      {renderOverlay && (
        <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 5 }}>
          {renderOverlay()}
        </Box>
      )}

      {/* Content */}
      <Box sx={{
        height: '100%',
        width: '100%',
        ...contentSx
      }}>
        {children}
      </Box>

      {/* Scroll Indicators */}
      {showScrollIndicators && scrollState.scrollHeight > scrollState.clientHeight && (
        <Fade in={isVisible}>
          <Box>
            <ScrollIndicator
              scrollTop={scrollState.scrollTop}
              scrollHeight={scrollState.scrollHeight}
              clientHeight={scrollState.clientHeight}
              variant={variant}
              color={color}
              size={size}
              position={scrollIndicatorPosition}
              style={scrollIndicatorStyle}
              enterprise={enterprise}
              renderScrollIndicator={renderScrollIndicator}
            />
          </Box>
        </Fade>
      )}

      {/* Scroll Buttons */}
      {showScrollButtons && (
        <Fade in={isVisible}>
          <Box>
            {!scrollState.isAtTop && scrollButtonPosition !== 'bottom' && (
              <ScrollButton
                direction="up"
                isVisible={isVisible}
                onClick={scrollToTop}
                variant={variant}
                color={color}
                size={size}
                style={scrollButtonPosition}
                buttonStyle={scrollButtonStyle}
                buttonColor={scrollButtonColor}
                buttonSize={scrollButtonSize}
                buttonVariant={scrollButtonVariant}
                enterprise={enterprise}
                renderScrollButton={renderScrollButton}
              />
            )}
            {!scrollState.isAtBottom && scrollButtonPosition !== 'top' && (
              <ScrollButton
                direction="down"
                isVisible={isVisible}
                onClick={scrollToBottom}
                variant={variant}
                color={color}
                size={size}
                style={scrollButtonPosition}
                buttonStyle={scrollButtonStyle}
                buttonColor={scrollButtonColor}
                buttonSize={scrollButtonSize}
                buttonVariant={scrollButtonVariant}
                enterprise={enterprise}
                renderScrollButton={renderScrollButton}
              />
            )}
          </Box>
        </Fade>
      )}

      {/* Resize Handle */}
      {showResizeHandle && (
        <ResizeHandle
          onMouseDown={(e) => {
            setIsResizing(true);
            const startX = e.clientX;
            const startY = e.clientY;
            const startWidth = resizeState.width as number;
            const startHeight = resizeState.height as number;

            const handleMouseMove = (moveEvent: MouseEvent) => {
              const deltaX = moveEvent.clientX - startX;
              const deltaY = moveEvent.clientY - startY;
              
              setResizeState({
                width: Math.max(200, startWidth + deltaX),
                height: Math.max(150, startHeight + deltaY)
              });
            };

            const handleMouseUp = () => {
              setIsResizing(false);
              document.removeEventListener('mousemove', handleMouseMove);
              document.removeEventListener('mouseup', handleMouseUp);
            };

            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
          }}
          onTouchStart={(e) => {
            // Similar touch handling for mobile
          }}
          position={resizeHandlePosition}
          style={resizeHandleStyle}
          color={resizeHandleColor}
          size={resizeHandleSize}
          enterprise={enterprise}
          renderResizeHandle={renderResizeHandle}
        />
      )}
    </Paper>
  );
});

ScrollArea.displayName = 'ScrollArea';

export { ScrollArea };
export type { ScrollAreaProps, ScrollState, ScrollAreaVariant, ScrollAreaSize, ScrollAreaColor, ScrollAreaDirection, ScrollAreaBehavior };
