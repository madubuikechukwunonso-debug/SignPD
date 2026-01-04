
import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import {
  Popover as MuiPopover,
  Paper,
  Typography,
  Box,
  IconButton,
  Button,
  Stack,
  Divider,
  alpha,
  Fade,
  Zoom,
  Slide,
  Grow,
  Collapse,
  Card,
  CardContent,
  CardActions,
  CardHeader,
  Avatar,
  Chip,
  Badge,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  ListItemAvatar,
  Tooltip,
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Switch,
  Checkbox,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormGroup,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  X,
  ChevronRight,
  ChevronLeft,
  ChevronUp,
  ChevronDown,
  MoreVertical,
  MoreHorizontal,
  Info,
  AlertTriangle,
  CheckCircle,
  Warning,
  HelpCircle,
  Question,
  Lightbulb,
  Target,
  Flag,
  Bookmark,
  Heart,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Bell,
  Notification,
  Settings,
  User,
  Users,
  Shield,
  Lock,
  Unlock,
  Key,
  Fingerprint,
  CreditCard,
  DollarSign,
  Percent,
  Hash,
  AtSign,
  Paperclip,
  Globe,
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  BellRing,
  Settings2,
  HelpCircle as HelpIcon,
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
  Download,
  Upload,
  Copy,
  RefreshCw,
  RotateCcw,
  RotateCw,
  Zap,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Activity,
  Calendar,
  Clock,
  Star,
  Award,
  Certificate,
  Verified,
  Home,
  FileText,
  Store,
  RefreshCw as RefreshIcon,
  TrendingUp as TrendUpIcon,
  Users as UsersIcon,
  Activity as ActivityIcon
} from 'lucide-react';

export type PopoverPlacement = 
  | 'top' | 'top-start' | 'top-end'
  | 'bottom' | 'bottom-start' | 'bottom-end'
  | 'left' | 'left-start' | 'left-end'
  | 'right' | 'right-start' | 'right-end';

export type PopoverVariant = 
  | 'default' 
  | 'card' 
  | 'menu' 
  | 'tooltip' 
  | 'dialog' 
  | 'dropdown' 
  | 'enterprise'
  | 'glass'
  | 'notification'
  | 'form';

export type PopoverSize = 'small' | 'medium' | 'large' | 'xlarge' | 'auto';
export type PopoverAnimation = 'fade' | 'zoom' | 'slide' | 'grow' | 'collapse' | 'none';

export interface PopoverProps {
  // Core props
  open: boolean;
  onClose: () => void;
  anchorEl: HTMLElement | null;
  children: React.ReactNode;
  
  // Positioning
  placement?: PopoverPlacement;
  offset?: [number, number];
  marginThreshold?: number;
  preventOverflow?: boolean;
  flip?: boolean;
  keepMounted?: boolean;
  
  // Styling
  variant?: PopoverVariant;
  size?: PopoverSize;
  maxWidth?: number | string;
  maxHeight?: number | string;
  minWidth?: number | string;
  minHeight?: number | string;
  
  // Animation
  animation?: PopoverAnimation;
  animationDuration?: number;
  enterDelay?: number;
  exitDelay?: number;
  
  // Behavior
  disablePortal?: boolean;
  disableRestoreFocus?: boolean;
  disableAutoFocus?: boolean;
  disableEnforceFocus?: boolean;
  disableScrollLock?: boolean;
  hideBackdrop?: boolean;
  closeOnEscape?: boolean;
  closeOnBackdropClick?: boolean;
  closeOnScroll?: boolean;
  
  // Content features
  title?: string;
  subtitle?: string;
  description?: string;
  icon?: React.ReactNode;
  actions?: Array<{
    label: string;
    onClick: () => void;
    variant?: 'text' | 'outlined' | 'contained';
    color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
    icon?: React.ReactNode;
    disabled?: boolean;
    loading?: boolean;
  }>;
  
  // Advanced features
  header?: React.ReactNode;
  footer?: React.ReactNode;
  loading?: boolean;
  loadingText?: string;
  empty?: boolean;
  emptyText?: string;
  emptyIcon?: React.ReactNode;
  error?: boolean;
  errorText?: string;
  errorIcon?: React.ReactNode;
  
  // Enterprise features
  enterprise?: boolean;
  showClose?: boolean;
  showArrow?: boolean;
  arrowColor?: string;
  arrowSize?: number;
  shadow?: boolean;
  border?: boolean;
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number;
  backgroundColor?: string;
  backdropColor?: string;
  backdropOpacity?: number;
  
  // Interactive features
  draggable?: boolean;
  resizable?: boolean;
  minimizable?: boolean;
  maximizable?: boolean;
  pinnable?: boolean;
  dismissible?: boolean;
  
  // Accessibility
  ariaLabel?: string;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
  role?: string;
  
  // Custom rendering
  renderHeader?: () => React.ReactNode;
  renderContent?: () => React.ReactNode;
  renderFooter?: () => React.ReactNode;
  renderArrow?: (props: { placement: PopoverPlacement }) => React.ReactNode;
  
  // Event handlers
  onEnter?: () => void;
  onEntering?: () => void;
  onEntered?: () => void;
  onExit?: () => void;
  onExiting?: () => void;
  onExited?: () => void;
  onBackdropClick?: () => void;
  onEscapeKeyDown?: () => void;
  
  // Styling overrides
  className?: string;
  sx?: any;
  style?: React.CSSProperties;
  contentSx?: any;
  headerSx?: any;
  footerSx?: any;
  
  // Mobile optimization
  mobileFullscreen?: boolean;
  mobilePlacement?: PopoverPlacement;
  mobileSize?: PopoverSize;
  
  // Performance
  virtualized?: boolean;
  bufferSize?: number;
  
  // Special modes
  modal?: boolean;
  drawer?: boolean;
  fullscreen?: boolean;
  immersive?: boolean;
}

interface PopoverHeaderProps {
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  onClose?: () => void;
  showClose?: boolean;
  variant?: PopoverVariant;
  enterprise?: boolean;
  sx?: any;
}

interface PopoverFooterProps {
  actions?: Array<{
    label: string;
    onClick: () => void;
    variant?: 'text' | 'outlined' | 'contained';
    color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
    icon?: React.ReactNode;
    disabled?: boolean;
    loading?: boolean;
  }>;
  variant?: PopoverVariant;
  enterprise?: boolean;
  sx?: any;
}

export const PopoverHeader: React.FC<PopoverHeaderProps> = ({
  title,
  subtitle,
  icon,
  onClose,
  showClose = true,
  variant = 'default',
  enterprise = false,
  sx
}) => {
  if (!title && !subtitle && !icon) return null;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        p: 3,
        borderBottom: variant === 'card' || variant === 'enterprise' ? '1px solid' : 'none',
        borderColor: 'divider',
        background: variant === 'enterprise' 
          ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)'
          : 'transparent',
        ...sx
      }}
    >
      <Stack direction="row" spacing={2} alignItems="flex-start" sx={{ flexGrow: 1 }}>
        {icon && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 40,
              height: 40,
              borderRadius: '50%',
              background: enterprise 
                ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                : alpha('#667eea', 0.1),
              color: enterprise ? 'white' : '#667eea',
              flexShrink: 0
            }}
          >
            {icon}
          </Box>
        )}
        
        <Box sx={{ flexGrow: 1 }}>
          {title && (
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 700,
                color: enterprise ? '#667eea' : 'text.primary',
                mb: subtitle ? 0.5 : 0
              }}
            >
              {title}
            </Typography>
          )}
          {subtitle && (
            <Typography variant="body2" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        </Box>
      </Stack>

      {showClose && onClose && (
        <IconButton
          onClick={onClose}
          size="small"
          sx={{
            color: 'text.secondary',
            '&:hover': {
              backgroundColor: alpha('#000', 0.05),
              color: 'text.primary'
            }
          }}
        >
          <X size={18} />
        </IconButton>
      )}
    </Box>
  );
};

export const PopoverFooter: React.FC<PopoverFooterProps> = ({
  actions = [],
  variant = 'default',
  enterprise = false,
  sx
}) => {
  if (actions.length === 0) return null;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: 2,
        p: 3,
        borderTop: variant === 'card' || variant === 'enterprise' ? '1px solid' : 'none',
        borderColor: 'divider',
        background: variant === 'enterprise'
          ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)'
          : 'transparent',
        ...sx
      }}
    >
      {actions.map((action, index) => (
        <Button
          key={index}
          variant={action.variant || 'text'}
          color={action.color || 'primary'}
          onClick={action.onClick}
          disabled={action.disabled}
          startIcon={action.icon}
          sx={{
            borderRadius: 2,
            fontWeight: 600,
            textTransform: 'none',
            ...(enterprise && {
              background: action.variant === 'contained' 
                ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                : 'transparent',
              color: action.variant === 'contained' ? 'white' : '#667eea',
              borderColor: action.variant === 'outlined' ? '#667eea' : 'transparent'
            })
          }}
        >
          {action.label}
        </Button>
      ))}
    </Box>
  );
};

export const Popover = forwardRef<HTMLDivElement, PopoverProps>((props, ref) => {
  const {
    open,
    onClose,
    anchorEl,
    children,
    placement = 'bottom',
    offset = [0, 8],
    marginThreshold = 16,
    preventOverflow = true,
    flip = true,
    keepMounted = false,
    variant = 'default',
    size = 'medium',
    maxWidth = 400,
    maxHeight = 600,
    minWidth = 200,
    minHeight,
    animation = 'fade',
    animationDuration = 200,
    enterDelay = 0,
    exitDelay = 0,
    disablePortal = false,
    disableRestoreFocus = false,
    disableAutoFocus = false,
    disableEnforceFocus = false,
    disableScrollLock = false,
    hideBackdrop = true,
    closeOnEscape = true,
    closeOnBackdropClick = true,
    closeOnScroll = false,
    title,
    subtitle,
    description,
    icon,
    actions = [],
    header,
    footer,
    loading = false,
    loadingText = 'Loading...',
    empty = false,
    emptyText = 'No items found',
    emptyIcon,
    error = false,
    errorText = 'An error occurred',
    errorIcon,
    enterprise = false,
    showClose = true,
    showArrow = false,
    arrowColor = '#667eea',
    arrowSize = 12,
    shadow = true,
    border = variant === 'card' || variant === 'enterprise',
    borderColor = 'divider',
    borderWidth = 1,
    borderRadius = 4,
    backgroundColor = 'white',
    backdropColor = '#000',
    backdropOpacity = 0.5,
    draggable = false,
    resizable = false,
    minimizable = false,
    maximizable = false,
    pinnable = false,
    dismissible = true,
    ariaLabel,
    ariaLabelledBy,
    ariaDescribedBy,
    role = 'tooltip',
    renderHeader,
    renderContent,
    renderFooter,
    renderArrow,
    onEnter,
    onEntering,
    onEntered,
    onExit,
    onExiting,
    onExited,
    onBackdropClick,
    onEscapeKeyDown,
    className,
    sx,
    style,
    contentSx,
    headerSx,
    footerSx,
    mobileFullscreen = false,
    mobilePlacement = 'bottom',
    mobileSize = 'large',
    virtualized = false,
    bufferSize = 5,
    modal = false,
    drawer = false,
    fullscreen = false,
    immersive = false
  } = props;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Animation components
  const AnimationComponent = {
    fade: Fade,
    zoom: Zoom,
    slide: Slide,
    grow: Grow,
    collapse: Collapse,
    none: React.Fragment
  }[animation];

  const animationProps = animation === 'slide' 
    ? { direction: placement.includes('top') ? 'down' : placement.includes('bottom') ? 'up' : 'left' }
    : animation === 'collapse'
    ? { orientation: 'vertical' }
    : {};

  // Get size styles
  const getSizeStyles = () => {
    const sizes = {
      small: { width: 250, maxWidth: 300 },
      medium: { width: 350, maxWidth: 400 },
      large: { width: 450, maxWidth: 500 },
      xlarge: { width: 550, maxWidth: 600 },
      auto: { width: 'auto', maxWidth: maxWidth }
    };
    
    const mobileSizes = {
      small: { width: '90%', maxWidth: 300 },
      medium: { width: '95%', maxWidth: 400 },
      large: { width: '100%', maxWidth: '100%' },
      xlarge: { width: '100%', maxWidth: '100%' },
      auto: { width: '100%', maxWidth: '100%' }
    };

    return isMobile ? mobileSizes[mobileSize] : sizes[size];
  };

  // Get variant styles
  const getVariantStyles = () => {
    const baseStyles = {
      borderRadius: borderRadius,
      backgroundColor: backgroundColor,
      boxShadow: shadow ? '0 8px 32px rgba(0, 0, 0, 0.12)' : 'none',
      border: border ? `${borderWidth}px solid ${borderColor}` : 'none',
      overflow: 'hidden',
      transition: 'all 0.3s ease',
    };

    switch (variant) {
      case 'card':
        return {
          ...baseStyles,
          backgroundColor: 'white',
          boxShadow: '0 12px 48px rgba(0, 0, 0, 0.16)',
        };
      
      case 'menu':
        return {
          ...baseStyles,
          backgroundColor: 'white',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          padding: 1,
        };
      
      case 'tooltip':
        return {
          ...baseStyles,
          backgroundColor: '#1a1a1a',
          color: 'white',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
          fontSize: '14px',
        };
      
      case 'dialog':
        return {
          ...baseStyles,
          backgroundColor: 'white',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          maxWidth: '90vw',
          maxHeight: '90vh',
        };
      
      case 'dropdown':
        return {
          ...baseStyles,
          backgroundColor: 'white',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
          padding: 1,
        };
      
      case 'enterprise':
        return {
          ...baseStyles,
          background: 'linear-gradient(135deg, white 0%, #f8fafc 100%)',
          boxShadow: '0 12px 48px rgba(102, 126, 234, 0.2)',
          border: '2px solid',
          borderColor: '#667eea',
        };
      
      case 'glass':
        return {
          ...baseStyles,
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
        };
      
      case 'notification':
        return {
          ...baseStyles,
          backgroundColor: 'white',
          boxShadow: '0 12px 48px rgba(0, 0, 0, 0.2)',
          borderLeft: '4px solid #667eea',
        };
      
      case 'form':
        return {
          ...baseStyles,
          backgroundColor: 'white',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
          padding: 3,
        };
      
      default:
        return baseStyles;
    }
  };

  // Render arrow
  const renderArrowElement = () => {
    if (!showArrow) return null;

    if (renderArrow) {
      return renderArrow({ placement });
    }

    const arrowStyles = {
      position: 'absolute',
      width: 0,
      height: 0,
      borderStyle: 'solid',
      borderWidth: `${arrowSize}px`,
    };

    const placementStyles = {
      'top': {
        bottom: `-${arrowSize}px`,
        left: '50%',
        transform: 'translateX(-50%)',
        borderColor: `${arrowColor} transparent transparent transparent`,
      },
      'top-start': {
        bottom: `-${arrowSize}px`,
        left: '20px',
        borderColor: `${arrowColor} transparent transparent transparent`,
      },
      'top-end': {
        bottom: `-${arrowSize}px`,
        right: '20px',
        borderColor: `${arrowColor} transparent transparent transparent`,
      },
      'bottom': {
        top: `-${arrowSize}px`,
        left: '50%',
        transform: 'translateX(-50%)',
        borderColor: `transparent transparent ${arrowColor} transparent`,
      },
      'bottom-start': {
        top: `-${arrowSize}px`,
        left: '20px',
        borderColor: `transparent transparent ${arrowColor} transparent`,
      },
      'bottom-end': {
        top: `-${arrowSize}px`,
        right: '20px',
        borderColor: `transparent transparent ${arrowColor} transparent`,
      },
      'left': {
        right: `-${arrowSize}px`,
        top: '50%',
        transform: 'translateY(-50%)',
        borderColor: `transparent transparent transparent ${arrowColor}`,
      },
      'left-start': {
        right: `-${arrowSize}px`,
        top: '20px',
        borderColor: `transparent transparent transparent ${arrowColor}`,
      },
      'left-end': {
        right: `-${arrowSize}px`,
        bottom: '20px',
        borderColor: `transparent transparent transparent ${arrowColor}`,
      },
      'right': {
        left: `-${arrowSize}px`,
        top: '50%',
        transform: 'translateY(-50%)',
        borderColor: `transparent ${arrowColor} transparent transparent`,
      },
      'right-start': {
        left: `-${arrowSize}px`,
        top: '20px',
        borderColor: `transparent ${arrowColor} transparent transparent`,
      },
      'right-end': {
        left: `-${arrowSize}px`,
        bottom: '20px',
        borderColor: `transparent ${arrowColor} transparent transparent`,
      },
    };

    return (
      <Box
        sx={{
          ...arrowStyles,
          ...placementStyles[placement],
        }}
      />
    );
  };

  // Handle keydown for escape
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (closeOnEscape && event.key === 'Escape') {
      onClose();
      onEscapeKeyDown?.();
    }
  };

  // Render content based on state
  const renderContent = () => {
    if (loading) {
      return (
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
          p: 4,
          minHeight: 200
        }}>
          <RefreshCw size={32} color="#667eea" style={{ animation: 'spin 1s linear infinite' }} />
          <Typography variant="body1" sx={{ mt: 2, color: 'text.secondary' }}>
            {loadingText}
          </Typography>
        </Box>
      );
    }

    if (error) {
      return (
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
          p: 4,
          minHeight: 200,
          textAlign: 'center'
        }}>
          <AlertTriangle size={48} color="#f44336" />
          <Typography variant="h6" sx={{ mt: 2, color: 'error.main' }}>
            {errorText}
          </Typography>
          {errorIcon && (
            <Box sx={{ mt: 1 }}>
              {errorIcon}
            </Box>
          )}
        </Box>
      );
    }

    if (empty) {
      return (
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
          p: 4,
          minHeight: 200,
          textAlign: 'center'
        }}>
          <Info size={48} color="#6c757d" />
          <Typography variant="h6" sx={{ mt: 2, color: 'text.secondary' }}>
            {emptyText}
          </Typography>
          {emptyIcon && (
            <Box sx={{ mt: 1 }}>
              {emptyIcon}
            </Box>
          )}
        </Box>
      );
    }

    return children;
  };

  // Get animation timeout
  const getAnimationTimeout = () => ({
    enter: animationDuration + enterDelay,
    exit: animationDuration + exitDelay,
  });

  // Mobile adjustments
  const getMobileStyles = () => {
    if (!isMobile) return {};

    if (mobileFullscreen) {
      return {
        width: '100vw',
        height: '100vh',
        maxWidth: '100vw',
        maxHeight: '100vh',
        borderRadius: 0,
        margin: 0,
      };
    }

    return {
        width: '90%',
        maxWidth: '90%',
        [mobilePlacement]: 20,
        left: '50%',
        transform: 'translateX(-50%)',
    };
  };

  // Render popover content
  const popoverContent = (
    <AnimationComponent
      in={open}
      timeout={getAnimationTimeout()}
      {...animationProps}
      onEnter={onEnter}
      onEntering={onEntering}
      onEntered={onEntered}
      onExit={onExit}
      onExiting={onExiting}
      onExited={onExited}
    >
      <Paper
        ref={ref}
        sx={{
          ...getVariantStyles(),
          ...getSizeStyles(),
          ...getMobileStyles(),
          position: 'relative',
          ...contentSx
        }}
        onKeyDown={handleKeyDown}
        role={role}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-describedBy={ariaDescribedBy}
      >
        {renderArrowElement()}

        {/* Header */}
        {(renderHeader || header || title || (showClose && onClose)) && (
          <PopoverHeader
            title={title}
            subtitle={subtitle}
            icon={icon}
            onClose={onClose}
            showClose={showClose}
            variant={variant}
            enterprise={enterprise}
            sx={headerSx}
          />
        )}

        {/* Content */}
        <Box sx={{ 
          maxHeight: maxHeight,
          overflow: 'auto',
          p: variant === 'form' ? 3 : variant === 'menu' || variant === 'dropdown' ? 1 : 2,
          ...contentSx
        }}>
          {renderContent ? renderContent() : renderContent()}
        </Box>

        {/* Footer */}
        {(renderFooter || footer || actions.length > 0) && (
          <PopoverFooter
            actions={actions}
            variant={variant}
            enterprise={enterprise}
            sx={footerSx}
          />
        )}
      </Paper>
    </AnimationComponent>
  );

  return (
    <MuiPopover
      open={open}
      anchorEl={anchorEl}
      onClose={(event, reason) => {
        if (reason === 'backdropClick' && closeOnBackdropClick) {
          onClose();
          onBackdropClick?.();
        } else if (reason === 'escapeKeyDown' && closeOnEscape) {
          onClose();
          onEscapeKeyDown?.();
        }
      }}
      anchorOrigin={{
        vertical: placement.includes('top') ? 'top' : placement.includes('bottom') ? 'bottom' : 'center',
        horizontal: placement.includes('left') ? 'left' : placement.includes('right') ? 'right' : 'center',
      }}
      transformOrigin={{
        vertical: placement.includes('top') ? 'bottom' : placement.includes('bottom') ? 'top' : 'center',
        horizontal: placement.includes('left') ? 'right' : placement.includes('right') ? 'left' : 'center',
      }}
      disablePortal={disablePortal}
      disableRestoreFocus={disableRestoreFocus}
      disableAutoFocus={disableAutoFocus}
      disableEnforceFocus={disableEnforceFocus}
      disableScrollLock={disableScrollLock}
      hideBackdrop={hideBackdrop}
      keepMounted={keepMounted}
      marginThreshold={marginThreshold}
      PaperProps={{
        sx: {
          marginTop: offset[1],
          marginLeft: offset[0],
          ...sx
        }
      }}
      slotProps={{
        paper: {
          elevation: 0,
          style: style
        }
      }}
      className={className}
    >
      {popoverContent}
    </MuiPopover>
  );
});

Popover.displayName = 'Popover';

// Specialized popover components
export const TooltipPopover: React.FC<Omit<PopoverProps, 'variant' | 'showArrow' | 'showClose'>> = (props) => (
  <Popover
    {...props}
    variant="tooltip"
    showArrow={true}
    showClose={false}
    animation="fade"
    animationDuration={150}
  />
);

export const MenuPopover: React.FC<Omit<PopoverProps, 'variant' | 'size'>> = (props) => (
  <Popover
    {...props}
    variant="menu"
    size="auto"
    animation="grow"
    animationDuration={200}
  />
);

export const NotificationPopover: React.FC<Omit<PopoverProps, 'variant' | 'enterprise'>> = (props) => (
  <Popover
    {...props}
    variant="notification"
    enterprise={true}
    showClose={true}
    animation="slide"
    animationDuration={300}
  />
);

export const FormPopover: React.FC<Omit<PopoverProps, 'variant'>> = (props) => (
  <Popover
    {...props}
    variant="form"
    size="large"
    animation="zoom"
    animationDuration={250}
  />
);

export const EnterprisePopover: React.FC<PopoverProps> = (props) => (
  <Popover
    {...props}
    variant="enterprise"
    enterprise={true}
    showClose={true}
    showArrow={true}
    shadow={true}
    border={true}
    animation="zoom"
    animationDuration={300}
  />
);

export const GlassPopover: React.FC<Omit<PopoverProps, 'variant'>> = (props) => (
  <Popover
    {...props}
    variant="glass"
    showArrow={true}
    shadow={true}
    animation="fade"
    animationDuration={250}
  />
);

export const DropdownPopover: React.FC<Omit<PopoverProps, 'variant' | 'size'>> = (props) => (
  <Popover
    {...props}
    variant="dropdown"
    size="auto"
    animation="grow"
    animationDuration={200}
    placement="bottom-start"
  />
);

export const CardPopover: React.FC<Omit<PopoverProps, 'variant'>> = (props) => (
  <Popover
    {...props}
    variant="card"
    showClose={true}
    shadow={true}
    animation="zoom"
    animationDuration={300}
  />
);

export default Popover;
