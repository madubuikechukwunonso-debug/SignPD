import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  Box,
  Avatar as MuiAvatar,
  Badge,
  Chip,
  Typography,
  IconButton,
  Tooltip,
  Zoom,
  Fade,
  alpha,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  User,
  Circle,
  CheckCircle,
  XCircle,
  Clock,
  Star,
  Shield,
  Award,
  Camera,
  Edit3,
  Upload,
  Download,
  Trash2,
  Settings,
  Eye,
  EyeOff,
  Plus,
  Minus,
  RotateCw,
  Maximize2,
  Share2,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Activity,
  Users,
  FileText,
  Link,
  Ban
} from 'lucide-react';

// Types
type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
type AvatarVariant = 'circular' | 'rounded' | 'square';
type AvatarStatus = 'online' | 'offline' | 'away' | 'busy' | 'dnd';
type AvatarPresence = 'active' | 'inactive' | 'pending';
type AvatarBadgeType = 'status' | 'count' | 'icon' | 'dot' | 'none';
type AvatarGroupVariant = 'circular' | 'rounded' | 'square';

interface AvatarUser {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
  status?: AvatarStatus;
  presence?: AvatarPresence;
  role?: string;
  department?: string;
  initials?: string;
  verified?: boolean;
  premium?: boolean;
  lastActive?: string;
  bio?: string;
  location?: string;
  phone?: string;
  website?: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
  skills?: string[];
  languages?: string[];
  joinDate?: string;
  achievements?: string[];
}

interface AvatarBadge {
  type: AvatarBadgeType;
  content?: string | number | React.ReactNode;
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'default';
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  size?: 'small' | 'medium' | 'large';
  invisible?: boolean;
  overlap?: 'rectangular' | 'circular';
}

interface AvatarAction {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  color?: 'primary' | 'secondary' | 'default';
  disabled?: boolean;
  loading?: boolean;
}

interface AvatarProps {
  user?: AvatarUser;
  src?: string;
  alt?: string;
  fallback?: React.ReactNode;
  size?: AvatarSize;
  variant?: AvatarVariant;
  status?: AvatarStatus;
  presence?: AvatarPresence;
  badge?: AvatarBadge;
  showStatus?: boolean;
  showPresence?: boolean;
  editable?: boolean;
  uploadable?: boolean;
  downloadable?: boolean;
  deletable?: boolean;
  showDetails?: boolean;
  showActions?: boolean;
  actions?: AvatarAction[];
  onImageChange?: (file: File) => void;
  onImageUpload?: (url: string) => void;
  onImageDownload?: () => void;
  onImageDelete?: () => void;
  onStatusClick?: () => void;
  onAvatarClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
  imageClassName?: string;
  imageStyle?: React.CSSProperties;
  tooltipPlacement?: 'top' | 'bottom' | 'left' | 'right';
  tooltipArrow?: boolean;
  tooltipEnterDelay?: number;
  tooltipLeaveDelay?: number;
  animation?: 'fade' | 'zoom' | 'slide' | 'none';
  transitionDuration?: number;
  loading?: boolean;
  skeleton?: boolean;
  fallbackText?: string;
  backgroundColor?: string;
  textColor?: string;
  border?: boolean;
  borderColor?: string;
  borderWidth?: number;
  elevation?: number;
  hoverEffect?: boolean;
  clickable?: boolean;
  'data-testid'?: string;
  'aria-label'?: string;
  role?: string;
  tabIndex?: number;
}

interface AvatarGroupProps {
  users: AvatarUser[];
  max?: number;
  size?: AvatarSize;
  variant?: AvatarGroupVariant;
  spacing?: 'small' | 'medium' | 'large' | number;
  totalCount?: number;
  showSurplus?: boolean;
  surplusColor?: 'primary' | 'secondary' | 'default';
  surplusBackground?: string;
  onSurplusClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
  animation?: 'fade' | 'slide' | 'none';
  transitionDuration?: number;
  showTooltip?: boolean;
  tooltipPlacement?: 'top' | 'bottom' | 'left' | 'right';
  clickable?: boolean;
  onAvatarClick?: (user: AvatarUser) => void;
}

interface AvatarStackProps extends Omit<AvatarGroupProps, 'spacing'> {
  direction?: 'horizontal' | 'vertical';
  overlap?: number;
  spread?: 'compact' | 'normal' | 'wide';
  showCount?: boolean;
  countPosition?: 'top' | 'bottom' | 'left' | 'right';
}

// Size mapping
const sizeMap = {
  xs: { size: 24, fontSize: '0.625rem', badgeSize: 8 },
  sm: { size: 32, fontSize: '0.75rem', badgeSize: 12 },
  md: { size: 40, fontSize: '0.875rem', badgeSize: 14 },
  lg: { size: 56, fontSize: '1rem', badgeSize: 16 },
  xl: { size: 64, fontSize: '1.125rem', badgeSize: 18 },
  '2xl': { size: 80, fontSize: '1.25rem', badgeSize: 20 },
  '3xl': { size: 96, fontSize: '1.5rem', badgeSize: 24 }
};

// Status color mapping
const statusColors = {
  online: 'success',
  offline: 'default',
  away: 'warning',
  busy: 'error',
  dnd: 'error'
};

// Status icon mapping
const statusIcons = {
  online: <Circle size={12} fill="currentColor" />,
  offline: <Circle size={12} />,
  away: <Clock size={12} />,
  busy: <XCircle size={12} />,
  dnd: <Ban size={12} />
};

// Animation variants
const animations = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  },
  zoom: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 }
  },
  slide: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  }
};

// Helper functions
const getInitials = (name: string): string => {
  return name
    .split(' ')
n    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

const getStatusColor = (status: AvatarStatus): string => {
  return statusColors[status] || 'default';
};

const getContrastColor = (backgroundColor: string): string => {
  // Simple contrast calculation
  const rgb = backgroundColor.match(/\d+/g);
  if (!rgb) return '#000000';
  
  const [r, g, b] = rgb.map(Number);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128 ? '#000000' : '#ffffff';
};

const generateAvatarColor = (name: string): string => {
  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
    '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
  ];
  
  const hash = name.split('').reduce((acc, char) => char.charCodeAt(0) + ((acc << 5) - acc), 0);
  return colors[Math.abs(hash) % colors.length];
};

// Main Avatar Component
export function Avatar({
  user,
  src,
  alt,
  fallback,
  size = 'md',
  variant = 'circular',
  status,
  presence,
  badge,
  showStatus = true,
  showPresence = true,
  editable = false,
  uploadable = false,
  downloadable = false,
  deletable = false,
  showDetails = false,
  showActions = false,
  actions = [],
  onImageChange,
  onImageUpload,
  onImageDownload,
  onImageDelete,
  onStatusClick,
  onAvatarClick,
  className,
  style,
  imageClassName,
  imageStyle,
  tooltipPlacement = 'top',
  tooltipArrow = true,
  tooltipEnterDelay = 500,
  tooltipLeaveDelay = 0,
  animation = 'fade',
  transitionDuration = 300,
  loading = false,
  skeleton = false,
  fallbackText,
  backgroundColor,
  textColor,
  border = false,
  borderColor,
  borderWidth = 2,
  elevation = 0,
  hoverEffect = true,
  clickable = false,
  'data-testid': dataTestId,
  'aria-label': ariaLabel,
  role = 'img',
  tabIndex = 0
}: AvatarProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);

  // Determine avatar source
  const avatarSrc = src || user?.avatar;
  const avatarAlt = alt || user?.name || 'Avatar';
  const displayName = user?.name || fallbackText || 'Unknown';
  const initials = user?.initials || getInitials(displayName);
  const fallbackColor = backgroundColor || generateAvatarColor(displayName);
  const textColorFinal = textColor || getContrastColor(fallbackColor);

  // Status and presence
  const displayStatus = status || user?.status;
  const displayPresence = presence || user?.presence;
  const showStatusIndicator = showStatus && displayStatus && displayStatus !== 'offline';
  const showPresenceIndicator = showPresence && displayPresence;

  // Size configuration
  const sizeConfig = sizeMap[size];
  const avatarSize = sizeConfig.size;
  const fontSize = sizeConfig.fontSize;
  const badgeSize = sizeConfig.badgeSize;

  // Border configuration
  const hasBorder = border || borderColor;
  const borderStyle = hasBorder ? {
    border: `${borderWidth}px solid ${borderColor || theme.palette.background.paper}`,
    boxShadow: elevation > 0 ? theme.shadows[elevation] : 'none'
  } : {};

  // Status indicator
  const StatusIndicator = () => {
    if (!showStatusIndicator) return null;

    const statusColor = getStatusColor(displayStatus);
    const statusIcon = statusIcons[displayStatus];

    return (
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        badgeContent={
          <Box
            sx={{
              width: badgeSize,
              height: badgeSize,
              borderRadius: '50%',
              backgroundColor: `${statusColor}.main`,
              border: `2px solid ${theme.palette.background.paper}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: badgeSize * 0.6,
              color: `${statusColor}.contrastText`
            }}
          >
            {statusIcon}
          </Box>
        }
      />
    );
  };

  // Badge component
  const BadgeComponent = () => {
    if (!badge || badge.invisible) return null;

    const { type, content, color = 'primary', position = 'bottom-right', size: badgeSize = 'medium' } = badge;

    const badgeContent = type === 'count' && typeof content === 'number' && content > 99 ? '99+' : content;

    return (
      <Badge
        overlap={badge.overlap || 'circular'}
        anchorOrigin={{
          vertical: position.includes('bottom') ? 'bottom' : 'top',
          horizontal: position.includes('right') ? 'right' : 'left'
        }}
        badgeContent={badgeContent}
        color={color as any}
        max={type === 'count' ? 99 : undefined}
        sx={{
          '& .MuiBadge-badge': {
            fontSize: size === 'xs' || size === 'sm' ? '0.625rem' : '0.75rem',
            minWidth: size === 'xs' || size === 'sm' ? '16px' : '20px',
            height: size === 'xs' || size === 'sm' ? '16px' : '20px',
            padding: 0
          }
        }}
      />
    );
  };

  // File upload handler
  const handleFileUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadLoading(true);
    try {
      // Validate file
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        throw new Error('File size too large');
      }

      if (!file.type.startsWith('image/')) {
        throw new Error('Invalid file type');
      }

      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        onImageChange?.(file);
        onImageUpload?.(imageUrl);
        setImageError(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setUploadLoading(false);
    }
  }, [onImageChange, onImageUpload]);

  // Action buttons
  const ActionButtons = () => {
    if (!showActions || actions.length === 0) return null;

    return (
      <Box sx={{ display: 'flex', gap: 0.5, mt: 1 }}>
        {actions.map((action, index) => (
          <Tooltip key={index} title={action.label} arrow={tooltipArrow}>
            <IconButton
              size="small"
              onClick={action.onClick}
              disabled={action.disabled || action.loading}
              color={action.color || 'default'}
              sx={{ fontSize: '1rem' }}
            >
              {action.loading ? (
                <Box
                  sx={{
                    width: 16,
                    height: 16,
                    border: '2px solid currentColor',
                    borderTopColor: 'transparent',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }}
                />
              ) : (
                action.icon
              )}
            </IconButton>
          </Tooltip>
        ))}
      </Box>
n    );
  };

  // Avatar content
  const AvatarContent = () => (
    <Box sx={{ position: 'relative', display: 'inline-block' }}>
      <MuiAvatar
        src={avatarSrc}
        alt={avatarAlt}
        sx={{
          width: avatarSize,
          height: avatarSize,
          fontSize,
          backgroundColor: imageError || !avatarSrc ? fallbackColor : undefined,
          color: imageError || !avatarSrc ? textColorFinal : undefined,
          borderRadius: variant === 'circular' ? '50%' : variant === 'rounded' ? 2 : 0,
          ...borderStyle,
          cursor: clickable || onAvatarClick ? 'pointer' : 'default',
          transition: `all ${transitionDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
          ...(hoverEffect && {
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: theme.shadows[4]
            }
          }),
          ...(isHovered && {
            transform: 'scale(1.02)',
            boxShadow: theme.shadows[2]
          })
        }}
        className={imageClassName}
        style={imageStyle}
        imgProps={{
          onError: () => setImageError(true),
          loading: 'lazy',
          decoding: 'async'
        }}
        onClick={onAvatarClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        data-testid={dataTestId}
        aria-label={ariaLabel || displayName}
        role={role}
        tabIndex={tabIndex}
      >
        {imageError || !avatarSrc ? (
          fallback || initials
        ) : null}
      </MuiAvatar>

      <StatusIndicator />
      <BadgeComponent />
    </Box>
  );

  // Tooltip wrapper
  const TooltipWrapper = ({ children }: { children: React.ReactNode }) => {
    if (!showDetails && !user) return <>{children}</>;

    const tooltipContent = showDetails && user ? (
      <AvatarDetails
        user={user}
        status={displayStatus}
        presence={displayPresence}
        onStatusClick={onStatusClick}
        actions={actions}
        showActions={showActions}
      />
    ) : (
      <Typography variant="body2">{displayName}</Typography>
    );

    return (
      <Tooltip
        title={tooltipContent}
        placement={tooltipPlacement}
        arrow={tooltipArrow}
        enterDelay={tooltipEnterDelay}
        leaveDelay={tooltipLeaveDelay}
        disableHoverListener={!showDetails && !user}
      >
        {children}
      </Tooltip>
    );
  };

  // Main component with animation
  const AnimationWrapper = ({ children }: { children: React.ReactNode }) => {
    if (animation === 'none') return <>{children}</>;

    const ZoomComponent = Zoom;
    return (
      <ZoomComponent
        in={!skeleton}
        timeout={transitionDuration}
        style={{
          transitionDelay: skeleton ? `${transitionDuration}ms` : '0ms'
        }}
      >
        <Box>{children}</Box>
      </ZoomComponent>
    );
  };

  // Loading skeleton
  if (skeleton || loading) {
    return (
      <Box
        sx={{
          width: avatarSize,
          height: avatarSize,
          borderRadius: variant === 'circular' ? '50%' : variant === 'rounded' ? 2 : 0,
          backgroundColor: theme.palette.action.disabledBackground,
          animation: 'pulse 2s infinite',
          ...borderStyle
        }}
        className={className}
        style={style}
      />
    );
n  }

  // File input for uploads
  const FileInput = () => (
    <input
      type="file"
      accept="image/*"
      style={{ display: 'none' }}
      id={`avatar-upload-${user?.id || 'default'}`}
      onChange={handleFileUpload}
      disabled={uploadLoading}
    />
  );

  return (
    <AnimationWrapper>
      <TooltipWrapper>
        <Box
          className={className}
          style={style}
          sx={{
            display: 'inline-flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 0.5,
            position: 'relative'
          }}
        >
          {/* Avatar with overlays */}
          <Box sx={{ position: 'relative' }}>
            <AvatarContent />

            {/* Edit overlay */}
            {(editable || uploadable) && (
              <label htmlFor={`avatar-upload-${user?.id || 'default'}`}>
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    backgroundColor: alpha(theme.palette.background.paper, 0.9),
                    borderRadius: '50%',
                    p: 0.5,
                    cursor: 'pointer',
                    opacity: isHovered ? 1 : 0,
                    transition: `opacity ${transitionDuration}ms ease`,
                    border: `1px solid ${theme.palette.divider}`
                  }}
                >
                  {uploadLoading ? (
                    <Box
                      sx={{
                        width: 16,
                        height: 16,
                        border: '2px solid currentColor',
                        borderTopColor: 'transparent',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                      }}
                    />
                  ) : (
                    <Camera size={14} />
                  )}
                </Box>
              </label>
n            )}

            {/* Download overlay */}
            {downloadable && (
              <IconButton
                size="small"
                onClick={onImageDownload}
                sx={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  backgroundColor: alpha(theme.palette.background.paper, 0.9),
                  opacity: isHovered ? 1 : 0,
                  transition: `opacity ${transitionDuration}ms ease`
                }}
              >
                <Download size={14} />
              </IconButton>
            )}

            {/* Delete overlay */}
            {deletable && (
              <IconButton
                size="small"
                onClick={onImageDelete}
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  backgroundColor: alpha(theme.palette.background.paper, 0.9),
                  opacity: isHovered ? 1 : 0,
                  transition: `opacity ${transitionDuration}ms ease`,
                  color: 'error.main'
                }}
              >
                <Trash2 size={14} />
              </IconButton>
            )}
          </Box>

          {/* Name and details */}
          {showDetails && user && (
            <Box sx={{ textAlign: 'center', mt: 0.5 }}>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                  fontSize: size === 'xs' || size === 'sm' ? '0.75rem' : '0.875rem',
                  lineHeight: 1.2,
                  maxWidth: avatarSize * 2,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}
              >
                {user.name}
              </Typography>
              
              {user.role && (
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{
                    fontSize: size === 'xs' || size === 'sm' ? '0.625rem' : '0.75rem',
                    lineHeight: 1.1
                  }}
                >
                  {user.role}
                </Typography>
              )}
            </Box>
          )}

          {/* Action buttons */}
          <ActionButtons />

          {/* File input */}
          {(editable || uploadable) && <FileInput />}
        </Box>
      </TooltipWrapper>
    </AnimationWrapper>
  );
}

// Avatar Details Component
function AvatarDetails({
  user,
  status,
  presence,
  onStatusClick,
  actions,
  showActions
}: {
  user: AvatarUser;
  status?: AvatarStatus;
  presence?: AvatarPresence;
  onStatusClick?: () => void;
  actions?: AvatarAction[];
  showActions?: boolean;
}) {
  const theme = useTheme();

  return (
    <Box sx={{ p: 1, minWidth: 200 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
          {user.name}
        </Typography>
        
        {user.verified && (
          <CheckCircle size={14} color={theme.palette.success.main} />
        )}
        
        {user.premium && (
          <Star size={14} color={theme.palette.warning.main} />
        )}
      </Box>

      {user.role && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
          {user.role}
        </Typography>
      )}

      {user.department && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
          {user.department}
        </Typography>
      )}

      {status && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            mb: 0.5,
            cursor: onStatusClick ? 'pointer' : 'default'
          }}
          onClick={onStatusClick}
        >
          {statusIcons[status]}
          <Typography variant="caption" sx={{ textTransform: 'capitalize' }}>
            {status}
          </Typography>
        </Box>
      )}

      {user.lastActive && (
        <Typography variant="caption" color="text.secondary">
          Last active: {user.lastActive}
        </Typography>
      )}

      {showActions && actions && actions.length > 0 && (
        <>\n          <Divider sx={{ my: 1 }} />\n          <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>\n            {actions.slice(0, 3).map((action, index) => (\n              <Chip\n                key={index}\n                size="small"\n                label={action.label}\n                onClick={action.onClick}\n                disabled={action.disabled}\n                icon={action.loading ? undefined : action.icon}\n                sx={{ fontSize: '0.75rem' }}\n              />\n            ))}\n          </Box>\n        </>\n      )}\n    </Box>\n  );\n}

export default Avatar;
