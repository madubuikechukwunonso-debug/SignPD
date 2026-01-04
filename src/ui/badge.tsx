import React, { useState, useCallback, useEffect } from 'react';
import {
  Box,
  Chip as MuiChip,
  Badge as MuiBadge,
  Typography,
  IconButton,
  Tooltip,
  Zoom,
  Fade,
  Slide,
  Grow,
  CircularProgress,
  LinearProgress,
  alpha,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  X,
  Check,
  AlertTriangle,
  Info,
  Star,
  Award,
  Shield,
  Clock,
  Activity,
  TrendingUp,
  TrendingDown,
  Minus,
  Plus,
  ArrowUp,
  ArrowDown,
  ArrowRight,
  RefreshCw,
  Download,
  Upload,
  ExternalLink,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Bell,
  MessageCircle,
  Heart,
  ThumbsUp,
  Share2,
  FileText,
  Folder,
  Image,
  Video,
  Music,
  Archive,
  Code,
  Database,
  Globe,
  MapPin,
  Calendar,
  Clock3,
  Users,
  UserPlus,
  UserMinus,
  Settings,
  MoreVertical,
  Zap,
  Flame,
  Snowflake,
  Sun,
  Moon,
  Cloud,
  Rain,
  Wind
} from 'lucide-react';

// Types
type BadgeVariant = 'default' | 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'neutral';
type BadgeSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type BadgeStyle = 'filled' | 'outlined' | 'ghost' | 'light';
type BadgeShape = 'rounded' | 'pill' | 'square' | 'dot';
type BadgeAnimation = 'none' | 'pulse' | 'bounce' | 'shake' | 'glow';
type BadgePosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
type ProgressVariant = 'determinate' | 'indeterminate' | 'buffer' | 'query';

interface BadgeAction {
  icon?: React.ReactNode;
  label: string;
  onClick: () => void;
  color?: BadgeVariant;
  variant?: 'text' | 'outlined' | 'contained';
  disabled?: boolean;
  loading?: boolean;
}

interface BadgeProgress {
  value: number;
  variant?: ProgressVariant;
  color?: BadgeVariant;
  size?: 'small' | 'medium' | 'large';
  showPercentage?: boolean;
  animated?: boolean;
}

interface BadgeIcon {
  icon: React.ReactNode;
  position?: 'left' | 'right' | 'top' | 'bottom';
  color?: string;
  size?: number;
}

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  size?: BadgeSize;
  style?: BadgeStyle;
  shape?: BadgeShape;
  icon?: React.ReactNode | BadgeIcon;
  avatar?: React.ReactNode;
  image?: string;
  count?: number;
  maxCount?: number;
  showZero?: boolean;
  animated?: boolean;
  animation?: BadgeAnimation;
  pulse?: boolean;
  bounce?: boolean;
  glow?: boolean;
  actions?: BadgeAction[];
  progress?: BadgeProgress;
  closable?: boolean;
  onClose?: () => void;
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
  download?: string;
  disabled?: boolean;
  loading?: boolean;
  selected?: boolean;
  clickable?: boolean;
  draggable?: boolean;
  className?: string;
  style?: React.CSSProperties;
  title?: string;
  description?: string;
  tooltip?: string;
  tooltipPlacement?: 'top' | 'bottom' | 'left' | 'right';
  tooltipArrow?: boolean;
  position?: BadgePosition;
  overlap?: 'rectangular' | 'circular';
  elevation?: number;
  border?: boolean;
  borderColor?: string;
  borderWidth?: number;
  shadow?: boolean;
  glowColor?: string;
  glowIntensity?: number;
  children?: React.ReactNode;
  renderContent?: (props: BadgeProps) => React.ReactNode;
  renderActions?: (actions: BadgeAction[]) => React.ReactNode;
  'data-testid'?: string;
  'aria-label'?: string;
  role?: string;
}

interface StatusBadgeProps extends Omit<BadgeProps, 'label' | 'variant'> {
  status: 'online' | 'offline' | 'away' | 'busy' | 'dnd' | 'active' | 'inactive' | 'pending';
  showText?: boolean;
  size?: BadgeSize;
  pulse?: boolean;
}

interface CountBadgeProps extends Omit<BadgeProps, 'label' | 'variant'> {
  count: number;
  maxCount?: number;
  showZero?: boolean;
  showPlus?: boolean;
  size?: BadgeSize;
  animated?: boolean;
}

interface IconBadgeProps extends Omit<BadgeProps, 'label' | 'variant'> {
  icon: React.ReactNode;
  color?: BadgeVariant;
  size?: BadgeSize;
  circular?: boolean;
}

interface ProgressBadgeProps extends Omit<BadgeProps, 'label' | 'variant'> {
  progress: number;
  total?: number;
  showPercentage?: boolean;
  size?: BadgeSize;
  color?: BadgeVariant;
}

interface NotificationBadgeProps extends Omit<BadgeProps, 'label' | 'variant'> {
  count: number;
  important?: boolean;
  animated?: boolean;
  size?: BadgeSize;
}

interface AchievementBadgeProps extends Omit<BadgeProps, 'label' | 'variant'> {
  achievement: string;
  level?: 'bronze' | 'silver' | 'gold' | 'platinum';
  progress?: number;
  size?: BadgeSize;
}

interface BadgeSystemProps {
  badges: BadgeProps[];
  container?: HTMLElement | null;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
  spacing?: number;
  animation?: 'fade' | 'slide' | 'zoom' | 'none';
  duration?: number;
  onBadgeClose?: (id: string) => void;
  maxBadges?: number;
  stackable?: boolean;
}

// Default icons mapping
const variantIcons = {
  success: <Check size={14} />,
  error: <AlertTriangle size={14} />,
  warning: <AlertTriangle size={14} />,
  info: <Info size={14} />,
  primary: <Star size={14} />,
  secondary: <Award size={14} />,
  neutral: <Circle size={14} />
};

// Color mapping
const getVariantColors = (variant: BadgeVariant, theme: any) => {
  const colorMap = {
    primary: theme.palette.primary,
    secondary: theme.palette.secondary,
    success: theme.palette.success,
    error: theme.palette.error,
    warning: theme.palette.warning,
    info: theme.palette.info,
    neutral: theme.palette.grey
  };
  return colorMap[variant] || theme.palette.grey;
};

// Size mapping
const sizeMap = {
  xs: { height: 20, fontSize: '0.625rem', padding: '0 6px', iconSize: 12 },
  sm: { height: 24, fontSize: '0.6875rem', padding: '0 8px', iconSize: 14 },
  md: { height: 28, fontSize: '0.75rem', padding: '0 10px', iconSize: 16 },
  lg: { height: 32, fontSize: '0.8125rem', padding: '0 12px', iconSize: 18 },
  xl: { height: 36, fontSize: '0.875rem', padding: '0 14px', iconSize: 20 }
};

// Animation keyframes
const animationStyles = {
  pulse: {
    '@keyframes pulse': {
      '0%, 100%': { opacity: 1 },
      '50%': { opacity: 0.5 }
    },
    animation: 'pulse 2s infinite'
  },
  bounce: {
    '@keyframes bounce': {
      '0%, 20%, 53%, 80%, 100%': { transform: 'translateY(0)' },
      '40%, 43%': { transform: 'translateY(-3px)' },
      '70%': { transform: 'translateY(-2px)' }
    },
    animation: 'bounce 1s infinite'
  },
  shake: {
    '@keyframes shake': {
      '0%, 100%': { transform: 'translateX(0)' },
      '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-2px)' },
      '20%, 40%, 60%, 80%': { transform: 'translateX(2px)' }
    },
    animation: 'shake 0.5s infinite'
  },
  glow: {
    '@keyframes glow': {
      '0%, 100%': { boxShadow: '0 0 5px currentColor' },
      '50%': { boxShadow: '0 0 20px currentColor, 0 0 30px currentColor' }
    },
    animation: 'glow 2s infinite'
  }
};

// Progress Component
function BadgeProgress({ progress }: { progress: BadgeProgress }) {
  const theme = useTheme();
  
  return (
    <Box sx={{ width: '100%', mt: 0.5 }}>
      <LinearProgress
        variant={progress.variant || 'determinate'}
        value={progress.variant === 'determinate' ? progress.value : undefined}
        color={progress.color as any}
        sx={{
          height: progress.size === 'small' ? 2 : progress.size === 'large' ? 6 : 4,
          borderRadius: 2,
          '& .MuiLinearProgress-bar': {
            borderRadius: 2
          }
        }}
      />
      {progress.showPercentage && (
        <Typography
          variant="caption"
          sx={{
            position: 'absolute',
            right: 8,
            top: '50%',
            transform: 'translateY(-50%)',
            fontWeight: 600,
            fontSize: '0.625rem'
          }}
        >
          {progress.value}%
        </Typography>
      )}
    </Box>
  );
}

// Action Button Component
function BadgeActionButton({ action, variant }: { action: BadgeAction; variant: BadgeVariant }) {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);

  const handleClick = useCallback(async () => {
    if (action.disabled || loading) return;

    try {
      setLoading(true);
      await action.onClick();
    } catch (error) {
      console.error('Action failed:', error);
    } finally {
      setLoading(false);
    }
  }, [action, loading]);

  const colors = getVariantColors(action.color || variant, theme);

  return (
    <Box
      component="button"
      onClick={handleClick}
      disabled={action.disabled || loading}
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0.5,
        px: 1.5,
        py: 0.5,
        borderRadius: 1,
        border: 'none',
        backgroundColor: 
          action.variant === 'contained' 
            ? colors.main 
            : 'transparent',
        color: 
          action.variant === 'contained' 
            ? colors.contrastText 
            : colors.main,
        fontSize: '0.75rem',
        fontWeight: 600,
        cursor: action.disabled || loading ? 'not-allowed' : 'pointer',
        opacity: action.disabled || loading ? 0.6 : 1,
        transition: 'all 0.2s ease',
        '&:hover:not(:disabled)': {
          backgroundColor: 
            action.variant === 'contained' 
              ? colors.dark 
              : alpha(colors.main, 0.08)
        },
        '&:active:not(:disabled)': {
          transform: 'scale(0.98)'
        }
      }}
    >
      {loading ? (
        <Box
          sx={{
            width: 12,
            height: 12,
            border: '2px solid currentColor',
            borderTopColor: 'transparent',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}
        />
      ) : action.icon}
      <span>{action.label}</span>
    </Box>
  );
}

// Main Badge Component
export function Badge({
  label,
  variant = 'primary',
  size = 'md',
  style = 'filled',
  shape = 'rounded',
  icon,
  avatar,
  image,
  count,
  maxCount = 99,
  showZero = false,
  animated = false,
  animation = 'none',
  pulse = false,
  bounce = false,
  glow = false,
  actions,
  progress,
  closable = false,
  onClose,
  onClick,
  href,
  target,
  rel,
  download,
  disabled = false,
  loading = false,
  selected = false,
  clickable = false,
  draggable = false,
  className,
  style: styleProp,
  title,
  description,
  tooltip,
  tooltipPlacement = 'top',
  tooltipArrow = true,
  position = 'top-right',
  overlap = 'rectangular',
  elevation = 0,
  border = false,
  borderColor,
  borderWidth = 1,
  shadow = false,
  glowColor,
  glowIntensity = 0.3,
  children,
  renderContent,
  renderActions,
  'data-testid': dataTestId,
  'aria-label': ariaLabel,
  role = 'status'
}: BadgeProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // State
  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // Refs
  const badgeRef = useRef<HTMLDivElement>(null);

  // Colors
  const colors = getVariantColors(variant, theme);

  // Size configuration
  const sizeConfig = sizeMap[size];

  // Icon handling
  const displayIcon = icon && typeof icon === 'object' ? icon.icon : icon;
  const iconPosition = icon && typeof icon === 'object' ? icon.position || 'left' : 'left';
  const iconColor = icon && typeof icon === 'object' ? icon.color || colors.main : colors.main;
  const iconSize = icon && typeof icon === 'object' ? icon.size || sizeConfig.iconSize : sizeConfig.iconSize;

  // Count formatting
  const displayCount = count !== undefined && count > maxCount ? `${maxCount}+` : count;
  const showCount = count !== undefined && (count > 0 || showZero);

  // Shape styling
  const getShapeStyles = () => {
    switch (shape) {
      case 'pill':
        return { borderRadius: 50 };
      case 'square':
        return { borderRadius: 0 };
      case 'dot':
        return {
          borderRadius: '50%',
          width: 12,
          height: 12,
          minWidth: 12,
          padding: 0
        };
      default:
        return { borderRadius: 4 };
    }
  };

  // Style variants
  const getStyleVariant = () => {
    switch (style) {
      case 'outlined':
        return {
          backgroundColor: 'transparent',
          color: colors.main,
          border: `1px solid ${colors.main}`
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          color: colors.main,
          border: 'none'
        };
      case 'light':
        return {
          backgroundColor: alpha(colors.main, 0.1),
          color: colors.dark,
          border: 'none'
        };
      default: // filled
        return {
          backgroundColor: colors.main,
          color: colors.contrastText,
          border: 'none'
        };
    }
  };

  // Animation effects
  const getAnimationStyles = () => {
    const styles: any = {};
    
    if (animation !== 'none') {
      styles.animation = `${animation} 2s infinite`;
    }
    
    if (pulse) {
      styles.animation = 'pulse 2s infinite';
    }
    
    if (bounce) {
      styles.animation = 'bounce 1s infinite';
    }
    
    if (glow) {
      styles.animation = 'glow 2s infinite';
      styles.boxShadow = `0 0 ${glowIntensity * 20}px ${glowColor || colors.main}`;
    }
    
    return styles;
  };

  // Glow effect
  const glowEffect = glow ? {
    boxShadow: `0 0 ${glowIntensity * 20}px ${glowColor || colors.main}`,
    animation: 'glow 2s infinite'
  } : {};

  // Elevation effect
  const elevationEffect = elevation > 0 ? {
    boxShadow: theme.shadows[elevation]
  } : {};

  // Border effect
  const borderEffect = border ? {
    border: `${borderWidth}px solid ${borderColor || colors.main}`
  } : {};

  // Shadow effect
  const shadowEffect = shadow ? {
    boxShadow: `0 2px 8px ${alpha(colors.main, 0.2)}`
  } : {};

  // Disabled state
  const disabledStyles = disabled ? {
    opacity: 0.6,
    pointerEvents: 'none'
  } : {};

  // Loading state
  const loadingStyles = loading ? {
    opacity: 0.7,
    pointerEvents: 'none'
  } : {};

  // Selected state
  const selectedStyles = selected ? {
    outline: `2px solid ${colors.main}`,
    outlineOffset: 2
  } : {};

  // Clickable state
  const clickableStyles = clickable || onClick ? {
    cursor: 'pointer',
    '&:hover': {
      transform: 'translateY(-1px)',
      boxShadow: theme.shadows[4]
    },
    '&:active': {
      transform: 'translateY(0)'
    }
  } : {};

  // Progress bar
  const showProgress = progress && progress.value > 0 && progress.value < 100;

  // Handle close
  const handleClose = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsVisible(false);
    onClose?.();
  }, [onClose]);

  // Handle click
  const handleClick = useCallback(() => {
    if (!disabled && !loading && onClick) {
      onClick();
    }
  }, [disabled, loading, onClick]);

  // Content rendering
  const renderBadgeContent = () => {
    if (renderContent) {
      return renderContent({
        label,
        variant,
        size,
        style,
        shape,
        icon,
        avatar,
        image,
        count,
        maxCount,
        showZero,
        animated,
        animation,
        pulse,
        bounce,
        glow,
        actions,
        progress,
        closable,
        onClose,
        onClick,
        href,
        target,
        rel,
        download,
        disabled,
        loading,
        selected,
        clickable,
        draggable,
        className,
        style: styleProp,
        title,
        description,
        tooltip,
        tooltipPlacement,
        tooltipArrow,
        position,
        overlap,
        elevation,
        border,
        borderColor,
        borderWidth,
        shadow,
        glowColor,
        glowIntensity,
        children,
        renderContent,
        renderActions,
        'data-testid': dataTestId,
        'aria-label': ariaLabel,
        role
      });
    }

    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 0.5,
          minHeight: sizeConfig.height,
          px: shape === 'dot' ? 0 : sizeConfig.padding,
          py: shape === 'dot' ? 0 : 'auto'
        }}
      >
        {/* Icon */}
        {displayIcon && iconPosition === 'left' && (
          <Box sx={{ color: iconColor, fontSize: iconSize }}>
            {displayIcon}
          </Box>
        )}

        {/* Avatar */}
        {avatar && (
          <Box sx={{ fontSize: 0 }}>
            {avatar}
          </Box>
        )}

        {/* Image */}
        {image && (
          <Box
            component="img"
            src={image}
            alt=""
            sx={{
              width: sizeConfig.iconSize,
              height: sizeConfig.iconSize,
              borderRadius: '50%',
              objectFit: 'cover'
            }}
          />
        )}

        {/* Count */}
        {showCount && shape !== 'dot' && (
          <Typography
            component="span"
            sx={{
              fontSize: sizeConfig.fontSize,
              fontWeight: 600,
              lineHeight: 1
            }}
          >
            {displayCount}
          </Typography>
        )}

        {/* Label */}
        {shape !== 'dot' && label && (
          <Typography
            component="span"
            sx={{
              fontSize: sizeConfig.fontSize,
              fontWeight: 600,
              lineHeight: 1
            }}
          >
            {label}
          </Typography>
        )}

        {/* Icon right */}
        {displayIcon && iconPosition === 'right' && (
          <Box sx={{ color: iconColor, fontSize: iconSize }}>
            {displayIcon}
          </Box>
        )}

        {/* Children */}
        {children}
      </Box>
    );
  };

  if (!isVisible) return null;

  // Link wrapper
  const LinkWrapper = ({ children }: { children: React.ReactNode }) => {
    if (href) {
      return (
        <Box
          component="a"
          href={href}
          target={target}
          rel={rel}
          download={download}
          sx={{ textDecoration: 'none', color: 'inherit' }}
        >
          {children}
        </Box>
      );
    }
    return <>{children}</>;
  };

  // Tooltip wrapper
  const TooltipWrapper = ({ children }: { children: React.ReactNode }) => {
    if (!tooltip) return <>{children}</>;

    return (
      <Tooltip
        title={tooltip}
        placement={tooltipPlacement}
        arrow={tooltipArrow}
      >
        {children}
      </Tooltip>
    );
  };

  const badgeElement = (
    <Box
      ref={badgeRef}
      component={href ? 'a' : 'div'}
      className={className}
      style={styleProp}
      sx={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: shape === 'dot' ? 12 : 'auto',
        height: sizeConfig.height,
        fontSize: sizeConfig.fontSize,
        fontWeight: 600,
        lineHeight: 1,
        whiteSpace: 'nowrap',
        verticalAlign: 'middle',
        userSelect: 'none',
        transition: 'all 0.2s ease',
        ...getShapeStyles(),
        ...getStyleVariant(),
        ...getAnimationStyles(),
        ...glowEffect,
        ...elevationEffect,
        ...borderEffect,
        ...shadowEffect,
        ...disabledStyles,
        ...loadingStyles,
        ...selectedStyles,
        ...clickableStyles,
        '&:hover': {
          ...(clickableStyles['&:hover'] || {}),
          ...(glow && {
            boxShadow: `0 0 ${glowIntensity * 30}px ${glowColor || colors.main}`
          })
        },
        '&:focus': {
          outline: 'none',
          boxShadow: `0 0 0 2px ${alpha(colors.main, 0.3)}`
        }
      }}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-testid={dataTestId}
      aria-label={ariaLabel || label}
      role={role}
      title={title}
      draggable={draggable}
    >
      {/* Loading overlay */}
      {loading && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: alpha(theme.palette.background.paper, 0.8),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 'inherit'
          }}
        >
          <CircularProgress size={16} color="inherit" />
        </Box>
      )}

      {/* Progress bar background */}
      {showProgress && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: alpha(colors.main, 0.1),
            borderRadius: 'inherit',
            overflow: 'hidden'
          }}
        >
          <Box
            sx={{
              height: '100%',
              width: `${progress.value}%`,
              backgroundColor: alpha(colors.main, 0.2),
              transition: 'width 0.3s ease'
            }}
          />
        </Box>
      )}

      {/* Main content */}
      {renderBadgeContent()}

      {/* Progress indicator */}
      {showProgress && <BadgeProgress progress={progress} />}

      {/* Actions */}
      {actions && actions.length > 0 && (
        <Box sx={{ display: 'flex', gap: 0.5, ml: 1 }}>
          {renderActions
            ? renderActions(actions)
            : actions.map((action, index) => (
                <BadgeActionButton
                  key={index}
                  action={action}
                  variant={variant}
                />
              ))}
        </Box>
      )}

      {/* Close button */}
      {closable && (
        <IconButton
          size="small"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            top: -4,
            right: -4,
            backgroundColor: alpha(theme.palette.background.paper, 0.9),
            color: 'text.secondary',
            fontSize: 12,
            padding: 0.25,
            '&:hover': {
              backgroundColor: alpha(theme.palette.action.active, 0.1),
              color: 'text.primary'
            }
          }}
        >
          <X size={12} />
        </IconButton>
      )}
    </Box>
  );

  return (
    <LinkWrapper>
      <TooltipWrapper>
        {badgeElement}
      </TooltipWrapper>
    </LinkWrapper>
  );
}

/* ============================
 * Specialized Badge Components
 * ============================
 */

export function StatusBadge({
  status,
  showText = false,
  size = 'md',
  pulse = false,
  className,
  ...badgeProps
}: StatusBadgeProps) {
  const statusConfig = {
    online: { label: 'Online', color: 'success' as BadgeVariant, icon: <Circle size={12} fill="currentColor" /> },
    offline: { label: 'Offline', color: 'neutral' as BadgeVariant, icon: <Circle size={12} /> },
    away: { label: 'Away', color: 'warning' as BadgeVariant, icon: <Clock size={12} /> },
    busy: { label: 'Busy', color: 'error' as BadgeVariant, icon: <XCircle size={12} /> },
    dnd: { label: 'Do Not Disturb', color: 'error' as BadgeVariant, icon: <Ban size={12} /> },
    active: { label: 'Active', color: 'success' as BadgeVariant, icon: <Activity size={12} /> },
    inactive: { label: 'Inactive', color: 'neutral' as BadgeVariant, icon: <Circle size={12} /> },
    pending: { label: 'Pending', color: 'warning' as BadgeVariant, icon: <Clock3 size={12} /> }
  };

  const config = statusConfig[status] || statusConfig.offline;

  return (
    <Badge
      label={showText ? config.label : ''}
      variant={config.color}
      size={size}
      shape="pill"
      icon={config.icon}
      pulse={pulse}
      className={className}
      {...badgeProps}
    />
  );
}

export function CountBadge({
  count,
  maxCount = 99,
  showZero = false,
  showPlus = true,
  size = 'md',
  animated = true,
  className,
  ...badgeProps
}: CountBadgeProps) {
  const displayCount = count > maxCount ? `${maxCount}${showPlus ? '+' : ''}` : count.toString();
  const showBadge = count > 0 || (count === 0 && showZero);

  if (!showBadge) return null;

  return (
    <Badge
      label={displayCount}
      variant="error"
      size={size}
      shape="pill"
      count={count}
      maxCount={maxCount}
      showZero={showZero}
      animated={animated}
      bounce={animated && count > 0}
      className={className}
      {...badgeProps}
    />
  );
}

export function IconBadge({
  icon,
  color = 'primary',
  size = 'md',
  circular = true,
  className,
  ...badgeProps
}: IconBadgeProps) {
  return (
    <Badge
      label=""
      variant={color}
      size={size}
      shape={circular ? 'dot' : 'rounded'}
      icon={icon}
      className={className}
      {...badgeProps}
    />
  );
}

export function ProgressBadge({
  progress,
  total = 100,
  showPercentage = true,
  size = 'md',
  color = 'primary',
  className,
  ...badgeProps
}: ProgressBadgeProps) {
  const percentage = Math.round((progress / total) * 100);

  return (
    <Badge
      label={showPercentage ? `${percentage}%` : ''}
      variant={color}
      size={size}
      shape="rounded"
      progress={{
        value: percentage,
        showPercentage,
        size: size === 'sm' ? 'small' : size === 'lg' ? 'large' : 'medium',
        color
      }}
      className={className}
      {...badgeProps}
    />
  );
}

export function NotificationBadge({
  count,
  important = false,
  animated = true,
  size = 'md',
  className,
  ...badgeProps
}: NotificationBadgeProps) {
  return (
    <Badge
      label={count.toString()}
      variant={important ? 'error' : 'primary'}
      size={size}
      shape="pill"
      count={count}
      animated={animated}
      pulse={animated && important}
      bounce={animated && count > 0}
      glow={important}
      className={className}
      {...badgeProps}
    />
  );
}

export function AchievementBadge({
  achievement,
  level = 'bronze',
  progress,
  size = 'md',
  className,
  ...badgeProps
}: AchievementBadgeProps) {
  const achievementIcons: Record<string, React.ReactNode> = {
    'verified': <Check size={16} />,
    'premium': <Star size={16} />,
    'top-contributor': <Award size={16} />,
    'early-adopter': <Shield size={16} />,
    'default': <Award size={16} />
  };

  const levelColors = {
    bronze: 'warning',
    silver: 'neutral',
    gold: 'primary',
    platinum: 'secondary'
  };

  const icon = achievementIcons[achievement] || achievementIcons.default;
  const color = levelColors[level] as BadgeVariant;

  return (
    <Badge
      label={achievement}
      variant={color}
      size={size}
      shape="rounded"
      icon={icon}
      progress={progress !== undefined ? {
        value: progress,
        showPercentage: true,
        color
      } : undefined}
      className={className}
      {...badgeProps}
    />
  );
}

// File Type Badge
interface FileTypeBadgeProps {
  type: 'pdf' | 'doc' | 'docx' | 'xls' | 'xlsx' | 'ppt' | 'pptx' | 'jpg' | 'png' | 'gif' | 'mp4' | 'mp3' | 'zip' | 'rar' | 'txt' | 'code';
  size?: BadgeSize;
  showExtension?: boolean;
}

export function FileTypeBadge({
  type,
  size = 'md',
  showExtension = true,
  ...badgeProps
}: FileTypeBadgeProps) {
  const fileConfig = {
    pdf: { color: 'error' as BadgeVariant, icon: <FileText size={14} /> },
    doc: { color: 'primary' as BadgeVariant, icon: <FileText size={14} /> },
    docx: { color: 'primary' as BadgeVariant, icon: <FileText size={14} /> },
    xls: { color: 'success' as BadgeVariant, icon: <Database size={14} /> },
    xlsx: { color: 'success' as BadgeVariant, icon: <Database size={14} /> },
    ppt: { color: 'warning' as BadgeVariant, icon: <FileText size={14} /> },
    pptx: { color: 'warning' as BadgeVariant, icon: <FileText size={14} /> },
    jpg: { color: 'info' as BadgeVariant, icon: <Image size={14} /> },
    png: { color: 'info' as BadgeVariant, icon: <Image size={14} /> },
    gif: { color: 'info' as BadgeVariant, icon: <Image size={14} /> },
    mp4: { color: 'secondary' as BadgeVariant, icon: <Video size={14} /> },
    mp3: { color: 'secondary' as BadgeVariant, icon: <Music size={14} /> },
    zip: { color: 'neutral' as BadgeVariant, icon: <Archive size={14} /> },
    rar: { color: 'neutral' as BadgeVariant, icon: <Archive size={14} /> },
    txt: { color: 'neutral' as BadgeVariant, icon: <FileText size={14} /> },
    code: { color: 'info' as BadgeVariant, icon: <Code size={14} /> }
  };

  const config = fileConfig[type] || fileConfig.txt;

  return (
    <Badge
      label={showExtension ? `.${type.toUpperCase()}` : ''}
      variant={config.color}
      size={size}
      shape="rounded"
      icon={config.icon}
      {...badgeProps}
    />
  );
}

// Priority Badge
interface PriorityBadgeProps {
  priority: 'low' | 'medium' | 'high' | 'urgent' | 'critical';
  size?: BadgeSize;
  showText?: boolean;
}

export function PriorityBadge({
  priority,
  size = 'md',
  showText = false,
  ...badgeProps
}: PriorityBadgeProps) {
  const priorityConfig = {
    low: { color: 'info' as BadgeVariant, icon: <ArrowDown size={14} />, text: 'Low Priority' },
    medium: { color: 'warning' as BadgeVariant, icon: <Minus size={14} />, text: 'Medium Priority' },
    high: { color: 'error' as BadgeVariant, icon: <ArrowUp size={14} />, text: 'High Priority' },
    urgent: { color: 'error' as BadgeVariant, icon: <AlertTriangle size={14} />, text: 'Urgent' },
    critical: { color: 'error' as BadgeVariant, icon: <Flame size={14} />, text: 'Critical' }
  };

  const config = priorityConfig[priority] || priorityConfig.medium;

  return (
    <Badge
      label={showText ? config.text : ''}
      variant={config.color}
      size={size}
      shape="rounded"
      icon={config.icon}
      pulse={priority === 'urgent' || priority === 'critical'}
      {...badgeProps}
    />
  );
}

// Trend Badge
interface TrendBadgeProps {
  trend: 'up' | 'down' | 'neutral';
  value?: number;
  percentage?: boolean;
  size?: BadgeSize;
}

export function TrendBadge({
  trend,
  value,
  percentage = false,
  size = 'md',
  ...badgeProps
}: TrendBadgeProps) {
  const trendConfig = {
    up: { color: 'success' as BadgeVariant, icon: <TrendingUp size={14} /> },
    down: { color: 'error' as BadgeVariant, icon: <TrendingDown size={14} /> },
    neutral: { color: 'neutral' as BadgeVariant, icon: <Minus size={14} /> }
  };

  const config = trendConfig[trend] || trendConfig.neutral;
  const label = value !== undefined 
    ? `${trend === 'up' ? '+' : trend === 'down' ? '-' : ''}${value}${percentage ? '%' : ''}`
    : '';

  return (
    <Badge
      label={label}
      variant={config.color}
      size={size}
      shape="rounded"
    icon={config.icon}
      animated={true}
      bounce={trend === 'up' || trend === 'down'}
      {...badgeProps}
    />
  );
}

/* ============================
 * Badge System Component
 * ============================
 */

export function BadgeSystem({
  badges,
  maxBadges = 5,
  position = 'top-right',
  spacing = 8,
  animation = 'slide',
  duration = 300,
  onBadgeClose,
  container,
  maxBadges: maxDisplayBadges = 5,
  stackable = true
}: BadgeSystemProps) {
  const theme = useTheme();
  const [badgeStates, setBadgeStates] = useState(badges.slice(0, maxDisplayBadges));

  // Update badges when props change
  useEffect(() => {
    setBadgeStates(badges.slice(0, maxDisplayBadges));
  }, [badges, maxDisplayBadges]);

  // Handle badge close
  const handleBadgeClose = useCallback((badge: BadgeProps) => {
    setBadgeStates(prev => prev.filter(b => b !== badge));
    onBadgeClose?.(badge.id || '');
  }, [onBadgeClose]);

  // Position styles
  const getPositionStyles = () => {
    const positions = {
      'top': { top: spacing, left: '50%', transform: 'translateX(-50%)' },
      'bottom': { bottom: spacing, left: '50%', transform: 'translateX(-50%)' },
      'top-left': { top: spacing, left: spacing },
      'top-right': { top: spacing, right: spacing },
      'bottom-left': { bottom: spacing, left: spacing },
      'bottom-right': { bottom: spacing, right: spacing },
      'center': { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }
    };
    return positions[position];
  };

  // Animation component
  const AnimationComponent = {
    fade: Fade,
    slide: Slide,
    zoom: Zoom,
    none: React.Fragment
  }[animation];

  const animationProps = {
    fade: { timeout: duration, in: true },
    slide: { timeout: duration, in: true, direction: 'down' as const },
    zoom: { timeout: duration, in: true },
    none: {}
  }[animation];

  const containerElement = container || document.body;

  return (
    <Box
      sx={{
        position: 'fixed',
        zIndex: theme.zIndex.snackbar,
        ...getPositionStyles(),
        display: 'flex',
        flexDirection: position.includes('bottom') ? 'column-reverse' : 'column',
        gap: 1,
        maxWidth: 320,
        width: '100%',
        pointerEvents: 'none'
      }}
    >
      {badgeStates.map((badge, index) => (
        <Box
          key={badge.id || index}
          sx={{
            pointerEvents: 'auto',
            animation: `${animation} ${duration}ms ease-out`
          }}
          style={{
            animationDelay: `${index * 100}ms`
          }}
        >
          <Badge
            {...badge}
            onClose={() => handleBadgeClose(badge)}
            className={badge.className}
          />
        </Box>
      ))}
    </Box>
  );
}

/* ============================
 * Export Default
 * ============================
 */

export default Badge;
