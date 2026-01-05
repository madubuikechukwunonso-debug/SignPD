import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  LinearProgress,
  CircularProgress,
  Typography,
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
  Tooltip,
  IconButton,
  Button,
  Grid
} from '@mui/material';
import {
  Activity,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Clock,
  Zap,
  Award,
  Star,
  CheckCircle,
  AlertTriangle,
  Info,
  Settings,
  RefreshCw,
  RotateCcw,
  Play,
  Pause,
  Stop,
  ChevronUp,
  ChevronDown,
  MoreVertical,
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
  HelpCircle,
  Search,
  Filter,
  Plus,
  Minus,
  Edit,
  Trash2,
  Save,
  Share2,
  ExternalLink,
  Eye,
  EyeOff,
  Copy,
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
  Calendar,
  Timer,
  Stopwatch,
  Speedometer,
  Gauge,
  Thermometer,
  Compass,
  Navigation,
  Radar,
  Calculator,
  Scale,
  Ruler,
  Measure,
  Grid,
  Square,
  Circle,
  Triangle,
  Diamond,
  Star2,
  Heart2,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Move,
  RotateCcw2,
  RotateCw2,
  Expand,
  Compress,
  Maximize,
  Minimize,
  ZoomIn,
  ZoomOut,
  Scan,
  Camera,
  Camera2,
  Video2,
  VideoOff,
  Mic,
  MicOff,
  Speaker,
  SpeakerOff,
  Headphones,
  Radio,
  Tv2,
  Monitor2,
  Smartphone2,
  Tablet2,
  Laptop2,
  Desktop2,
  Server2,
  Database,
  HardDrive,
  Usb,
  Cpu,
  MemoryStick,
  CircuitBoard,
  Battery,
  BatteryCharging,
  BatteryFull,
  BatteryLow,
  BatteryMedium,
  Power,
  PowerOff,
  ToggleLeft,
  ToggleRight,
  Switch,
  Button,
  MousePointer,
  MousePointerClick,
  Touchpad,
  Keyboard3,
  Type,
  Typing,
  Pen,
  PenTool,
  Pencil,
  Marker,
  Highlighter,
  Eraser,
  Scissors,
  Cut,
  Copy,
  Clipboard,
  Paste,
  ClipboardCheck,
  ClipboardList,
  ClipboardX
} from 'lucide-react';

export type ProgressVariant = 'linear' | 'circular' | 'dashboard' | 'gauge' | 'step' | 'timeline';
export type ProgressSize = 'small' | 'medium' | 'large' | 'xlarge';
export type ProgressColor = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'gradient';
export type ProgressStatus = 'active' | 'success' | 'exception' | 'normal' | 'paused';

export interface ProgressProps {
  // Core props
  value: number;
  variant?: ProgressVariant;
  size?: ProgressSize;
  color?: ProgressColor;
  status?: ProgressStatus;
  
  // Display options
  showPercentage?: boolean;
  showValue?: boolean;
  showStatus?: boolean;
  showIcon?: boolean;
  showSteps?: boolean;
  showTimeline?: boolean;
  
  // Styling
  thickness?: number;
  strokeWidth?: number;
  radius?: number;
  rounded?: boolean;
  animated?: boolean;
  striped?: boolean;
  gradient?: boolean;
  glow?: boolean;
  
  // Content
  label?: string;
  description?: string;
  icon?: React.ReactNode;
  successIcon?: React.ReactNode;
  errorIcon?: React.ReactNode;
  pausedIcon?: React.ReactNode;
  
  // Advanced features
  steps?: number;
  currentStep?: number;
  stepLabels?: string[];
  stepIcons?: React.ReactNode[];
  stepDescriptions?: string[];
  
  // Timeline features
  timelineItems?: Array<{
    title: string;
    description?: string;
    icon?: React.ReactNode;
    time?: string;
    status?: 'completed' | 'current' | 'pending' | 'error';
  }>;
  
  // Statistics
  showStats?: boolean;
  stats?: Array<{
    label: string;
    value: string | number;
    icon?: React.ReactNode;
    trend?: 'up' | 'down' | 'stable';
  }>;
  
  // Performance
  speed?: number;
  eta?: number;
  rate?: number;
  total?: number;
  processed?: number;
  
  // Controls
  showControls?: boolean;
  onPlay?: () => void;
  onPause?: () => void;
  onStop?: () => void;
  onReset?: () => void;
  
  // Thresholds
  warningThreshold?: number;
  errorThreshold?: number;
  successThreshold?: number;
  
  // Formatting
  format?: (value: number) => string;
  precision?: number;
  unit?: string;
  unitPosition?: 'prefix' | 'suffix';
  
  // Enterprise features
  enterprise?: boolean;
  showQuickStats?: boolean;
  quickStats?: Array<{
    label: string;
    value: string | number;
    icon: React.ReactNode;
    color?: string;
  }>;
  
  // Interactive features
  interactive?: boolean;
  onClick?: (value: number) => void;
  onHover?: (value: number) => void;
  
  // Custom rendering
  renderLabel?: (value: number) => React.ReactNode;
  renderValue?: (value: number) => React.ReactNode;
  renderIcon?: (status: ProgressStatus) => React.ReactNode;
  
  // Event handlers
  onComplete?: () => void;
  onError?: () => void;
  onWarning?: () => void;
  onStatusChange?: (status: ProgressStatus) => void;
  
  // Styling overrides
  className?: string;
  sx?: any;
  style?: React.CSSProperties;
  trackSx?: any;
  barSx?: any;
  textSx?: any;
  
  // Accessibility
  ariaLabel?: string;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
  ariaValueText?: string;
  
  // Performance optimization
  virtualized?: boolean;
  bufferSize?: number;
  debounce?: number;
  
  // Special modes
  determinate?: boolean;
  indeterminate?: boolean;
  buffer?: boolean;
  query?: boolean;
}

interface ProgressStepProps {
  index: number;
  total: number;
  current: number;
  label?: string;
  icon?: React.ReactNode;
  description?: string;
  status?: 'completed' | 'current' | 'pending' | 'error';
  size?: ProgressSize;
  color?: ProgressColor;
  enterprise?: boolean;
}

export const ProgressStep: React.FC<ProgressStepProps> = ({
  index,
  total,
  current,
  label,
  icon,
  description,
  status,
  size = 'medium',
  color = 'primary',
  enterprise = false
}) => {
  const isCompleted = index < current;
  const isCurrent = index === current;
  const isPending = index > current;
  const isError = status === 'error';

  const getStepColor = () => {
    if (isError) return '#f44336';
    if (isCompleted) {
      const colors = {
        primary: '#667eea',
        secondary: '#f093fb',
        success: '#43e97b',
        warning: '#ffa726',
        error: '#f44336',
        info: '#4facfe',
        gradient: '#f093fb'
      };
      return colors[color] || colors.primary;
    }
    return alpha('#000', 0.3);
  };

  const getStepSize = () => {
    const sizes = {
      small: 24,
      medium: 32,
      large: 40,
      xlarge: 48
    };
    return sizes[size] || sizes.medium;
  };

  const stepSize = getStepSize();
  const stepColor = getStepColor();

  return (
    <Box sx={{ position: 'relative', flex: 1 }}>
      {/* Step connector */}
      {index < total - 1 && (
        <Box
          sx={{
            position: 'absolute',
            top: stepSize / 2,
            left: stepSize,
            right: 0,
            height: 2,
            background: isCompleted ? stepColor : alpha('#000', 0.1),
            transition: 'all 0.3s ease'
          }}
        />
      )}

      <Stack direction="row" spacing={2} alignItems="center">
        {/* Step circle */}
        <Box
          sx={{
            width: stepSize,
            height: stepSize,
            borderRadius: '50%',
            background: isCurrent && !isError 
              ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
              : isCompleted && !isError
              ? stepColor
              : 'white',
            border: `2px solid ${stepColor}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: isCompleted || isCurrent ? 'white' : stepColor,
            fontWeight: 700,
            fontSize: size === 'small' ? '12px' : size === 'large' ? '16px' : '14px',
            boxShadow: isCurrent && !isError ? '0 4px 12px rgba(102, 126, 234, 0.4)' : 'none',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: '0 6px 16px rgba(102, 126, 234, 0.3)'
            }
          }}
        >
          {isError ? (
            <AlertTriangle size={stepSize * 0.5} />
          ) : isCompleted ? (
            icon || <CheckCircle size={stepSize * 0.5} />
          ) : (
            index + 1
          )}
        </Box>

        {/* Step content */}
        <Box sx={{ flexGrow: 1 }}>
          {label && (
            <Typography 
              variant={size === 'small' ? 'body2' : 'body1'} 
              sx={{ 
                fontWeight: isCurrent ? 700 : 600,
                color: isCurrent ? '#667eea' : 'text.primary'
              }}
            >
              {label}
            </Typography>
          )}
          {description && (
            <Typography 
              variant="caption" 
              color="text.secondary"
              sx={{ display: 'block', mt: 0.5 }}
            >
              {description}
            </Typography>
          )}
        </Box>
      </Stack>
    </Box>
  );
};

interface ProgressTimelineProps {
  items: Array<{
    title: string;
    description?: string;
    icon?: React.ReactNode;
    time?: string;
    status?: 'completed' | 'current' | 'pending' | 'error';
  }>;
  size?: ProgressSize;
  color?: ProgressColor;
  enterprise?: boolean;
}

export const ProgressTimeline: React.FC<ProgressTimelineProps> = ({
  items,
  size = 'medium',
  color = 'primary',
  enterprise = false
}) => {
  return (
    <Box sx={{ position: 'relative' }}>
      {items.map((item, index) => (
        <Box key={index} sx={{ position: 'relative', mb: index < items.length - 1 ? 4 : 0 }}>
          {/* Timeline connector */}
          {index < items.length - 1 && (
            <Box
              sx={{
                position: 'absolute',
                left: size === 'small' ? 12 : size === 'large' ? 20 : 16,
                top: size === 'small' ? 24 : size === 'large' ? 32 : 28,
                width: 2,
                height: 'calc(100% + 16px)',
                background: item.status === 'completed' 
                  ? '#667eea' 
                  : alpha('#000', 0.1)
              }}
            />
          )}

          <Stack direction="row" spacing={3} alignItems="flex-start">
            {/* Timeline dot */}
            <Box
              sx={{
                width: size === 'small' ? 24 : size === 'large' ? 32 : 28,
                height: size === 'small' ? 24 : size === 'large' ? 32 : 28,
                borderRadius: '50%',
                background: item.status === 'completed'
                  ? '#667eea'
                  : item.status === 'current'
                  ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                  : 'white',
                border: `2px solid ${item.status === 'completed' || item.status === 'current' ? '#667eea' : alpha('#000', 0.3)}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                flexShrink: 0,
                mt: 0.5
              }}
            >
              {item.status === 'error' ? (
                <AlertTriangle size={14} />
              ) : item.status === 'completed' ? (
                item.icon || <CheckCircle size={14} />
              ) : item.status === 'current' ? (
                item.icon || <Clock size={14} />
              ) : (
                item.icon || <Circle size={14} />
              )}
            </Box>

            {/* Timeline content */}
            <Box sx={{ flexGrow: 1 }}>
              <Stack spacing={1}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography 
                    variant={size === 'small' ? 'body2' : 'body1'} 
                    sx={{ 
                      fontWeight: item.status === 'current' ? 700 : 600,
                      color: item.status === 'current' ? '#667eea' : 'text.primary'
                    }}
                  >
                    {item.title}
                  </Typography>
                  {item.time && (
                    <Typography variant="caption" color="text.secondary">
                      {item.time}
                    </Typography>
                  )}
                </Stack>
                {item.description && (
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                )}
              </Stack>
            </Box>
          </Stack>
        </Box>
      ))}
    </Box>
  );
};

export const Progress: React.FC<ProgressProps> = ({
  value,
  variant = 'linear',
  size = 'medium',
  color = 'primary',
  status = 'active',
  showPercentage = true,
  showValue = true,
  showStatus = true,
  showIcon = true,
  showSteps = false,
  showTimeline = false,
  thickness = 4,
  strokeWidth = 4,
  radius = 60,
  rounded = true,
  animated = true,
  striped = false,
  gradient = false,
  glow = false,
  label,
  description,
  icon,
  successIcon,
  errorIcon,
  pausedIcon,
  steps = 0,
  currentStep = 0,
  stepLabels = [],
  stepIcons = [],
  stepDescriptions = [],
  timelineItems = [],
  showStats = false,
  stats = [],
  speed,
  eta,
  rate,
  total,
  processed,
  showControls = false,
  onPlay,
  onPause,
  onStop,
  onReset,
  warningThreshold = 75,
  errorThreshold = 90,
  successThreshold = 100,
  format,
  precision = 0,
  unit = '%',
  unitPosition = 'suffix',
  enterprise = false,
  showQuickStats = false,
  quickStats = [],
  interactive = false,
  onClick,
  onHover,
  renderLabel,
  renderValue,
  renderIcon,
  onComplete,
  onError,
  onWarning,
  onStatusChange,
  className,
  sx,
  style,
  trackSx,
  barSx,
  textSx,
  ariaLabel,
  ariaLabelledBy,
  ariaDescribedBy,
  ariaValueText,
  virtualized = false,
  bufferSize = 5,
  debounce = 100,
  determinate = true,
  indeterminate = false,
  buffer = false,
  query = false
}) => {
  const [displayValue, setDisplayValue] = useState(value);
  const [animationSpeed, setAnimationSpeed] = useState(animated ? 300 : 0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Auto-detect status based on thresholds
  const autoStatus = useMemo(() => {
    if (status !== 'active') return status;
    if (value >= successThreshold) return 'success';
    if (value >= errorThreshold) return 'exception';
    if (value >= warningThreshold) return 'normal';
    return 'active';
  }, [value, status, warningThreshold, errorThreshold, successThreshold]);

  // Get colors based on status and variant
  const getColors = () => {
    const statusColors = {
      active: '#667eea',
      success: '#43e97b',
      exception: '#f44336',
      normal: '#4facfe',
      paused: '#ffa726'
    };

    const gradientColors = {
      active: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      success: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      exception: 'linear-gradient(135deg, #f44336 0%, #d32f2f 100%)',
      normal: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      paused: 'linear-gradient(135deg, #ffa726 0%, #ff9800 100%)'
    };

    const color = statusColors[autoStatus];
    const gradient = gradientColors[autoStatus];

    return { color, gradient };
  };

  const { color, gradient } = getColors();

  // Format value
  const formatValue = (val: number) => {
    if (format) return format(val);
    const formatted = val.toFixed(precision);
    return unitPosition === 'prefix' ? `${unit}${formatted}` : `${formatted}${unit}`;
  };

  // Get icon based on status
  const getStatusIcon = () => {
    if (renderIcon) return renderIcon(autoStatus);
    
    const icons = {
      active: icon || <Activity size={20} />,
      success: successIcon || <CheckCircle size={20} />,
      exception: errorIcon || <AlertTriangle size={20} />,
      normal: icon || <Info size={20} />,
      paused: pausedIcon || <Pause size={20} />
    };
    
    return icons[autoStatus];
  };

  // Handle status changes
  useEffect(() => {
    onStatusChange?.(autoStatus);
    if (autoStatus === 'success') onComplete?.();
    if (autoStatus === 'exception') onError?.();
    if (autoStatus === 'normal') onWarning?.();
  }, [autoStatus]);

  // Animate value changes
  useEffect(() => {
    if (!animated) {
      setDisplayValue(value);
      return;
    }

    const timer = setTimeout(() => {
      setDisplayValue(value);
    }, debounce);

    return () => clearTimeout(timer);
  }, [value, animated, debounce]);

  // Get size styles
  const getSizeStyles = () => {
    const sizes = {
      small: { height: 4, fontSize: '12px', iconSize: 16, spacing: 1 },
      medium: { height: 8, fontSize: '14px', iconSize: 20, spacing: 2 },
      large: { height: 12, fontSize: '16px', iconSize: 24, spacing: 3 },
      xlarge: { height: 16, fontSize: '18px', iconSize: 28, spacing: 4 }
    };
    return sizes[size] || sizes.medium;
  };

  const sizeStyles = getSizeStyles();

  // Linear progress
  const renderLinearProgress = () => (
    <Box sx={{ width: '100%', position: 'relative' }}>
      <LinearProgress
        variant={determinate ? 'determinate' : indeterminate ? 'indeterminate' : buffer ? 'buffer' : 'determinate'}
        value={displayValue}
        buffer={buffer ? Math.min(displayValue + 10, 100) : undefined}
        sx={{
          height: sizeStyles.height,
          borderRadius: rounded ? sizeStyles.height / 2 : 0,
          backgroundColor: alpha('#000', 0.1),
          '& .MuiLinearProgress-bar': {
            background: gradient && !striped ? gradient : color,
            borderRadius: rounded ? sizeStyles.height / 2 : 0,
            transition: `transform ${animationSpeed}ms cubic-bezier(0.4, 0, 0.2, 1)`,
            ...(striped && {
              background: `repeating-linear-gradient(
                45deg,
                ${color} 0px,
                ${color} 10px,
                ${alpha(color, 0.7)} 10px,
                ${alpha(color, 0.7)} 20px
              )`,
              animation: 'stripe-animation 1s linear infinite'
            }),
            ...(glow && {
              boxShadow: `0 0 10px ${color}, 0 0 20px ${alpha(color, 0.5)}`
            })
          },
          ...trackSx
        }}
      />
      
      {/* Progress overlay for interactive mode */}
      {interactive && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: alpha('#000', 0.05)
            }
          }}
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const percentage = (x / rect.width) * 100;
            onClick?.(Math.max(0, Math.min(100, percentage)));
          }}
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const percentage = (x / rect.width) * 100;
            onHover?.(Math.max(0, Math.min(100, percentage)));
          }}
        />
      )}
    </Box>
  );

  // Circular progress
  const renderCircularProgress = () => (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress
        variant={determinate ? 'determinate' : indeterminate ? 'indeterminate' : 'determinate'}
        value={displayValue}
        size={radius * 2}
        thickness={strokeWidth}
        sx={{
          color: gradient ? undefined : color,
          '& .MuiCircularProgress-circle': {
            stroke: gradient ? `url(#gradient-${autoStatus})` : color,
            strokeLinecap: rounded ? 'round' : 'butt',
            transition: `stroke-dashoffset ${animationSpeed}ms cubic-bezier(0.4, 0, 0.2, 1)`,
            ...(glow && {
              filter: `drop-shadow(0 0 10px ${color})`
            })
          },
          ...trackSx
        }}
      />
      
      {/* Gradient definition for circular progress */}
      {gradient && (
        <svg width="0" height="0">
          <defs>
            <linearGradient id={`gradient-${autoStatus}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={color} />
              <stop offset="100%" stopColor={autoStatus === 'success' ? '#38f9d7' : 
                                           autoStatus === 'exception' ? '#d32f2f' : 
                                           autoStatus === 'paused' ? '#ff9800' : '#764ba2'} />
            </linearGradient>
          </defs>
        </svg>
      )}
      
      {/* Center content */}
      {(showPercentage || showValue || label) && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center'
          }}
        >
          {showIcon && (
            <Box sx={{ color, mb: 0.5 }}>
              {getStatusIcon()}
            </Box>
          )}
          {showPercentage && (
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 700, 
                color,
                fontSize: radius > 60 ? '24px' : '18px'
              }}
            >
              {formatValue(displayValue)}
            </Typography>
          )}
          {label && (
            <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
              {label}
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );

  // Dashboard/Gauge progress
  const renderDashboardProgress = () => (
    <Box sx={{ position: 'relative', width: radius * 2, height: radius * 2 }}>
      <svg width={radius * 2} height={radius * 2} viewBox={`0 0 ${radius * 2} ${radius * 2}`}>
        {/* Background arc */}
        <path
          d={`M ${radius * 0.2} ${radius * 1.8} A ${radius * 0.8} ${radius * 0.8} 0 0 1 ${radius * 1.8} ${radius * 1.8}`}
          fill="none"
          stroke={alpha('#000', 0.1)}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        
        {/* Progress arc */}
        <path
          d={`M ${radius * 0.2} ${radius * 1.8} A ${radius * 0.8} ${radius * 0.8} 0 0 1 ${radius * (0.2 + (displayValue / 100) * 1.6)} ${radius * (1.8 - (displayValue / 100) * 1.6)}`}
          fill="none"
          stroke={gradient ? `url(#gauge-gradient-${autoStatus})` : color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          style={{
            transition: `stroke-dasharray ${animationSpeed}ms ease`,
            filter: glow ? `drop-shadow(0 0 10px ${color})` : 'none'
          }}
        />
        
        {/* Gradient definition */}
        {gradient && (
          <defs>
            <linearGradient id={`gauge-gradient-${autoStatus}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={color} />
              <stop offset="100%" stopColor={autoStatus === 'success' ? '#38f9d7' : 
                                           autoStatus === 'exception' ? '#d32f2f' : 
                                           autoStatus === 'paused' ? '#ff9800' : '#764ba2'} />
            </linearGradient>
          </defs>
        )}
      </svg>
      
      {/* Center content */}
      <Box
        sx={{
          position: 'absolute',
          top: '60%',
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center'
        }}
      >
        {showIcon && (
          <Box sx={{ color, mb: 0.5 }}>
            {getStatusIcon()}
          </Box>
        )}
        {showPercentage && (
          <Typography 
            variant="h5" 
            sx={{ 
              fontWeight: 800, 
              color,
              fontSize: radius > 60 ? '28px' : '20px'
            }}
          >
            {formatValue(displayValue)}
          </Typography>
        )}
        {label && (
          <Typography variant="body2" color="text.secondary">
            {label}
          </Typography>
        )}
      </Box>
    </Box>
  );

  // Step progress
  const renderStepProgress = () => (
    <Box sx={{ width: '100%' }}>
      <Stack spacing={3}>
        {/* Step indicators */}
        <Stack direction="row" spacing={2} alignItems="center">
          {Array.from({ length: steps }, (_, index) => (
            <ProgressStep
              key={index}
              index={index}
              total={steps}
              current={currentStep}
              label={stepLabels[index]}
              icon={stepIcons[index]}
              description={stepDescriptions[index]}
              size={size}
              color={color}
              enterprise={enterprise}
            />
          ))}
        </Stack>

        {/* Current step details */}
        {currentStep < steps && stepLabels[currentStep] && (
          <Card elevation={0} sx={{ borderRadius: 3, background: alpha('#667eea', 0.05) }}>
            <CardContent sx={{ p: 2 }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white'
                  }}
                >
                  {stepIcons[currentStep] || <Activity size={20} />}
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {stepLabels[currentStep]}
                  </Typography>
                  {stepDescriptions[currentStep] && (
                    <Typography variant="body2" color="text.secondary">
                      {stepDescriptions[currentStep]}
                    </Typography>
                  )}
                </Box>
              </Stack>
            </CardContent>
          </Card>
        )}
      </Stack>
    </Box>
  );

  // Timeline progress
  const renderTimelineProgress = () => (
    <ProgressTimeline
      items={timelineItems}
      size={size}
      color={color}
      enterprise={enterprise}
    />
  );

  // Stats display
  const renderStats = () => (
    <Grid container spacing={2} sx={{ mt: 2 }}>
      {stats.map((stat, index) => (
        <Grid item xs={6} md={3} key={index}>
          <Card elevation={0} sx={{ borderRadius: 3, background: alpha(stat.color || '#667eea', 0.05) }}>
            <CardContent sx={{ p: 2, textAlign: 'center' }}>
              <Stack spacing={1} alignItems="center">
                <Box sx={{ color: stat.color || '#667eea' }}>
                  {stat.icon}
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700, color: stat.color || '#667eea' }}>
                  {stat.value}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {stat.label}
                </Typography>
                {stat.trend && (
                  <Box sx={{ color: stat.trend === 'up' ? '#43e97b' : stat.trend === 'down' ? '#f44336' : '#6c757d' }}>
                    {stat.trend === 'up' ? <TrendingUp size={14} /> : 
                     stat.trend === 'down' ? <TrendingDown size={14} /> : 
                     <Activity size={14} />}
                  </Box>
                )}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  // Quick stats for enterprise
  const renderQuickStats = () => (
    <Grid container spacing={1} sx={{ mb: 2 }}>
      {quickStats.map((stat, index) => (
        <Grid item xs={6} md={3} key={index}>
          <Box sx={{ textAlign: 'center' }}>
            <Stack spacing={0.5} alignItems="center">
              <Box sx={{ color: stat.color || '#667eea' }}>
                {stat.icon}
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 700, color: stat.color || '#667eea' }}>
                {stat.value}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {stat.label}
              </Typography>
            </Stack>
          </Box>
        </Grid>
      ))}
    </Grid>
  );

  // Controls
  const renderControls = () => (
    <Stack direction="row" spacing={1} justifyContent="center" sx={{ mt: 2 }}>
      <IconButton
        size="small"
        onClick={onPlay}
        disabled={!onPlay || autoStatus === 'success'}
        sx={{ color: '#667eea' }}
      >
        <Play size={16} />
      </IconButton>
      <IconButton
        size="small"
        onClick={onPause}
        disabled={!onPause}
        sx={{ color: '#ffa726' }}
      >
        <Pause size={16} />
      </IconButton>
      <IconButton
        size="small"
        onClick={onStop}
        disabled={!onStop}
        sx={{ color: '#f44336' }}
      >
        <Stop size={16} />
      </IconButton>
      <IconButton
        size="small"
        onClick={onReset}
        disabled={!onReset}
        sx={{ color: '#6c757d' }}
      >
        <RotateCcw size={16} />
      </IconButton>
    </Stack>
  );

  // Main content
  const mainContent = () => (
    <Box sx={{ width: '100%', position: 'relative' }}>
      {/* Quick stats for enterprise */}
      {enterprise && showQuickStats && quickStats.length > 0 && renderQuickStats()}

      {/* Progress component based on variant */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        mb: 2
      }}>
        {variant === 'linear' && renderLinearProgress()}
        {variant === 'circular' && renderCircularProgress()}
        {variant === 'dashboard' && renderDashboardProgress()}
        {variant === 'gauge' && renderDashboardProgress()}
        {variant === 'step' && renderStepProgress()}
        {variant === 'timeline' && renderTimelineProgress()}
      </Box>

      {/* Label and description */}
      {(label || description) && variant !== 'step' && variant !== 'timeline' && (
        <Box sx={{ textAlign: 'center', mb: 2 }}>
          {label && (
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 700, 
                mb: 1,
                color: enterprise ? '#667eea' : 'text.primary'
              }}
            >
              {renderLabel ? renderLabel(displayValue) : label}
            </Typography>
          )}
          {description && (
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          )}
        </Box>
      )}

      {/* Status display */}
      {showStatus && variant !== 'step' && variant !== 'timeline' && (
        <Stack direction="row" spacing={1} alignItems="center" justifyContent="center" sx={{ mb: 2 }}>
          {showIcon && (
            <Box sx={{ color }}>
              {getStatusIcon()}
            </Box>
          )}
          {showValue && (
            <Typography variant="h5" sx={{ fontWeight: 800, color }}>
              {renderValue ? renderValue(displayValue) : formatValue(displayValue)}
            </Typography>
          )}
          <Chip
            label={autoStatus.charAt(0).toUpperCase() + autoStatus.slice(1)}
            size="small"
            sx={{
              backgroundColor: alpha(color, 0.1),
              color: color,
              fontWeight: 600
            }}
          />
        </Stack>
      )}

      {/* Performance metrics */}
      {(speed || eta || rate || (total && processed)) && (
        <Grid container spacing={2} sx={{ mb: 2 }}>
          {speed && (
            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="caption" color="text.secondary">Speed</Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {speed} {unit}/s
                </Typography>
              </Box>
            </Grid>
          )}
          {eta && (
            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="caption" color="text.secondary">ETA</Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {Math.ceil(eta)}s
                </Typography>
              </Box>
            </Grid>
          )}
          {rate && (
            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="caption" color="text.secondary">Rate</Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {rate}%
                </Typography>
              </Box>
            </Grid>
          )}
          {total && processed !== undefined && (
            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="caption" color="text.secondary">Progress</Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {processed}/{total}
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      )}

      {/* Stats */}
      {showStats && stats.length > 0 && renderStats()}

      {/* Controls */}
      {showControls && renderControls()}
    </Box>
  );

  return (
    <Box
      className={className}
      sx={{
        width: '100%',
        position: 'relative',
        ...sx
      }}
      style={style}
      onClick={() => interactive && onClick?.(displayValue)}
      onMouseEnter={() => interactive && onHover?.(displayValue)}
      role="progressbar"
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      aria-describedBy={ariaDescribedBy}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={displayValue}
      aria-valuetext={ariaValueText || formatValue(displayValue)}
    >
      {/* Custom CSS for animations */}
      <style>
        {`
          @keyframes stripe-animation {
            0% { background-position: 0 0; }
            100% { background-position: 40px 0; }
          }
          @keyframes glow-animation {
            0%, 100% { box-shadow: 0 0 5px ${color}, 0 0 10px ${alpha(color, 0.5)}; }
            50% { box-shadow: 0 0 10px ${color}, 0 0 20px ${alpha(color, 0.7)}; }
          }
        `}
      </style>

      {/* Enterprise styling wrapper */}
      {enterprise ? (
        <Card
          elevation={0}
          sx={{
            borderRadius: 4,
            border: '1px solid',
            borderColor: 'divider',
            background: 'white',
            transition: 'all 0.3s ease',
            '&:hover': {
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)'
            }
          }}
        >
          <CardContent sx={{ p: 4 }}>
            {mainContent()}
          </CardContent>
        </Card>
      ) : (
        mainContent()
      )}
    </Box>
  );
};

// Specialized progress components
export const LinearProgressBar: React.FC<Omit<ProgressProps, 'variant'>> = (props) => (
  <Progress {...props} variant="linear" />
);

export const CircularProgressRing: React.FC<Omit<ProgressProps, 'variant'>> = (props) => (
  <Progress {...props} variant="circular" />
);

export const DashboardGauge: React.FC<Omit<ProgressProps, 'variant'>> = (props) => (
  <Progress {...props} variant="dashboard" />
);

export const StepProgressBar: React.FC<Omit<ProgressProps, 'variant'>> = (props) => (
  <Progress {...props} variant="step" />
);

export const TimelineProgress: React.FC<Omit<ProgressProps, 'variant'>> = (props) => (
  <Progress {...props} variant="timeline" />
);

export const EnterpriseProgress: React.FC<ProgressProps> = (props) => (
  <Progress
    {...props}
    enterprise={true}
    showQuickStats={true}
    animated={true}
    gradient={true}
    glow={true}
  />
);

export const FileUploadProgress: React.FC<Omit<ProgressProps, 'variant' | 'showStats'>> = (props) => (
  <Progress
    {...props}
    variant="linear"
    showStats={true}
    showControls={true}
    stats={[
      { label: 'Speed', value: props.speed || 0, icon: <TrendingUp size={16} />, unit: 'MB/s' },
      { label: 'ETA', value: props.eta || 0, icon: <Clock size={16} />, unit: 's' },
      { label: 'Processed', value: props.processed || 0, icon: <FileText size={16} /> }
    ]}
  />
);

export const DocumentSigningProgress: React.FC<Omit<ProgressProps, 'variant' | 'steps'>> = (props) => (
  <Progress
    {...props}
    variant="step"
    steps={4}
    stepLabels={['Document Uploaded', 'Signature Applied', 'Verification Complete', 'Document Signed']}
    stepDescriptions={[
      'Your document has been successfully uploaded',
      'Digital signature has been applied',
      'Document verification is complete',
      'Document signing process finished'
    ]}
    enterprise={true}
  />
);

export default Progress;
