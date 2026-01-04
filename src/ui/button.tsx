import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  Button as MuiButton,
  Box,
  Typography,
  IconButton,
  CircularProgress,
  Tooltip,
  Zoom,
  Fade,
  alpha,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Plus,
  Download,
  Upload,
  RefreshCw,
  Play,
  Pause,
  Stop,
  Save,
  Send,
  Check,
  X,
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  ExternalLink,
  Maximize2,
  Minimize2,
  Settings,
  Filter,
  Search,
  Edit,
  Trash2,
  Copy,
  Share2,
  Heart,
  Star,
  ThumbsUp,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Bell,
  Calendar,
  Clock,
  MapPin,
  Users,
  UserPlus,
  FileText,
  Folder,
  Image,
  Video,
  Music,
  Archive,
  Code,
  Database,
  Globe,
  Zap,
  Flame,
  Snowflake,
  Sun,
  Moon,
  Cloud,
  Shield,
  Award,
  Trophy,
  Target,
  Flag,
  Home,
  Menu,
  MoreHorizontal,
  MoreVertical,
  ChevronRight,
  ChevronLeft,
  ChevronUp,
  ChevronDown,
  RotateCw,
  RotateCcw,
  FlipHorizontal,
  FlipVertical,
  ZoomIn,
  ZoomOut,
  Expand,
  Compress,
  Grid3x3,
  List,
  Table,
  BarChart3,
  PieChart,
  TrendingUp,
  TrendingDown,
  Activity,
  BellRing,
  MessageCircle,
  Phone,
  Mail,
  Link,
  Unlink,
  Power,
  PowerOff,
  Wifi,
  WifiOff,
  Bluetooth,
  BluetoothOff,
  Airplay,
  Cast,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Camera,
  CameraOff,
  VideoOff,
  ImageOff,
  MusicOff,
  FileMinus,
  FilePlus,
  FolderMinus,
  FolderPlus,
  Archive,
  Unarchive,
  DownloadCloud,
  UploadCloud,
  HardDrive,
  Monitor,
  Tablet,
  Smartphone,
  Watch,
  Printer,
  Scanner,
  MousePointer,
  Keyboard,
  Gamepad2,
  Headphones,
  Speaker,
  Battery,
  BatteryCharging,
  BatteryFull,
  BatteryLow,
  BatteryMedium,
  Signal,
  SignalLow,
  SignalMedium,
  SignalHigh,
  WifiZero,
  WifiLow,
  WifiMedium,
  WifiHigh,
  LockOpen,
  LockClosed,
  Unlock,
  ShieldCheck,
  ShieldOff,
  ShieldAlert,
  Award,
  Medal,
  Trophy,
  Flag,
  Target,
  Crosshair,
  Compass,
  Map,
  Navigation,
  Locate,
  LocateFixed,
  Globe,
  Globe2,
  Network,
  Server,
  Database,
  HardDrive,
  Monitor,
  Tablet,
  Smartphone,
  Watch,
  Printer,
  Scanner,
  MousePointer,
  Keyboard,
  Gamepad2,
  Headphones,
  Speaker,
  Microphone,
  Webcam,
  Camera,
  Video,
  Image,
  Picture,
  Photo,
  Film,
  Movie,
  Tv,
  Monitor,
  Screen,
  Display,
  Projector,
  Speaker,
  Headphone,
  Earphone,
  Microphone,
  Webcam,
  Camera,
  Video,
  Image,
  Picture,
  Photo,
  Film,
  Movie,
  Tv,
  Monitor,
  Screen,
  Display,
  Projector
} from 'lucide-react';

// Types
type ButtonVariant = 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'neutral' | 'outline' | 'ghost' | 'link';
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type ButtonShape = 'rounded' | 'pill' | 'square';
type ButtonStyle = 'filled' | 'outlined' | 'ghost' | 'elevated';
type ButtonWidth = 'auto' | 'full' | 'fixed';
type LoadingVariant = 'spinner' | 'dots' | 'pulse' | 'bar';
type IconPosition = 'left' | 'right' | 'top' | 'bottom' | 'only';

interface ButtonIcon {
  icon: React.ReactNode;
  position?: IconPosition;
  size?: number;
  color?: string;
  animated?: boolean;
  pulse?: boolean;
  bounce?: boolean;
  rotate?: number;
}

interface ButtonLoading {
  loading: boolean;
  text?: string;
  variant?: LoadingVariant;
  size?: 'small' | 'medium' | 'large';
  color?: string;
  position?: 'left' | 'right' | 'center' | 'replace';
}

interface ButtonState {
  disabled?: boolean;
  loading?: boolean;
  success?: boolean;
  error?: boolean;
  warning?: boolean;
}

interface ButtonAction {
  icon?: React.ReactNode;
  label: string;
  onClick: () => void;
  color?: ButtonVariant;
  variant?: 'text' | 'outlined' | 'contained';
  disabled?: boolean;
  loading?: boolean;
}

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  style?: ButtonStyle;
  shape?: ButtonShape;
  icon?: React.ReactNode | ButtonIcon;
  loading?: ButtonLoading | boolean;
  disabled?: boolean;
  success?: boolean;
  error?: boolean;
  warning?: boolean;
  width?: ButtonWidth;
  fullWidth?: boolean;
  minWidth?: number;
  maxWidth?: number;
  height?: number;
  actions?: ButtonAction[];
  dropdown?: React.ReactNode;
  split?: boolean;
  toggle?: boolean;
  pressed?: boolean;
  groupPosition?: 'left' | 'middle' | 'right' | 'single';
  href?: string;
  target?: string;
  rel?: string;
  download?: string;
  type?: 'button' | 'submit' | 'reset';
  form?: string;
  formAction?: string;
  formEncType?: string;
  formMethod?: string;
  formNoValidate?: boolean;
  formTarget?: string;
  name?: string;
  value?: string | number | readonly string[];
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onSubmit?: (event: React.FormEvent<HTMLButtonElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLButtonElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLButtonElement>) => void;
  onMouseEnter?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseLeave?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
  onKeyUp?: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
  className?: string;
  style?: React.CSSProperties;
  title?: string;
  tooltip?: string;
  tooltipPlacement?: 'top' | 'bottom' | 'left' | 'right';
  tooltipArrow?: boolean;
  tooltipEnterDelay?: number;
  tooltipLeaveDelay?: number;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
  ariaExpanded?: boolean;
  ariaHasPopup?: boolean | 'false' | 'true' | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog';
  ariaPressed?: boolean | 'mixed';
  role?: string;
  tabIndex?: number;
  disableFocusRipple?: boolean;
  disableRipple?: boolean;
  disableTouchRipple?: boolean;
  focusVisibleClassName?: string;
  TouchRippleProps?: object;
  touchRippleRef?: React.Ref<any>;
  elevation?: number;
  shadow?: boolean;
  glow?: boolean;
  glowColor?: string;
  glowIntensity?: number;
  border?: boolean;
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number;
  gradient?: boolean;
  gradientDirection?: 'to right' | 'to left' | 'to top' | 'to bottom' | 'to top right' | 'to top left' | 'to bottom right' | 'to bottom left';
  gradientColors?: string[];
  animate?: boolean;
  animation?: 'fade' | 'slide' | 'zoom' | 'bounce' | 'pulse' | 'none';
  transitionDuration?: number;
  enterDelay?: number;
  exitDelay?: number;
  children?: React.ReactNode;
  renderContent?: (props: ButtonProps) => React.ReactNode;
  renderLoading?: (loading: ButtonLoading) => React.ReactNode;
  renderIcon?: (icon: ButtonIcon) => React.ReactNode;
  'data-testid'?: string;
  'data-id'?: string;
  'data-action'?: string;
}

interface ButtonGroupProps {
  buttons: ButtonProps[];
  variant?: ButtonVariant;
  size?: ButtonSize;
  orientation?: 'horizontal' | 'vertical';
  spacing?: number;
  fullWidth?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

interface IconButtonProps extends Omit<ButtonProps, 'children' | 'fullWidth'> {
  icon: React.ReactNode;
  ariaLabel: string;
}

interface FloatingActionButtonProps extends Omit<ButtonProps, 'width' | 'fullWidth' | 'groupPosition'> {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
  offset?: { x: number; y: number };
  autoHide?: boolean;
  scrollThreshold?: number;
}

interface SplitButtonProps extends Omit<ButtonProps, 'dropdown' | 'split'> {
  mainAction: ButtonAction;
  secondaryActions: ButtonAction[];
  dropdownIcon?: React.ReactNode;
}

interface ToggleButtonProps extends Omit<ButtonProps, 'toggle' | 'pressed'> {
  pressed: boolean;
  onToggle: (pressed: boolean) => void;
}

// Default icons mapping
const variantIcons = {
  primary: <Plus size={16} />,
  secondary: <Settings size={16} />,
  success: <Check size={16} />,
  error: <X size={16} />,
  warning: <AlertTriangle size={16} />,
  info: <Info size={16} />,
  neutral: <Circle size={16} />,
  outline: <Plus size={16} />,
  ghost: <Plus size={16} />,
  link: <ArrowRight size={16} />
};

// Size mapping
const sizeMap = {
  xs: { height: 24, fontSize: '0.75rem', padding: '0 8px', iconSize: 14, gap: 4 },
  sm: { height: 32, fontSize: '0.875rem', padding: '0 12px', iconSize: 16, gap: 6 },
  md: { height: 40, fontSize: '0.875rem', padding: '0 16px', iconSize: 18, gap: 8 },
  lg: { height: 48, fontSize: '1rem', padding: '0 20px', iconSize: 20, gap: 10 },
  xl: { height: 56, fontSize: '1.125rem', padding: '0 24px', iconSize: 24, gap: 12 }
};

// Color mapping
const getVariantColors = (variant: ButtonVariant, theme: any) => {
  const colorMap = {
    primary: theme.palette.primary,
    secondary: theme.palette.secondary,
    success: theme.palette.success,
    error: theme.palette.error,
    warning: theme.palette.warning,
    info: theme.palette.info,
    neutral: theme.palette.grey
  };
  return colorMap[variant] || theme.palette.primary;
};

// Animation keyframes
const animationStyles = {
  fade: {
    '@keyframes fadeIn': {
      '0%': { opacity: 0 },
      '100%': { opacity: 1 }
    },
    animation: 'fadeIn 0.2s ease-out'
  },
  slide: {
    '@keyframes slideIn': {
      '0%': { transform: 'translateY(10px)', opacity: 0 },
      '100%': { transform: 'translateY(0)', opacity: 1 }
    },
    animation: 'slideIn 0.2s ease-out'
  },
  zoom: {
    '@keyframes zoomIn': {
      '0%': { transform: 'scale(0.95)', opacity: 0 },
      '100%': { transform: 'scale(1)', opacity: 1 }
    },
    animation: 'zoomIn 0.2s ease-out'
  },
  bounce: {
    '@keyframes bounce': {
      '0%, 20%, 53%, 80%, 100%': { transform: 'translateY(0)' },
      '40%, 43%': { transform: 'translateY(-3px)' },
      '70%': { transform: 'translateY(-2px)' }
    },
    animation: 'bounce 0.5s infinite'
  },
  pulse: {
    '@keyframes pulse': {
      '0%, 100%': { transform: 'scale(1)' },
      '50%': { transform: 'scale(1.05)' }
    },
    animation: 'pulse 2s infinite'
  }
};

// Loading Components
function LoadingSpinner({ size, color }: { size: number; color: string }) {
  return (
    <CircularProgress
      size={size}
      sx={{
        color: color,
        animation: 'spin 1s linear infinite'
      }}
    />
  );
}

function LoadingDots({ size, color }: { size: number; color: string }) {
  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      {[0, 1, 2].map((i) => (
        <Box
          key={i}
          sx={{
            width: size * 0.2,
            height: size * 0.2,
            borderRadius: '50%',
            backgroundColor: color,
            animation: `bounce 1.4s infinite ease-in-out both`,
            animationDelay: `${i * 0.16}s`
          }}
        />
      ))}
    </Box>
  );
}

function LoadingBar({ size, color }: { size: number; color: string }) {
  return (
    <Box
      sx={{
        width: size * 1.5,
        height: 2,
        backgroundColor: alpha(color, 0.3),
        borderRadius: 1,
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      <Box
        sx={{
          height: '100%',
          width: '100%',
          backgroundColor: color,
          borderRadius: 1,
          animation: 'loading-bar 1.5s infinite ease-in-out'
        }}
      />
    </Box>
  );
}

// Icon Component
function ButtonIcon({ icon, loading, disabled }: { 
  icon: ButtonIcon | React.ReactNode; 
  loading: boolean;
  disabled: boolean;
}) {
  const iconConfig = typeof icon === 'object' && 'icon' in icon ? icon : { icon, position: 'left' as const };
  const { icon: iconElement, position, size, color, animated, pulse, bounce, rotate } = iconConfig;

  if (loading) return null;

  const iconColor = disabled ? 'text.disabled' : (color || 'currentColor');
  const iconSize = size || 18;

  const iconStyles = {
    fontSize: iconSize,
    color: iconColor,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...(animated && { transition: 'all 0.2s ease' }),
    ...(pulse && { animation: 'pulse 2s infinite' }),
    ...(bounce && { animation: 'bounce 1s infinite' }),
    ...(rotate && { transform: `rotate(${rotate}deg)` })
  };

  return (
    <Box sx={iconStyles}>
      {iconElement}
    </Box>
  );
}

// Main Button Component
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  style = 'filled',
  shape = 'rounded',
  icon,
  loading: loadingProp = false,
  disabled = false,
  success = false,
  error = false,
  warning = false,
  width = 'auto',
  fullWidth = false,
  minWidth,
  maxWidth,
  height,
  actions,
  dropdown,
  split = false,
  toggle = false,
  pressed = false,
  groupPosition = 'single',
  href,
  target,
  rel,
  download,
  type = 'button',
  form,
  formAction,
  formEncType,
  formMethod,
  formNoValidate,
  formTarget,
  name,
  value,
  onClick,
  onSubmit,
  onFocus,
  onBlur,
  onMouseEnter,
  onMouseEnter: onMouseEnterProp,
  onMouseLeave,
  onMouseLeave: onMouseLeaveProp,
  onKeyDown,
  onKeyUp,
  className,
  style: styleProp,
  title,
  tooltip,
  tooltipPlacement = 'top',
  tooltipArrow = true,
  tooltipEnterDelay = 500,
  tooltipLeaveDelay = 0,
  ariaLabel,
  ariaLabelledBy,
  ariaDescribedBy,
  ariaExpanded,
  ariaHasPopup,
  ariaPressed,
  role,
  tabIndex,
  disableFocusRipple = false,
  disableRipple = false,
  disableTouchRipple = false,
  focusVisibleClassName,
  TouchRippleProps,
  touchRippleRef,
  elevation = 0,
  shadow = false,
  glow = false,
  glowColor,
  glowIntensity = 0.3,
  border = false,
  borderColor,
  borderWidth = 1,
  borderRadius: customBorderRadius,
  gradient = false,
  gradientDirection = 'to right',
  gradientColors,
  animate = true,
  animation = 'fade',
  transitionDuration = 300,
  enterDelay = 0,
  exitDelay = 0,
  children: childrenProp,
  renderContent,
  renderLoading,
  renderIcon,
  'data-testid': dataTestId,
  'data-id': dataId,
  'data-action': dataAction
}: ButtonProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // State
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isPressed, setIsPressed] = useState(pressed);
  const [localLoading, setLocalLoading] = useState(false);

  // Refs
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Normalize loading prop
  const loadingConfig: ButtonLoading | null = typeof loadingProp === 'boolean' 
    ? (loadingProp ? { loading: true } : null)
    : (loadingProp || null);

  const isLoading = loadingConfig?.loading || localLoading;
  const isDisabled = disabled || isLoading || success || error || warning;

  // Colors
  const colors = getVariantColors(variant, theme);

  // Size configuration
  const sizeConfig = sizeMap[size];
  const currentSize = isMobile && size === 'xl' ? 'lg' : size;

  // Border radius
  const borderRadius = customBorderRadius ?? (
    shape === 'pill' ? 50 : 
    shape === 'square' ? 0 : 
    theme.shape.borderRadius
  );

  // Width handling
  const widthStyles = {
    auto: 'auto',
    full: '100%',
    fixed: `${minWidth || 120}px`
  };

  // Style variants
  const getStyleVariant = () => {
    switch (style) {
      case 'outlined':
        return {
          backgroundColor: 'transparent',
          color: colors.main,
          border: `1px solid ${colors.main}`,
          '&:hover': {
            backgroundColor: alpha(colors.main, 0.08),
            borderColor: colors.dark
          },
          '&:active': {
            backgroundColor: alpha(colors.main, 0.16)
          }
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          color: colors.main,
          border: 'none',
          '&:hover': {
            backgroundColor: alpha(colors.main, 0.08)
          },
          '&:active': {
            backgroundColor: alpha(colors.main, 0.16)
          }
        };
      case 'elevated':
        return {
          backgroundColor: colors.main,
          color: colors.contrastText,
          border: 'none',
          boxShadow: theme.shadows[2],
          '&:hover': {
            backgroundColor: colors.dark,
            boxShadow: theme.shadows[4]
          },
          '&:active': {
            boxShadow: theme.shadows[1]
          }
        };
      default: // filled
        return {
          backgroundColor: colors.main,
          color: colors.contrastText,
          border: 'none',
          '&:hover': {
            backgroundColor: colors.dark
          },
          '&:active': {
            backgroundColor: colors.dark
          }
        };
    }
  };

  // State styles
  const getStateStyles = () => {
    if (success) {
      return {
        backgroundColor: theme.palette.success.main,
        color: theme.palette.success.contrastText,
        '&:hover': {
          backgroundColor: theme.palette.success.dark
        }
      };
    }
    
    if (error) {
      return {
        backgroundColor: theme.palette.error.main,
        color: theme.palette.error.contrastText,
        '&:hover': {
          backgroundColor: theme.palette.error.dark
        }
      };
    }
    
    if (warning) {
      return {
        backgroundColor: theme.palette.warning.main,
        color: theme.palette.warning.contrastText,
        '&:hover': {
          backgroundColor: theme.palette.warning.dark
        }
      };
    }
    
    return {};
  };

  // Group position styles
  const getGroupStyles = () => {
    if (groupPosition === 'left') {
      return {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0
      };
    } else if (groupPosition === 'right') {
      return {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0
      };
    } else if (groupPosition === 'middle') {
      return {
        borderRadius: 0
      };
    }
    return {};
  };

  // Gradient styles
  const gradientStyles = gradient ? {
    background: `linear-gradient(${gradientDirection}, ${gradientColors?.join(', ') || `${colors.main}, ${colors.light}`})`,
    border: 'none'
  } : {};

  // Glow effect
  const glowStyles = glow ? {
    boxShadow: `0 0 ${glowIntensity * 20}px ${glowColor || colors.main}`,
    '&:hover': {
      boxShadow: `0 0 ${glowIntensity * 30}px ${glowColor || colors.main}`
    }
  } : {};

  // Shadow effect
  const shadowStyles = shadow || elevation > 0 ? {
    boxShadow: theme.shadows[elevation || 2],
    '&:hover': {
      boxShadow: theme.shadows[elevation ? elevation + 2 : 4]
    }
  } : {};

  // Border effect
  const borderStyles = border ? {
    border: `${borderWidth}px solid ${borderColor || colors.main}`
  } : {};

  // Animation styles
  const animationStyles = animate && animation !== 'none' ? {
    ...getAnimationStyles()[animation]
  } : {};

  // Handle click
  const handleClick = useCallback(async (event: React.MouseEvent<HTMLButtonElement>) => {
    if (isDisabled) return;

    // Handle toggle buttons
    if (toggle) {
      setIsPressed(!isPressed);
    }

    // Handle async onClick
    if (onClick) {
      try {
        if (loadingConfig?.position === 'replace') {
          setLocalLoading(true);
        }
        await onClick(event);
      } catch (error) {
        console.error('Button click error:', error);
      } finally {
        if (loadingConfig?.position === 'replace') {
          setLocalLoading(false);
        }
      }
    }
  }, [onClick, isDisabled, toggle, isPressed, loadingConfig]);

  // Handle mouse events
  const handleMouseEnter = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setIsHovered(true);
    onMouseEnterProp?.(event);
  }, [onMouseEnterProp]);

  const handleMouseLeave = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setIsHovered(false);
    onMouseLeaveProp?.(event);
  }, [onMouseLeaveProp]);

  // Handle focus events
  const handleFocus = useCallback((event: React.FocusEvent<HTMLButtonElement>) => {
    setIsFocused(true);
    onFocus?.(event);
  }, [onFocus]);

  const handleBlur = useCallback((event: React.FocusEvent<HTMLButtonElement>) => {
    setIsFocused(false);
    onBlur?.(event);
  }, [onBlur]);

  // Loading content
  const renderLoadingContent = () => {
    if (!loadingConfig) return null;

    const { variant: loadingVariant = 'spinner', size: loadingSize = 'medium', color: loadingColor, position = 'left' } = loadingConfig;
    const loadingIconColor = loadingColor || (style === 'filled' ? 'inherit' : 'currentColor');
    const loadingIconSize = loadingSize === 'small' ? 16 : loadingSize === 'large' ? 24 : sizeConfig.iconSize;

    const loadingContent = renderLoading ? (
      renderLoading(loadingConfig)
    ) : (
      <>
        {loadingVariant === 'spinner' && <LoadingSpinner size={loadingIconSize} color={loadingIconColor} />}
        {loadingVariant === 'dots' && <LoadingDots size={loadingIconSize} color={loadingIconColor} />}
        {loadingVariant === 'bar' && <LoadingBar size={loadingIconSize} color={loadingIconColor} />}
        {loadingVariant === 'pulse' && <Box sx={{ width: loadingIconSize, height: loadingIconSize, backgroundColor: loadingIconColor, borderRadius: '50%', animation: 'pulse 1s infinite' }} />}
      </>
    );

    if (position === 'replace') {
      return loadingContent;
    }

    if (position === 'center') {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
          {loadingContent}
          {loadingConfig.text && (
            <Typography variant="body2" sx={{ fontSize: sizeConfig.fontSize }}>
              {loadingConfig.text}
            </Typography>
          )}
        </Box>
      );
    }

    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: sizeConfig.gap }}>
        {position === 'left' && loadingContent}
        {loadingConfig.text && (
          <Typography variant="body2" sx={{ fontSize: sizeConfig.fontSize }}>
            {loadingConfig.text}
          </Typography>
        )}
        {position === 'right' && loadingContent}
      </Box>
    );
  };

  // Icon content
  const renderIconContent = () => {
    if (!icon || isLoading) return null;

    const iconConfig = typeof icon === 'object' && 'icon' in icon ? icon : { icon, position: 'left' as const };
    
    if (renderIcon) {
      return renderIcon(iconConfig);
    }

    return <ButtonIcon icon={iconConfig} loading={isLoading} disabled={isDisabled} />;
  };

  // Main content
  const renderMainContent = () => {
    if (renderContent) {
      return renderContent({
        children,
        variant,
        size,
        style,
        shape,
        icon,
        loading: loadingConfig,
        disabled,
        success,
        error,
        warning,
        width,
        fullWidth,
        minWidth,
        maxWidth,
        height,
        actions,
        dropdown,
        split,
        toggle,
        pressed: isPressed,
        groupPosition,
        href,
        target,
        rel,
        download,
        type,
        form,
        formAction,
        formEncType,
        formMethod,
        formNoValidate,
        formTarget,
        name,
        value,
        onClick,
        onSubmit,
        onFocus,
        onBlur,
        onMouseEnter,
        onMouseLeave,
        onKeyDown,
        onKeyUp,
        className,
        style: styleProp,
        title,
        tooltip,
        tooltipPlacement,
        tooltipArrow,
        tooltipEnterDelay,
        tooltipLeaveDelay,
        ariaLabel,
        ariaLabelledBy,
        ariaDescribedBy,
        ariaExpanded,
        ariaHasPopup,
        ariaPressed,
        role,
        tabIndex,
        disableFocusRipple,
        disableRipple,
        disableTouchRipple,
        focusVisibleClassName,
        TouchRippleProps,
        touchRippleRef,
        elevation,
        shadow,
        glow,
        glowColor,
        glowIntensity,
        border,
        borderColor,
        borderWidth,
        borderRadius,
        gradient,
        gradientDirection,
        gradientColors,
        animate,
        animation,
        transitionDuration,
        enterDelay,
        exitDelay,
        children: childrenProp,
        renderContent,
        renderLoading,
        renderIcon,
        'data-testid': dataTestId,
        'data-id': dataId,
        'data-action': dataAction
      });
    }

    if (isLoading) {
      return renderLoadingContent();
    }

    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: sizeConfig.gap }}>
        {renderIconContent()}
        <Typography
          component="span"
          sx={{
            fontSize: sizeConfig.fontSize,
            fontWeight: 600,
            lineHeight: 1,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {children}
        </Typography>
        {actions && actions.length > 0 && (
          <Box sx={{ display: 'flex', gap: 0.5, ml: 0.5 }}>
            {actions.map((action, index) => (
              <IconButton
                key={index}
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  action.onClick();
                }}
                disabled={action.disabled || action.loading}
                sx={{ fontSize: sizeConfig.iconSize }}
              >
                {action.loading ? (
                  <CircularProgress size={12} />
                ) : (
                  action.icon
                )}
              </IconButton>
            ))}
          </Box>
        )}
        {dropdown && !split && (
          <IconButton size="small" sx={{ ml: 0.5 }}>
            <ChevronDown size={sizeConfig.iconSize} />
          </IconButton>
        )}
      </Box>
    );
  };

  // Button styles
  const buttonStyles = {
    minWidth: widthStyles[width],
    maxWidth: maxWidth || 'none',
    height: height || sizeConfig.height,
    padding: sizeConfig.padding,
    fontSize: sizeConfig.fontSize,
    fontWeight: 600,
    textTransform: 'none',
    borderRadius: borderRadius,
    transition: `all ${transitionDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
    ...getStyleVariant(),
    ...getStateStyles(),
    ...getGroupStyles(),
    ...gradientStyles,
    ...glowStyles,
    ...shadowStyles,
    ...borderStyles,
    ...animationStyles,
    '&:disabled': {
      opacity: 0.6,
      cursor: 'not-allowed'
    },
    '&:focus-visible': {
      outline: `2px solid ${colors.main}`,
      outlineOffset: 2
    }
  };

  // Tooltip wrapper
  const TooltipWrapper = ({ children }: { children: React.ReactNode }) => {
    if (!tooltip) return <>{children}</>;

    return (
      <Tooltip
        title={tooltip}
        placement={tooltipPlacement}
        arrow={tooltipArrow}
        enterDelay={tooltipEnterDelay}
        leaveDelay={tooltipLeaveDelay}
      >
        {children}
      </Tooltip>
    );
  };

  // Animation wrapper
  const AnimationWrapper = ({ children }: { children: React.ReactNode }) => {
    if (!animate || animation === 'none') return <>{children}</>;

    const AnimationComponent = {
      fade: Fade,
      slide: Slide,
      zoom: Zoom,
      bounce: Box,
      pulse: Box
    }[animation] || Fade;

    const animationProps = {
      fade: { in: true, timeout: transitionDuration, style: { transitionDelay: `${enterDelay}ms` } },
      slide: { in: true, timeout: transitionDuration, direction: 'up' as const, style: { transitionDelay: `${enterDelay}ms` } },
      zoom: { in: true, timeout: transitionDuration, style: { transitionDelay: `${enterDelay}ms` } },
      bounce: { sx: { animation: 'bounce 0.5s ease-in-out' } },
      pulse: { sx: { animation: 'pulse 2s infinite' } }
    }[animation];

    return (
      <AnimationComponent {...animationProps}>
        {children}
      </AnimationComponent>
    );
  };

  // Determine button component
  const ButtonComponent = href ? 'a' : split ? 'div' : MuiButton;

  // Button props
  const buttonProps = {
    // Common props
    className,
    style: styleProp,
    title,
    disabled: isDisabled,
    tabIndex,
    role,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    'aria-describedby': ariaDescribedBy,
    'aria-expanded': ariaExpanded,
    'aria-haspopup': ariaHasPopup,
    'aria-pressed': toggle ? isPressed : ariaPressed,
    'data-testid': dataTestId,
    'data-id': dataId,
    'data-action': dataAction,

    // Event handlers
    onClick: split ? undefined : handleClick,
    onSubmit,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onKeyDown,
    onKeyUp,

    // Link props
    ...(href && {
      href: isDisabled ? undefined : href,
      target,
      rel,
      download
    }),

    // Form props
    ...(type === 'submit' && {
      type,
      form,
      formAction,
      formEncType,
      formMethod,
      formNoValidate,
      formTarget,
      name,
      value
    }),

    // Material-UI specific props
    ...(ButtonComponent === MuiButton && {
      disableFocusRipple,
      disableRipple,
      disableTouchRipple,
      focusVisibleClassName,
      TouchRippleProps,
      touchRippleRef
    })
  };

  // Split button layout
  if (split) {
    return (
      <AnimationWrapper>
        <TooltipWrapper>
          <Box
            sx={{
              display: 'inline-flex',
              borderRadius: borderRadius,
              overflow: 'hidden',
              boxShadow: elevation > 0 ? theme.shadows[elevation] : 'none',
              ...borderStyles
            }}
          >
            {/* Main button */}
            <Box
              component="button"
              {...buttonProps}
              onClick={handleClick}
              sx={{
                ...buttonStyles,
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
                borderRight: `1px solid ${alpha(colors.contrastText, 0.2)}`,
                '&:hover': {
                  borderRightColor: alpha(colors.contrastText, 0.3)
                }
              }}
            >
              {renderMainContent()}
            </Box>

            {/* Dropdown button */}
            <Box
              component="button"
              sx={{
                ...buttonStyles,
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                minWidth: 'auto',
                px: 2
              }}
              onClick={(e) => {
                e.stopPropagation();
                // Handle dropdown
              }}
            >
              <ChevronDown size={sizeConfig.iconSize} />
            </Box>
          </Box>
        </TooltipWrapper>
      </AnimationWrapper>
    );
  }

  return (
    <AnimationWrapper>
      <TooltipWrapper>
        <Box
          component={ButtonComponent}
          ref={buttonRef}
          {...buttonProps}
          sx={{
            ...buttonStyles,
            width: fullWidth ? '100%' : buttonStyles.minWidth,
            height: buttonStyles.height,
            minHeight: buttonStyles.height,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: sizeConfig.gap,
            textDecoration: 'none',
            position: 'relative',
            overflow: 'hidden',
            ...styleProp
          }}
        >
          {renderMainContent()}
          {dropdown && (
            <Box sx={{ ml: 0.5 }}>
              <ChevronDown size={sizeConfig.iconSize} />
            </Box>
          )}
        </Box>
      </TooltipWrapper>
    </AnimationWrapper>
  );
}

/* ============================
 * Specialized Button Components
 * ============================
 */

// Icon Button
export function IconButton({
  icon,
  variant = 'primary',
  size = 'md',
  style = 'ghost',
  shape = 'rounded',
  loading = false,
  disabled = false,
  success = false,
  error = false,
  warning = false,
  tooltip,
  tooltipPlacement = 'top',
  tooltipArrow = true,
  ariaLabel,
  onClick,
  className,
  style: styleProp,
  ...buttonProps
}: IconButtonProps) {
  return (
    <Button
      variant={variant}
      size={size}
      style={style}
      shape={shape}
      icon={{ icon, position: 'only' as const }}
      loading={loading}
      disabled={disabled}
      success={success}
      error={error}
      warning={warning}
      tooltip={tooltip}
      tooltipPlacement={tooltipPlacement}
      tooltipArrow={tooltipArrow}
      ariaLabel={ariaLabel}
      onClick={onClick}
      className={className}
      style={styleProp}
      {...buttonProps}
    >
      {ariaLabel}
    </Button>
  );
}

// Floating Action Button
export function FloatingActionButton({
  position = 'bottom-right',
  offset = { x: 24, y: 24 },
  autoHide = false,
  scrollThreshold = 100,
  ...buttonProps
}: FloatingActionButtonProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (!autoHide) return;

    const handleScroll = () => {
      const scrolled = window.scrollY > scrollThreshold;
      setIsScrolled(scrolled);
      setIsVisible(!scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [autoHide, scrollThreshold]);

  const positionStyles = {
    'top-left': { top: offset.y, left: offset.x },
    'top-right': { top: offset.y, right: offset.x },
    'bottom-left': { bottom: offset.y, left: offset.x },
    'bottom-right': { bottom: offset.y, right: offset.x },
    'center': { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }
  };

  return (
    <Zoom
      in={isVisible}
      timeout={300}
      unmountOnExit
    >
      <Box
        sx={{
          position: 'fixed',
          zIndex: 1000,
          ...positionStyles[position]
        }}
      >
        <Button
          variant="primary"
          size="lg"
          shape="pill"
          elevation={6}
          glow
          {...buttonProps}
        />
      </Box>
    </Zoom>
  );
}

// Split Button
export function SplitButton({
  mainAction,
  secondaryActions,
  dropdownIcon = <ChevronDown size={16} />,
  ...buttonProps
}: SplitButtonProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleMainClick = () => {
    mainAction.onClick();
  };

  const handleDropdownClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleActionSelect = (action: ButtonAction) => {
    action.onClick();
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: 'inline-flex' }}>
      <Button
        {...buttonProps}
        onClick={handleMainClick}
        split={true}
        actions={[mainAction]}
      >
        {mainAction.label}
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {secondaryActions.map((action, index) => (
          <MenuItem
            key={index}
            onClick={() => handleActionSelect(action)}
            disabled={action.disabled || action.loading}
          >
            {action.icon && <Box sx={{ mr: 1 }}>{action.icon}</Box>}
            {action.label}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}

// Toggle Button
export function ToggleButton({
  pressed,
  onToggle,
  children,
  ...buttonProps
}: ToggleButtonProps) {
  return (
    <Button
      {...buttonProps}
      toggle={true}
      pressed={pressed}
      onClick={(e) => {
        onToggle(!pressed);
        buttonProps.onClick?.(e);
      }}
    >
      {children}
    </Button>
  );
}

// Button Group
export function ButtonGroup({
  buttons,
  variant = 'primary',
  size = 'md',
  orientation = 'horizontal',
  spacing = 0,
  fullWidth = false,
  className,
  style
}: ButtonGroupProps) {
  const theme = useTheme();

  return (
    <Box
      className={className}
      style={style}
      sx={{
        display: orientation === 'horizontal' ? 'flex' : 'inline-flex',
        flexDirection: orientation === 'vertical' ? 'column' : 'row',
        gap: spacing,
        width: fullWidth ? '100%' : 'auto',
        '& > *': {
          borderRadius: 0,
          '&:first-of-type': {
            borderTopLeftRadius: theme.shape.borderRadius,
            borderBottomLeftRadius: theme.shape.borderRadius
          },
          '&:last-of-type': {
            borderTopRightRadius: theme.shape.borderRadius,
            borderBottomRightRadius: theme.shape.borderRadius
          },
          '&:not(:last-of-type)': {
            borderRight: orientation === 'horizontal' ? 'none' : undefined,
            borderBottom: orientation === 'vertical' ? 'none' : undefined
          }
        }
      }}
    >
      {buttons.map((button, index) => (
        <Button
          key={index}
          {...button}
          variant={button.variant || variant}
          size={button.size || size}
          groupPosition={index === 0 ? 'left' : index === buttons.length - 1 ? 'right' : 'middle'}
          fullWidth={fullWidth}
        />
      ))}
    </Box>
  );
}

// Social Button
interface SocialButtonProps extends Omit<ButtonProps, 'variant' | 'icon'> {
  platform: 'google' | 'facebook' | 'twitter' | 'linkedin' | 'github' | 'apple' | 'microsoft';
  text?: string;
}

export function SocialButton({
  platform,
  text,
  ...buttonProps
}: SocialButtonProps) {
  const socialConfig = {
    google: { color: '#4285F4', icon: <span>G</span>, text: 'Continue with Google' },
    facebook: { color: '#1877F2', icon: <span>f</span>, text: 'Continue with Facebook' },
    twitter: { color: '#1DA1F2', icon: <span>T</span>, text: 'Continue with Twitter' },
    linkedin: { color: '#0077B5', icon: <span>in</span>, text: 'Continue with LinkedIn' },
    github: { color: '#333333', icon: <span>GitHub</span>, text: 'Continue with GitHub' },
    apple: { color: '#000000', icon: <span>🍎</span>, text: 'Continue with Apple' },
    microsoft: { color: '#0078D4', icon: <span>M</span>, text: 'Continue with Microsoft' }
  };

  const config = socialConfig[platform] || socialConfig.google;

  return (
    <Button
      {...buttonProps}
      variant="outline"
      style="outlined"
      icon={{ icon: config.icon, position: 'left' }}
      sx={{
        backgroundColor: 'white',
        color: config.color,
        borderColor: config.color,
        '&:hover': {
          backgroundColor: alpha(config.color, 0.08),
          borderColor: config.color
        }
      }}
    >
      {text || config.text}
    </Button>
  );
}

// Upload Button
interface UploadButtonProps extends Omit<ButtonProps, 'onClick'> {
  onFileSelect: (files: FileList) => void;
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
  showProgress?: boolean;
  onProgress?: (progress: number) => void;
}

export function UploadButton({
  onFileSelect,
  accept,
  multiple = false,
  maxSize = 10 * 1024 * 1024, // 10MB
  showProgress = false,
  onProgress,
  children,
  ...buttonProps
}: UploadButtonProps) {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    // Validate files
    const validFiles = Array.from(files).filter(file => {
      if (file.size > maxSize) {
        console.error(`File ${file.name} exceeds maximum size of ${maxSize} bytes`);
        return false;
      }
      return true;
    });

    if (validFiles.length > 0) {
      setIsUploading(true);
      setUploadProgress(0);

      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          const newProgress = prev + 10;
          onProgress?.(newProgress);
          
          if (newProgress >= 100) {
            clearInterval(interval);
            setIsUploading(false);
            onFileSelect({ 
              length: validFiles.length,
              item: (index: number) => validFiles[index],
              ...validFiles 
            } as FileList);
          }
          
          return newProgress;
        });
      }, 200);
    }
  };

  return (
    <>
      <Button
        {...buttonProps}
        component="label"
        loading={isUploading ? { loading: true, variant: 'bar', value: uploadProgress } : false}
      >
        {children}
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />
      </Button>
    </>
  );
}

// Copy Button
interface CopyButtonProps extends Omit<ButtonProps, 'onClick'> {
  text: string;
  copyText?: string;
  showSuccess?: boolean;
  successDuration?: number;
}

export function CopyButton({
  text,
  copyText,
  showSuccess = true,
  successDuration = 2000,
  children,
  ...buttonProps
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(copyText || text);
      setCopied(true);
      
      if (showSuccess) {
        setTimeout(() => setCopied(false), successDuration);
      }
    } catch (error) {
      console.error('Failed to copy text:', error);
    }
  }, [text, copyText, showSuccess, successDuration]);

  return (
    <Button
      {...buttonProps}
      onClick={handleCopy}
      success={copied && showSuccess}
      icon={copied && showSuccess ? 
        { icon: <Check size={16} />, position: 'left' } : 
        buttonProps.icon
      }
    >
      {copied && showSuccess ? 'Copied!' : children}
    </Button>
  );
}

/* ============================
 * Export Default
 * ============================
 */

export default Button;
